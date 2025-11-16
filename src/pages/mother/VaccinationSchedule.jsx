// src/pages/mother/VaccinationSchedule.jsx
import { useState } from 'react';
import { Calendar, Shield, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import { KENYA_VACCINE_SCHEDULE } from '../../data/vaccines/kenyaSchedule';
import { mockChildren } from '../../data/mockData/children';

const VaccinationSchedule = () => {
  const [selectedChild, setSelectedChild] = useState(mockChildren[0]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock vaccination records for the selected child
  const vaccinationRecords = [
    { vaccineId: 'bcg', date: '2023-05-15', status: 'completed' },
    { vaccineId: 'opv0', date: '2023-05-15', status: 'completed' },
    { vaccineId: 'pentavalent1', date: '2023-06-15', status: 'completed' },
    { vaccineId: 'opv1', date: '2023-06-15', status: 'completed' },
    { vaccineId: 'pcv1', date: '2023-06-15', status: 'completed' },
    { vaccineId: 'rota1', date: '2023-06-15', status: 'completed' },
  ];

  const getVaccineStatus = (vaccineId) => {
    const record = vaccinationRecords.find(r => r.vaccineId === vaccineId);
    if (record) {
      return { status: 'completed', date: record.date };
    }

    // Simple logic to determine upcoming/overdue status
    // In real app, calculate based on child's age and vaccine schedule
    const childAge = calculateAgeInMonths(selectedChild.dateOfBirth);
    const vaccine = Object.values(KENYA_VACCINE_SCHEDULE)
      .flat()
      .find(v => v.id === vaccineId);

    if (vaccine && childAge > vaccine.window.to) {
      return { status: 'overdue' };
    } else if (vaccine && childAge >= vaccine.window.from) {
      return { status: 'due' };
    } else {
      return { status: 'upcoming' };
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      completed: { variant: 'success', icon: CheckCircle, label: 'Completed' },
      due: { variant: 'warning', icon: Clock, label: 'Due Now' },
      overdue: { variant: 'danger', icon: AlertTriangle, label: 'Overdue' },
      upcoming: { variant: 'primary', icon: Calendar, label: 'Upcoming' }
    };

    const config = variants[status] || variants.upcoming;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center">
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getAllVaccines = () => {
    return Object.entries(KENYA_VACCINE_SCHEDULE).flatMap(([category, vaccines]) =>
      vaccines.map(vaccine => ({
        ...vaccine,
        category,
        status: getVaccineStatus(vaccine.id)
      }))
    );
  };

  const filteredVaccines = getAllVaccines().filter(vaccine => 
    activeCategory === 'all' || vaccine.status.status === activeCategory
  );

  const stats = {
    completed: filteredVaccines.filter(v => v.status.status === 'completed').length,
    due: filteredVaccines.filter(v => v.status.status === 'due').length,
    overdue: filteredVaccines.filter(v => v.status.status === 'overdue').length,
    upcoming: filteredVaccines.filter(v => v.status.status === 'upcoming').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
    

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Child Selection and Stats */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {selectedChild.firstName[0]}{selectedChild.lastName[0]}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedChild.firstName} {selectedChild.lastName}
                  </h2>
                  <p className="text-gray-600">
                    {selectedChild.gender} • Born {new Date(selectedChild.dateOfBirth).toLocaleDateString()} • {calculateAge(selectedChild.dateOfBirth)} old
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.due}</div>
                  <div className="text-sm text-gray-600">Due Now</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                  <div className="text-sm text-gray-600">Overdue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All Vaccines
              </button>
              <button
                onClick={() => setActiveCategory('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveCategory('due')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === 'due'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Due Now
              </button>
              <button
                onClick={() => setActiveCategory('overdue')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === 'overdue'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overdue
              </button>
            </div>
          </div>

          {/* Vaccination Schedule */}
          <div className="space-y-6">
            {Object.entries(KENYA_VACCINE_SCHEDULE).map(([category, vaccines]) => {
              const categoryVaccines = vaccines.filter(vaccine =>
                filteredVaccines.some(v => v.id === vaccine.id)
              );

              if (categoryVaccines.length === 0) return null;

              return (
                <div key={category} className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Vaccines due {getCategoryTimeline(category)}
                    </p>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {categoryVaccines.map((vaccine) => {
                      const status = getVaccineStatus(vaccine.id);
                      
                      return (
                        <div key={vaccine.id} className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-start space-x-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <Shield className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {vaccine.name}
                                  </h4>
                                  <p className="text-gray-600 mt-1">{vaccine.description}</p>
                                  <p className="text-sm text-gray-500 mt-2">
                                    Protects against: <strong>{vaccine.disease}</strong>
                                  </p>
                                  <div className="flex items-center mt-3 space-x-4 text-sm text-gray-500">
                                    <span>Due: {vaccine.dueAge}</span>
                                    <span>Route: {vaccine.route}</span>
                                    {vaccine.site && <span>Site: {vaccine.site}</span>}
                                  </div>
                                  {status.date && (
                                    <p className="text-sm text-green-600 mt-2">
                                      Given on: {new Date(status.date).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              {getStatusBadge(status.status)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredVaccines.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeCategory === 'completed' 
                  ? 'No completed vaccines yet'
                  : 'No vaccines match your filter'
                }
              </h3>
              <p className="text-gray-600">
                {activeCategory === 'completed' 
                  ? 'Vaccination records will appear here once they are completed.'
                  : 'Try selecting a different filter to see more vaccines.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper functions
function calculateAgeInMonths(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                 (today.getMonth() - birthDate.getMonth());
  return months;
}

function calculateAge(dob) {
  const months = calculateAgeInMonths(dob);
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
}

function getCategoryTimeline(category) {
  const timelines = {
    birth: 'at birth',
    '6Weeks': 'at 6 weeks',
    '10Weeks': 'at 10 weeks', 
    '14Weeks': 'at 14 weeks',
    '9Months': 'at 9 months',
    '18Months': 'at 18 months'
  };
  return timelines[category] || '';
}

export default VaccinationSchedule;