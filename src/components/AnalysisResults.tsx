import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Building, 
  AlertCircle,
  FileText,
  BarChart3,
  Activity
} from 'lucide-react';
import { FinancialMetrics } from './FinancialMetrics';
import { DepartmentCosts } from './DepartmentCosts';
import { LaborAnalysis } from './LaborAnalysis';

interface AnalysisResultsProps {
  hospitalId: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ hospitalId }) => {
  const isMainHospital = hospitalId === 'emory-main';
  const hospitalName = isMainHospital ? 'Emory University Hospital (Main Campus)' : 'Emory University Hospital Midtown';

  const financialData = {
    'emory-main': {
      2020: { totalIncome: 228.17, netIncome: 228.17, costToCharge: 0.2646, medicaidRevenue: 21.33 },
      2021: { totalIncome: -1260, netIncome: -1260, costToCharge: 0.2897, medicaidRevenue: 18.19 },
      2022: { totalIncome: 93.15, netIncome: 93.15, costToCharge: 0.2740, medicaidRevenue: 43.81 }
    },
    'emory-midtown': {
      2020: { totalIncome: 184.10, netIncome: 294.58, costToCharge: 0.2928, medicaidRevenue: 64.79 },
      2021: { totalIncome: 56.20, netIncome: 114.39, costToCharge: 0.3304, medicaidRevenue: 64.79 },
      2022: { totalIncome: 106.50, netIncome: 110.28, costToCharge: 0.3250, medicaidRevenue: 56.41 }
    }
  };

  const departmentData = {
    'emory-main': {
      charityCare: [30.2, 42.4, 39.6],
      badDebt: [46.0, 55.0, 61.3],
      overheadNonSalary: [767, 890, 980],
      depreciation: [40, 40, 40],
      wageRelated: [80, 85, 90],
      totalCosts: [999, 1150, 1240]
    },
    'emory-midtown': {
      charityCare: [32.9, 44.8, 44.8],
      badDebt: [37.5, 65.2, 65.2],
      overheadNonSalary: [983, 1170, 1170],
      depreciation: [40, 40, 40],
      wageRelated: [66.5, 70.2, 73.8],
      totalCosts: [1090, 1270, 1270]
    }
  };

  const laborData = {
    'emory-main': {
      2020: { ftes: 4291.6, contractLabor: 48.5, totalCost: 999 },
      2021: { ftes: 4493.9, contractLabor: 0, totalCost: 1150 },
      2022: { ftes: 3950.5, contractLabor: 119.9, totalCost: 1240 }
    },
    'emory-midtown': {
      2020: { ftes: 3629.4, contractLabor: 0, totalCost: 1090 },
      2021: { ftes: 3697.1, contractLabor: 0, totalCost: 1270 },
      2022: { ftes: 3697.1, contractLabor: 0, totalCost: 1270 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const narrativeSummary = isMainHospital 
    ? "The main hospital experienced significant financial challenges in 2021 with over $1.2B in negative income, likely due to pandemic-related disruptions. Recovery began in 2022, though income remained below 2020 levels. Contract labor costs surged to nearly 10% of total costs in 2022, indicating staffing challenges."
    : "The Midtown campus demonstrated remarkable resilience, maintaining profitability even when income dipped in 2021. The hospital showed stable cost management and relied entirely on full-time employees without contract labor, suggesting strong workforce retention.";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center mb-4">
          <Building className="h-8 w-8 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">{hospitalName}</h2>
            <p className="text-blue-100">Financial Analysis Report • 2020-2022</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-start">
            <FileText className="h-5 w-5 mr-3 mt-1 text-blue-200" />
            <p className="text-sm leading-relaxed">{narrativeSummary}</p>
          </div>
        </div>
      </motion.div>

      {/* Financial Metrics */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Financial Performance Trends</h3>
        </div>
        <FinancialMetrics data={financialData[hospitalId]} />
      </motion.div>

      {/* Department Costs */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Department Cost Analysis</h3>
        </div>
        <DepartmentCosts data={departmentData[hospitalId]} />
      </motion.div>

      {/* Labor Analysis */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-orange-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Labor Cost Analysis</h3>
        </div>
        <LaborAnalysis data={laborData[hospitalId]} />
      </motion.div>

      {/* Key Insights */}
      <motion.div variants={itemVariants} className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Key Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-gray-800 mb-2">Cost Drivers</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Non-salary overhead: Largest cost category</li>
              <li>• Charity care: Sustained commitment to uncompensated care</li>
              <li>• Bad debt: Increasing collection challenges</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-gray-800 mb-2">Staffing Patterns</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {isMainHospital ? 'Sharp increase in contract labor in 2022' : 'Full reliance on in-house staff'}</li>
              <li>• {isMainHospital ? 'Decreased FTE count suggests substitution' : 'Stable workforce retention'}</li>
              <li>• {isMainHospital ? 'Pandemic-era staffing challenges evident' : 'Strong workforce management'}</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};