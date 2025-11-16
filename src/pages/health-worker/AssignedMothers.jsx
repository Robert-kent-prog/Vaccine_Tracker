// src/pages/health-worker/AssignedMothers.jsx
import React, { useState } from 'react';
import { Phone, MapPin, Calendar, Bell, Search } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SearchBar from '../../components/ui/SearchBar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { mockMothers } from '../../data/mockData/mothers';
import { mockChildren } from '../../data/mockData/children';

const AssignedMothers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for assigned mothers with their children
  const assignedMothers = mockMothers.map(mother => ({
    ...mother,
    children: mockChildren.filter(child => child.motherId === mother.id),
    status: Math.random() > 0.2 ? 'up-to-date' : 'defaulting',
    lastVisit: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));

  const filteredMothers = assignedMothers.filter(mother => {
    const matchesSearch = 
      mother.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mother.phone.includes(searchTerm) ||
      mother.children.some(child => 
        child.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === 'all' || mother.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getUpcomingVaccines = (children) => {
    return children.flatMap(child => 
      child.upcomingVaccines || []
    ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const sendReminder = (mother) => {
    console.log(`Sending reminder to ${mother.name} at ${mother.phone}`);
    // In real app, integrate with SMS service
    alert(`Reminder sent to ${mother.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Assigned Mothers" 
        subtitle="Manage mothers and children under your care"
      />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search by mother name, child name, or phone number..."
                  onClear={() => setSearchTerm('')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Mothers</option>
                  <option value="up-to-date">Up to Date</option>
                  <option value="defaulting">Defaulting</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mothers List */}
          <div className="space-y-6">
            {filteredMothers.map((mother) => {
              const upcomingVaccines = getUpcomingVaccines(mother.children);
              
              return (
                <div key={mother.id} className="bg-white rounded-lg shadow">
                  {/* Mother Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold">
                              {mother.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{mother.name}</h3>
                          <div className="flex items-center mt-1 space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {mother.phone}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {mother.village}, {mother.subCounty}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Last visit: {new Date(mother.lastVisit).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                        <Badge 
                          variant={mother.status === 'up-to-date' ? 'success' : 'danger'}
                        >
                          {mother.status === 'up-to-date' ? 'Up to Date' : 'Defaulting'}
                        </Badge>
                        <Button
                          onClick={() => sendReminder(mother)}
                          variant="outline"
                          className="flex items-center"
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Children and Vaccines */}
                  <div className="p-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Children ({mother.children.length})
                    </h4>
                    <div className="space-y-4">
                      {mother.children.map((child) => (
                        <div key={child.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                {child.firstName} {child.lastName}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {child.gender} • Born {new Date(child.dob).toLocaleDateString()} • {calculateAge(child.dob)} old
                              </p>
                            </div>
                            <Badge variant="primary">Active</Badge>
                          </div>

                          {/* Child's upcoming vaccines */}
                          {(child.upcomingVaccines || []).length > 0 && (
                            <div className="mt-3">
                              <h6 className="text-sm font-medium text-gray-700 mb-2">
                                Due Vaccinations:
                              </h6>
                              <div className="space-y-2">
                                {(child.upcomingVaccines || []).map((vaccine, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                                    <div>
                                      <p className="text-sm font-medium text-yellow-800">
                                        {vaccine.name}
                                      </p>
                                      <p className="text-xs text-yellow-600">
                                        Due: {new Date(vaccine.dueDate).toLocaleDateString()}
                                        {vaccine.daysLeft && ` (${vaccine.daysLeft} days)`}
                                      </p>
                                    </div>
                                    <Badge variant="warning">Due</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 flex space-x-3">
                      <Button>
                        Record Vaccination
                      </Button>
                      <Button variant="outline">
                        Schedule Visit
                      </Button>
                      {mother.status === 'defaulting' && (
                        <Button variant="danger">
                          Follow Up Required
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMothers.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mothers found</h3>
              <p className="text-gray-600">
                No mothers match your search criteria. Try adjusting your filters.
              </p>
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

export default AssignedMothers;