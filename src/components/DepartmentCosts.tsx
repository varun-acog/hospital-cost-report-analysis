import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, TrendingUp, AlertTriangle } from 'lucide-react';

interface DepartmentData {
  charityCare: number[];
  badDebt: number[];
  overheadNonSalary: number[];
  depreciation: number[];
  wageRelated: number[];
  totalCosts: number[];
}

interface DepartmentCostsProps {
  data: DepartmentData;
}

export const DepartmentCosts: React.FC<DepartmentCostsProps> = ({ data }) => {
  const years = ['2020', '2021', '2022'];
  
  const chartData = years.map((year, index) => ({
    year,
    charityCare: data.charityCare[index],
    badDebt: data.badDebt[index],
    overheadNonSalary: data.overheadNonSalary[index],
    depreciation: data.depreciation[index],
    wageRelated: data.wageRelated[index],
    totalCosts: data.totalCosts[index]
  }));

  const currentYearData = [
    { name: 'Overhead Non-Salary', value: data.overheadNonSalary[2], color: '#3B82F6' },
    { name: 'Wage-Related', value: data.wageRelated[2], color: '#10B981' },
    { name: 'Bad Debt', value: data.badDebt[2], color: '#EF4444' },
    { name: 'Charity Care', value: data.charityCare[2], color: '#8B5CF6' },
    { name: 'Depreciation', value: data.depreciation[2], color: '#F59E0B' }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    }
    return `$${value.toFixed(1)}M`;
  };

  const calculateGrowth = (current: number, initial: number) => {
    return ((current - initial) / initial) * 100;
  };

  const departmentInsights = [
    {
      name: 'Overhead Non-Salary',
      current: data.overheadNonSalary[2],
      growth: calculateGrowth(data.overheadNonSalary[2], data.overheadNonSalary[0]),
      icon: Building2,
      color: 'blue'
    },
    {
      name: 'Bad Debt Expense',
      current: data.badDebt[2],
      growth: calculateGrowth(data.badDebt[2], data.badDebt[0]),
      icon: AlertTriangle,
      color: 'red'
    },
    {
      name: 'Cost of Charity Care',
      current: data.charityCare[2],
      growth: calculateGrowth(data.charityCare[2], data.charityCare[0]),
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Department Insights */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Top Cost Categories (2022)</h4>
        {departmentInsights.map((dept, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-full bg-${dept.color}-100 mr-3`}>
                  <dept.icon className={`h-5 w-5 text-${dept.color}-600`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{dept.name}</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(dept.current)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${dept.growth >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {dept.growth >= 0 ? '+' : ''}{dept.growth.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">vs 2020</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cost Trends Chart */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost Trends (2020-2022)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Bar dataKey="overheadNonSalary" fill="#3B82F6" name="Overhead Non-Salary" />
              <Bar dataKey="wageRelated" fill="#10B981" name="Wage-Related" />
              <Bar dataKey="badDebt" fill="#EF4444" name="Bad Debt" />
              <Bar dataKey="charityCare" fill="#8B5CF6" name="Charity Care" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost Distribution (2022)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={currentYearData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {currentYearData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};