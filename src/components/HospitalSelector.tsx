import React from 'react';
import { Building2, MapPin } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  location: string;
  type: 'main' | 'midtown';
}

interface HospitalSelectorProps {
  selectedHospital: string;
  onHospitalChange: (hospitalId: string) => void;
}

const hospitals: Hospital[] = [
  {
    id: 'emory-main',
    name: 'Emory University Hospital',
    location: 'Atlanta, GA',
    type: 'main'
  },
  {
    id: 'emory-midtown',
    name: 'Emory University Hospital Midtown',
    location: 'Atlanta, GA',
    type: 'midtown'
  }
];

export const HospitalSelector: React.FC<HospitalSelectorProps> = ({
  selectedHospital,
  onHospitalChange
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select Hospital for Analysis
      </label>
      <div className="relative">
        <select
          value={selectedHospital}
          onChange={(e) => onHospitalChange(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none"
        >
          <option value="">Choose a hospital...</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name} - {hospital.location}
            </option>
          ))}
        </select>
        <Building2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
      
      {selectedHospital && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">
              {hospitals.find(h => h.id === selectedHospital)?.name}
            </span>
            <span className="text-sm text-blue-700 ml-2">
              • {hospitals.find(h => h.id === selectedHospital)?.location}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};