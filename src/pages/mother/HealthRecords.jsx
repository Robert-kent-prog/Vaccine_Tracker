// src/pages/mother/HealthRecords.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Activity, 
  Weight, 
  Ruler,
  Thermometer,
  Heart,
  Download,
  Share2,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';

const HealthRecords = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddRecord, setShowAddRecord] = useState(false);

  // Mock data - in real app, fetch from API based on childId
  const child = {
    id: childId,
    name: 'Maria Auma',
    dob: '2023-05-15',
    gender: 'Female',
    age: calculateAge('2023-05-15')
  };

  // Mock health records data
  const healthRecords = [
    {
      id: 1,
      type: 'growth',
      date: '2023-11-01',
      title: 'Routine Checkup',
      provider: 'Kenyatta National Hospital',
      weight: '8.2 kg',
      height: '72 cm',
      temperature: '36.8°C',
      notes: 'Healthy development, good weight gain',
      vaccines: ['Pentavalent 3', 'OPV 3', 'PCV 3'],
      attachments: ['growth_chart.pdf']
    },
    {
      id: 2,
      type: 'vaccination',
      date: '2023-10-15',
      title: 'Vaccination Session',
      provider: 'Community Health Worker - Jane',
      weight: '7.8 kg',
      height: '70 cm',
      vaccines: ['Measles Rubella', 'Vitamin A'],
      notes: 'No adverse reactions observed',
      attachments: ['vaccine_card.jpg']
    },
    {
      id: 3,
      type: 'illness',
      date: '2023-09-20',
      title: 'Fever Consultation',
      provider: 'Mama Lucy Hospital',
      temperature: '38.5°C',
      diagnosis: 'Common cold',
      medication: 'Paracetamol syrup',
      notes: 'Fever resolved after 2 days',
      followUp: 'Return if fever persists'
    },
    {
      id: 4,
      type: 'growth',
      date: '2023-08-15',
      title: '6-Month Checkup',
      provider: 'Kenyatta National Hospital',
      weight: '7.2 kg',
      height: '67 cm',
      notes: 'Meeting developmental milestones',
      vaccines: ['Pentavalent 2', 'OPV 2']
    }
  ];

  // Growth tracking data
  const growthData = [
    { age: 'Birth', date: '2023-05-15', weight: '3.2', height: '50' },
    { age: '6 weeks', date: '2023-06-15', weight: '4.1', height: '54' },
    { age: '10 weeks', date: '2023-07-15', weight: '5.2', height: '58' },
    { age: '14 weeks', date: '2023-08-15', weight: '6.1', height: '62' },
    { age: '4 months', date: '2023-09-15', weight: '6.8', height: '65' },
    { age: '5 months', date: '2023-10-15', weight: '7.5', height: '68' },
    { age: '6 months', date: '2023-11-01', weight: '8.2', height: '72' }
  ];

  // Calculate growth percentiles (simplified)
  const calculatePercentile = (value, type) => {
    // Simplified percentile calculation - in real app, use WHO growth standards
    const standards = {
      weight: { '50th': 7.9, '75th': 8.4, '90th': 9.0 },
      height: { '50th': 67.0, '75th': 69.0, '90th': 71.0 }
    };
    
    const standard = standards[type];
    if (value <= standard['50th']) return '25th';
    if (value <= standard['75th']) return '50th';
    if (value <= standard['90th']) return '75th';
    return '90th';
  };

  const getRecordIcon = (type) => {
    const icons = {
      growth: Activity,
      vaccination: FileText,
      illness: Thermometer,
      routine: Calendar
    };
    return icons[type] || FileText;
  };

  const getRecordColor = (type) => {
    const colors = {
      growth: 'text-green-600 bg-green-100',
      vaccination: 'text-blue-600 bg-blue-100',
      illness: 'text-red-600 bg-red-100',
      routine: 'text-purple-600 bg-purple-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/mother')}
                className="p-2 rounded-lg hover:bg-gray-100 mr-4"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
                <p className="text-gray-600 mt-1">
                  {child.name} • {child.gender} • {child.age} old
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button 
                onClick={() => setShowAddRecord(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'records', 'growth', 'vaccinations', 'medications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Records</p>
                      <p className="text-2xl font-bold text-gray-900">{healthRecords.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Weight</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {growthData[growthData.length - 1]?.weight} kg
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <Ruler className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Height</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {growthData[growthData.length - 1]?.height} cm
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Visit</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {new Date(healthRecords[0]?.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Records */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Health Records</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {healthRecords.slice(0, 3).map((record) => {
                    const IconComponent = getRecordIcon(record.type);
                    return (
                      <div key={record.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-full ${getRecordColor(record.type)}`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {record.title}
                              </h4>
                              <p className="text-gray-600">
                                {record.provider} • {new Date(record.date).toLocaleDateString()}
                              </p>
                              {record.notes && (
                                <p className="text-gray-700 mt-2">{record.notes}</p>
                              )}
                              {record.weight && record.height && (
                                <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                                  <span className="flex items-center">
                                    <Weight className="h-4 w-4 mr-1" />
                                    {record.weight}
                                  </span>
                                  <span className="flex items-center">
                                    <Ruler className="h-4 w-4 mr-1" />
                                    {record.height}
                                  </span>
                                  {record.temperature && (
                                    <span className="flex items-center">
                                      <Thermometer className="h-4 w-4 mr-1" />
                                      {record.temperature}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* All Records Tab */}
          {activeTab === 'records' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Health Records</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {healthRecords.map((record) => {
                  const IconComponent = getRecordIcon(record.type);
                  return (
                    <div key={record.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`p-3 rounded-full ${getRecordColor(record.type)}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {record.title}
                                </h4>
                                <p className="text-gray-600">
                                  {record.provider} • {new Date(record.date).toLocaleDateString()}
                                </p>
                              </div>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                {record.type}
                              </span>
                            </div>
                            
                            {record.notes && (
                              <p className="text-gray-700 mt-2">{record.notes}</p>
                            )}

                            {/* Measurements */}
                            {(record.weight || record.height || record.temperature) && (
                              <div className="flex space-x-6 mt-3 text-sm">
                                {record.weight && (
                                  <div className="flex items-center text-gray-600">
                                    <Weight className="h-4 w-4 mr-1" />
                                    Weight: <span className="font-semibold ml-1">{record.weight}</span>
                                  </div>
                                )}
                                {record.height && (
                                  <div className="flex items-center text-gray-600">
                                    <Ruler className="h-4 w-4 mr-1" />
                                    Height: <span className="font-semibold ml-1">{record.height}</span>
                                  </div>
                                )}
                                {record.temperature && (
                                  <div className="flex items-center text-gray-600">
                                    <Thermometer className="h-4 w-4 mr-1" />
                                    Temp: <span className="font-semibold ml-1">{record.temperature}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Vaccines */}
                            {record.vaccines && record.vaccines.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700">Vaccines Administered:</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {record.vaccines.map((vaccine, index) => (
                                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                      {vaccine}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Attachments */}
                            {record.attachments && record.attachments.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700">Attachments:</p>
                                <div className="flex space-x-2 mt-1">
                                  {record.attachments.map((file, index) => (
                                    <button key={index} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                      <FileText className="h-4 w-4 mr-1" />
                                      {file}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Growth Tab */}
          {activeTab === 'growth' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Growth Tracking</h3>
                
                {/* Growth Chart Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Weight Progress</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {growthData[growthData.length - 1]?.weight} kg
                    </p>
                    <p className="text-sm text-gray-600">
                      {calculatePercentile(parseFloat(growthData[growthData.length - 1]?.weight), 'weight')} percentile
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Height Progress</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {growthData[growthData.length - 1]?.height} cm
                    </p>
                    <p className="text-sm text-gray-600">
                      {calculatePercentile(parseFloat(growthData[growthData.length - 1]?.height), 'height')} percentile
                    </p>
                  </div>
                </div>

                {/* Growth Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight (kg)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Height (cm)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {growthData.map((record, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.age}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{record.weight}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{record.height}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">KNH Clinic</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate age
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                 (today.getMonth() - birthDate.getMonth());
  
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
}

export default HealthRecords;