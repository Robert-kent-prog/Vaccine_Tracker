// src/pages/mother/ChildProfile.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Shield, User } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const ChildProfile = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vaccinations');

  // Mock data - in real app, fetch from API
  const child = {
    id: childId,
    name: 'Maria Auma',
    dob: '2023-05-15',
    gender: 'Female',
    birthWeight: '3.2 kg',
    birthHeight: '50 cm',
    motherName: 'Jane Atieno',
    phone: '+254712345678',
    address: 'Kibera, Nairobi'
  };

  const vaccinations = [
    { id: 1, name: 'BCG', date: '2023-05-15', status: 'completed', batch: 'BCG-2023-001' },
    { id: 2, name: 'OPV 0', date: '2023-05-15', status: 'completed', batch: 'OPV-2023-001' },
    { id: 3, name: 'Pentavalent 1', date: '2023-06-15', status: 'completed', batch: 'PENT-2023-001' },
    { id: 4, name: 'Measles Rubella', date: '2023-11-15', status: 'upcoming', daysLeft: 12 },
  ];

  const growthRecords = [
    { age: 'Birth', weight: '3.2 kg', height: '50 cm', date: '2023-05-15' },
    { age: '6 weeks', weight: '4.1 kg', height: '54 cm', date: '2023-06-15' },
    { age: '10 weeks', weight: '5.2 kg', height: '58 cm', date: '2023-07-15' },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'success',
      upcoming: 'primary',
      missed: 'danger',
      overdue: 'warning'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate('/mother')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Child Information Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{child.name}</h2>
                  <p className="text-gray-600">
                    {child.gender} • Born {new Date(child.dob).toLocaleDateString()} • {calculateAge(child.dob)} old
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Mother: {child.motherName} • {child.phone}
                  </p>
                </div>
              </div>
              <Badge variant="primary">Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Birth Weight</p>
                <p className="font-semibold text-gray-900">{child.birthWeight}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Birth Height</p>
                <p className="font-semibold text-gray-900">{child.birthHeight}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">{child.address}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {['vaccinations', 'growth', 'reminders'].map((tab) => (
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

          {/* Vaccinations Tab */}
          {activeTab === 'vaccinations' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Vaccination History
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {vaccinations.map((vaccine) => (
                  <div key={vaccine.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{vaccine.name}</h4>
                        <p className="text-gray-600 text-sm">
                          {vaccine.status === 'completed' 
                            ? `Given on ${new Date(vaccine.date).toLocaleDateString()}`
                            : `Due on ${new Date(vaccine.date).toLocaleDateString()}`
                          }
                          {vaccine.batch && ` • Batch: ${vaccine.batch}`}
                          {vaccine.daysLeft && ` • ${vaccine.daysLeft} days remaining`}
                        </p>
                      </div>
                      {getStatusBadge(vaccine.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Growth Tab */}
          {activeTab === 'growth' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Growth Records</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {growthRecords.map((record, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{record.age}</h4>
                        <p className="text-gray-600 text-sm">
                          Date: {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{record.weight}</p>
                        <p className="text-gray-600 text-sm">Weight</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{record.height}</p>
                        <p className="text-gray-600 text-sm">Height</p>
                      </div>
                    </div>
                  </div>
                ))}
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

export default ChildProfile;