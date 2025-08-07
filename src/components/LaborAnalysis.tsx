import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, UserCheck, TrendingUp, AlertCircle } from 'lucide-react';

interface LaborData {
  [year: string]: {
    ftes: number;
    contractLabor: number;
    totalCost: number;
  };
}

interface LaborAnalysisProps {
  data: LaborData;
}

export const LaborAnalysis: React.FC<LaborAnalysisProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([year, values]) => ({
    year,
    ftes: values.ftes,
    contractLabor: values.contractLabor,
    contractPercent: (values.contractLabor / values.totalCost) * 100,
    totalCost: values.totalCost
  }));

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    }
    return `$${value.toFixed(1)}M`;
  };

  const currentYear = chartData[chartData.length - 1];
  const previousYear = chartData[chartData.length - 2];
  const fteChange = currentYear.ftes - previousYear.ftes;
  const contractChange = currentYear.contractLabor - previousYear.contractLabor;

  const hasContractLabor = chartData.some(d => d.contractLabor > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Labor Metrics */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Full-Time Employees</p>
              <p className="text-2xl font-bold text-gray-900">{currentYear.ftes.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {fteChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
            )}
            <span className={`text-sm font-medium ${fteChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fteChange >= 0 ? '+' : ''}{fteChange.toFixed(0)} vs 2021
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contract Labor Cost</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentYear.contractLabor)}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <UserCheck className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              {currentYear.contractPercent.toFixed(1)}% of total costs
            </span>
          </div>
        </div>

        {hasContractLabor && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <h5 className="font-medium text-yellow-800">Contract Labor Alert</h5>
            </div>
            <p className="text-sm text-yellow-700">
              Contract labor costs surged to nearly 10% of total hospital costs in 2022, while FTE count decreased — possibly due to staffing shortages or shifts post-COVID.
            </p>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">FTE Count Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), 'FTEs']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="ftes" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Full-Time Employees"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Contract Labor vs FTE Costs</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Bar dataKey="contractLabor" fill="#F59E0B" name="Contract Labor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};