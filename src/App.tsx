import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Sparkles } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { HospitalSelector } from './components/HospitalSelector';
import { TextualAnalysisResults } from './components/TextualAnalysisResults';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCreateNarrative = async () => {
    if (files.length === 0 || !selectedHospital) {
      alert('Please upload CSV files and select a hospital');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAnalyzing(false);
    setShowAnalysis(true);
  };

  const canAnalyze = files.length > 0 && selectedHospital;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hospital Cost Analysis</h1>
                <p className="text-sm text-gray-600">CMS HCRIS Data Analytics Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">AI powered Analytics</span>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showAnalysis ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Hospital Data</h2>
                <p className="text-gray-600">Upload your Cost Report CSV files to begin the analysis</p>
              </div>
              <FileUpload onFilesChange={setFiles} />
            </div>

            {/* Hospital Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Hospital</h2>
                <p className="text-gray-600">Choose the hospital you want to analyze</p>
              </div>
              <HospitalSelector
                selectedHospital={selectedHospital}
                onHospitalChange={setSelectedHospital}
              />
            </div>

            {/* Analysis Button */}
            <div className="text-center">
              <button
                onClick={handleCreateNarrative}
                disabled={!canAnalyze || isAnalyzing}
                className={`inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                  canAnalyze && !isAnalyzing
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-3" />
                    Create the Narrative
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowAnalysis(false)}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                ← Back to Upload
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Analysis Generated</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <TextualAnalysisResults hospitalId={selectedHospital} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;