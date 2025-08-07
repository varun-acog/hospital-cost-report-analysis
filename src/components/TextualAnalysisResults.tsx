import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  AlertCircle,
  FileText,
  Calendar,
  MapPin,
  Activity,
  Briefcase,
  Heart,
  CreditCard,
  Settings,
  Clock,
  BedDouble,
  Stethoscope,
  Building2
} from 'lucide-react';

interface TextualAnalysisResultsProps {
  hospitalId: string;
}

export const TextualAnalysisResults: React.FC<TextualAnalysisResultsProps> = ({ hospitalId }) => {
  const isMainHospital = hospitalId === 'emory-main';
  const hospitalName = isMainHospital ? 'Emory University Hospital (Main Campus)' : 'Emory University Hospital Midtown';
  const location = 'Atlanta, GA';

  const financialData = {
    'emory-main': {
      2020: { totalIncome: 228.17, netIncome: 228.17, costToCharge: 0.2646, medicaidRevenue: 21.33, medicaidCharges: 316.79 },
      2021: { totalIncome: -1260, netIncome: -1260, costToCharge: 0.2897, medicaidRevenue: 18.19, medicaidCharges: 323.19 },
      2022: { totalIncome: 93.15, netIncome: 93.15, costToCharge: 0.2740, medicaidRevenue: 43.81, medicaidCharges: 245.25 }
    },
    'emory-midtown': {
      2020: { totalIncome: 184.10, netIncome: 294.58, costToCharge: 0.2928, medicaidRevenue: 64.79, medicaidCharges: 385.12 },
      2021: { totalIncome: 56.20, netIncome: 114.39, costToCharge: 0.3304, medicaidRevenue: 64.79, medicaidCharges: 399.52 },
      2022: { totalIncome: 106.50, netIncome: 110.28, costToCharge: 0.3250, medicaidRevenue: 56.41, medicaidCharges: 294.94 }
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
      2020: { ftes: 4291.6, contractLabor: 48.5, totalCost: 999, percentage: 4.86 },
      2021: { ftes: 4493.9, contractLabor: 0, totalCost: 1150, percentage: 0.00 },
      2022: { ftes: 3950.5, contractLabor: 119.9, totalCost: 1240, percentage: 9.69 }
    },
    'emory-midtown': {
      2020: { ftes: 3629.4, contractLabor: 0, totalCost: 1090, percentage: 0.00 },
      2021: { ftes: 3697.1, contractLabor: 0, totalCost: 1270, percentage: 0.00 },
      2022: { ftes: 3697.1, contractLabor: 0, totalCost: 1270, percentage: 0.00 }
    }
  };

  const hospitalStats = {
    'emory-main': {
      beds: '751',
      specialties: ['Cardiology & Cardiac Surgery', 'Oncology', 'Transplantation', 'Neurosciences', 'Orthopedics'],
      type: 'Tertiary/Quaternary Care, Teaching Hospital'
    },
    'emory-midtown': {
      beds: '511',
      specialties: ['Cardiology', 'Cardiothoracic Surgery', 'Oncology', 'Neurosciences', 'General & Vascular Surgery', 'Internal Medicine', 'Urology', 'Obstetrics & Gynecology'],
      type: 'Acute Care, Teaching Hospital'
    }
  };

  const currentData = financialData[hospitalId];
  const currentDeptData = departmentData[hospitalId];
  const currentLaborData = laborData[hospitalId];

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(2)}B`;
    }
    return `$${value.toFixed(1)}M`;
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hospital Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-center mb-6">
          <Building className="h-10 w-10 mr-4" />
          <div>
            <h1 className="text-3xl font-bold">{hospitalName}</h1>
            <div className="flex items-center mt-2">
              <MapPin className="h-5 w-5 mr-2 text-blue-200" />
              <span className="text-blue-100 text-lg">{location}</span>
            </div>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-6 mb-4">
          <div className="flex items-start">
            <FileText className="h-6 w-6 mr-3 mt-1 text-blue-200" />
            <div>
              <h3 className="text-xl font-semibold mb-2">CMS HCRIS Analysis Report</h3>
              <p className="text-blue-100 leading-relaxed">
                {isMainHospital 
                  ? "The main hospital experienced significant financial challenges in 2021 with over $1.2B in negative income, likely due to pandemic-related disruptions. Recovery began in 2022, though income remained below 2020 levels. Contract labor costs surged to nearly 10% of total costs in 2022."
                  : "The Midtown campus demonstrated remarkable resilience, maintaining profitability even when income dipped in 2021. The hospital showed stable cost management and relied entirely on full-time employees without contract labor, suggesting strong workforce retention."
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Building2 className="h-6 w-6 mr-3 text-blue-200" />
            <h4 className="text-xl font-semibold">Hospital Statistics</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
              <Stethoscope className="h-5 w-5 mr-2 text-blue-200 mt-1" />
              <div>
                <p className="text-sm font-medium text-blue-100">Specialties</p>
                <ul className="text-sm list-disc list-inside">
                  {hospitalStats[hospitalId].specialties.map((specialty, index) => (
                    <li key={index}>{specialty}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-start">
              <BedDouble className="h-5 w-5 mr-2 text-blue-200 mt-1" />
              <div>
                <p className="text-sm font-medium text-blue-100">Number of Beds</p>
                <p className="text-sm">{hospitalStats[hospitalId].beds}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Building2 className="h-5 w-5 mr-2 text-blue-200 mt-1" />
              <div>
                <p className="text-sm font-medium text-blue-100">Hospital Type</p>
                <p className="text-sm">{hospitalStats[hospitalId].type}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Financial Performance Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Financial Performance Trends</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(currentData).map(([year, data]) => (
              <div key={year} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">{year}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Total Income</span>
                    </div>
                    <span className={`font-bold ${data.totalIncome >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {formatCurrency(data.totalIncome)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Net Income</span>
                    </div>
                    <span className={`font-bold ${data.netIncome >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {formatCurrency(data.netIncome)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Cost-to-Charge Ratio</span>
                    </div>
                    <span className="font-bold text-gray-900">{data.costToCharge.toFixed(4)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Medicaid Revenue</span>
                      </div>
                      <span className="font-bold text-gray-900">{formatCurrency(data.medicaidRevenue)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      From {formatCurrency(data.medicaidCharges)} in charges
                    </div>
                  </div>
                </div>
                
                {year === '2021' && isMainHospital && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center">
                      <TrendingDown className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-red-800">Significant financial downturn</span>
                    </div>
                    <p className="text-xs text-red-700 mt-1">
                      Over $1.2B in negative income, possibly due to operational losses during the pandemic
                    </p>
                  </div>
                )}
                
                {year === '2022' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        {isMainHospital ? 'Recovery trend observed' : 'Stabilization achieved'}
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      {isMainHospital 
                        ? 'Income recovery, though below 2020 levels. Medicaid revenue nearly doubles.'
                        : 'Stable performance with controlled cost management.'
                      }
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Department Costs Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Briefcase className="h-7 w-7 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Department Cost Analysis</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 flex flex-col">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 flex-1">
                <div className="flex items-center mb-4">
                  <Heart className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">Cost of Charity Care</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2020</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.charityCare[0])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2021</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.charityCare[1])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2022</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.charityCare[2])}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-xs text-purple-700">
                    Reflects sustained commitment to uncompensated care, especially during and post-COVID
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200 flex-1">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">Bad Debt Expense</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2020</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.badDebt[0])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2021</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.badDebt[1])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2022</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.badDebt[2])}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-xs text-red-700">
                    Suggests increasing patient defaults or challenges in collections
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 flex-1">
                <div className="flex items-center mb-4">
                  <Settings className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">Overhead Non-Salary Costs</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2020</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.overheadNonSalary[0])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2021</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.overheadNonSalary[1])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2022</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.overheadNonSalary[2])}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    This was the largest cost category, growing steadily and significantly
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 flex-1">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">Wage-Related Costs</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2020</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.wageRelated[0])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2021</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.wageRelated[1])}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2022</span>
                    <span className="font-bold text-gray-900">{formatCurrency(currentDeptData.wageRelated[2])}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-xs text-green-700">
                    Indicates controlled staffing cost increases
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Total Cost Progression</h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(currentDeptData.totalCosts[0])}</div>
                <div className="text-sm text-gray-600">2020</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(currentDeptData.totalCosts[1])}</div>
                <div className="text-sm text-gray-600">2021</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(currentDeptData.totalCosts[2])}</div>
                <div className="text-sm text-gray-600">2022</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Labor Analysis Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <Users className="h-7 w-7 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Labor Cost Analysis</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(currentLaborData).map(([year, data]) => (
              <div key={year} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">{year}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Full-Time Employees</span>
                      </div>
                      <span className="font-bold text-gray-900">{data.ftes.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Contract Labor</span>
                      </div>
                      <span className="font-bold text-gray-900">{formatCurrency(data.contractLabor)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {data.percentage.toFixed(2)}% of total costs
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Total Cost</span>
                      </div>
                      <span className="font-bold text-gray-900">{formatCurrency(data.totalCost)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isMainHospital && (
            <div className="mt-8 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
                <h4 className="text-lg font-bold text-yellow-800">Key Labor Insights</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-yellow-100">
                  <h5 className="font-semibold text-gray-800 mb-2">Contract Labor Surge</h5>
                  <p className="text-sm text-gray-700">
                    Sharp increase in reliance on contract labor in 2022, while FTE count decreased — possibly due to staffing shortages or shifts post-COVID.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-100">
                  <h5 className="font-semibold text-gray-800 mb-2">Cost Impact</h5>
                  <p className="text-sm text-gray-700">
                    Contract labor costs surged to nearly 10% of total hospital costs in 2022, reflecting pandemic-era staffing challenges and increased labor rates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isMainHospital && (
            <div className="mt-8 bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-green-600 mr-2" />
                <h4 className="text-lg font-bold text-green-800">Workforce Stability</h4>
              </div>
              <p className="text-sm text-green-700">
                No contract labor reported for Midtown in these years, suggesting full reliance on in-house staff and strong workforce retention strategies.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Key Takeaways */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-8 text-white">
        <div className="flex items-center mb-6">
          <FileText className="h-7 w-7 mr-3" />
          <h2 className="text-2xl font-bold">Key Takeaways</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 mr-2 text-indigo-200" />
              <h4 className="font-semibold">2021 Challenges</h4>
            </div>
            <p className="text-sm text-indigo-100">
              2021 was a challenging year for the main hospital with a massive drop in income, potentially due to pandemic-related disruptions.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-200" />
              <h4 className="font-semibold">2022 Recovery</h4>
            </div>
            <p className="text-sm text-indigo-100">
              2022 shows signs of recovery at both locations, with stronger Medicaid performance at the main hospital.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Activity className="h-5 w-5 mr-2 text-indigo-200" />
              <h4 className="font-semibold">Campus Resilience</h4>
            </div>
            <p className="text-sm text-indigo-100">
              The Midtown campus demonstrated resilience, maintaining profitability even when income dipped.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};