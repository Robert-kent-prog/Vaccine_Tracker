// src/pages/health-worker/RecordVaccination.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import VaccinationRecordForm from '../../components/forms/VaccinationRecordForm';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const RecordVaccination = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [showRecordForm, setShowRecordForm] = useState(false);

  // Mock data - in real app, fetch from API
  const children = [
    {
      id: 1,
      name: 'Maria Auma',
      dob: '2023-05-15',
      gender: 'Female',
      motherName: 'Jane Atieno',
      phone: '+254712345678',
      upcomingVaccines: [
        { id: 'measles1', name: 'Measles Rubella 1', dueDate: '2023-11-15' }
      ]
    },
    {
      id: 2,
      name: 'John Kamau',
      dob: '2023-07-20',
      gender: 'Male',
      motherName: 'Grace Mwende',
      phone: '+254723456789',
      upcomingVaccines: [
        { id: 'pentavalent3', name: 'Pentavalent 3', dueDate: '2023-10-28' }
      ]
    }
  ];

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.phone.includes(searchTerm)
  );

  const handleRecordVaccination = async (vaccinationData) => {
    // In real app, submit to API
    console.log('Recording vaccination:', vaccinationData);
    setShowRecordForm(false);
    setSelectedChild(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
 

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate('/health-worker')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by child name, mother name, or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Children List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Children</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredChildren.map((child) => (
                <div key={child.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
                      <p className="text-gray-600">
                        {child.gender} • Born {new Date(child.dob).toLocaleDateString()} • {calculateAge(child.dob)} old
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Mother: {child.motherName} • {child.phone}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedChild(child);
                        setShowRecordForm(true);
                      }}
                    >
                      Record Vaccination
                    </Button>
                  </div>

                  {/* Upcoming Vaccines */}
                  {child.upcomingVaccines.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">Due Vaccinations</h5>
                      <div className="space-y-2">
                        {child.upcomingVaccines.map((vaccine, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                              <p className="font-medium text-blue-900">{vaccine.name}</p>
                              <p className="text-blue-700 text-sm">
                                Due: {new Date(vaccine.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                              Due
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Record Vaccination Modal */}
          <Modal
            isOpen={showRecordForm}
            onClose={() => {
              setShowRecordForm(false);
              setSelectedChild(null);
            }}
            title="Record Vaccination"
            size="large"
          >
            {selectedChild && (
              <VaccinationRecordForm
                child={selectedChild}
                vaccine={selectedChild.upcomingVaccines[0]}
                onSubmit={handleRecordVaccination}
                onCancel={() => {
                  setShowRecordForm(false);
                  setSelectedChild(null);
                }}
              />
            )}
          </Modal>
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

export default RecordVaccination;