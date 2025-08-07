import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface FinancialData {
  [year: string]: {
    totalIncome: number;
    netIncome: number;
    costToCharge: number;
    medicaidRevenue: number;
  };
}

interface FinancialMetricsProps {
  data: FinancialData;
}

export const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([year, values]) => ({
    year,
    totalIncome: values.totalIncome,
    netIncome: values.netIncome,
    costToCharge: values.costToCharge,
    medicaidRevenue: values.medicaidRevenue
  }));

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    }
    return `$${value.toFixed(1)}M`;
  };

  const getIncomeChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / Math.abs(previous)) * 100;
  };

  const currentYear = chartData[chartData.length - 1];
  const previousYear = chartData[chartData.length - 2];
  const incomeChange = getIncomeChange(currentYear.totalIncome, previousYear.totalIncome);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Key Metrics Cards */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income (2022)</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentYear.totalIncome)}</p>
            </div>
            <div className={`p-3 rounded-full ${currentYear.totalIncome >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <DollarSign className={`h-6 w-6 ${currentYear.totalIncome >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {incomeChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${incomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(incomeChange).toFixed(1)}% vs 2021
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cost-to-Charge Ratio</p>
              <p className="text-2xl font-bold text-gray-900">{currentYear.costToCharge.toFixed(3)}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              {currentYear.costToCharge > previousYear.costToCharge ? 'Increased' : 'Decreased'} from {previousYear.costToCharge.toFixed(3)}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medicaid Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentYear.medicaidRevenue)}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Income Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="totalIncome" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Total Income"
              />
              <Line 
                type="monotone" 
                dataKey="netIncome" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Net Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Medicaid Revenue by Year</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Medicaid Revenue']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Bar dataKey="medicaidRevenue" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};