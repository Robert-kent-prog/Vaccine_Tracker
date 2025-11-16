// src/pages/health-worker/DefaultersList.jsx
import React, { useState } from 'react';
import { Phone, Calendar, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import SearchBar from '../../components/ui/SearchBar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { defaulters } from '../../data/mockData/vaccinations';

const DefaultersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [followupStatus, setFollowupStatus] = useState({});

  const filteredDefaulters = defaulters.filter(defaulter => {
    const matchesSearch = 
      defaulter.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defaulter.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defaulter.motherPhone.includes(searchTerm);
    
    const matchesRisk = riskFilter === 'all' || defaulter.riskLevel === riskFilter;
    
    return matchesSearch && matchesRisk;
  });

  const handleFollowup = (defaulterId, status) => {
    setFollowupStatus(prev => ({
      ...prev,
      [defaulterId]: { status, timestamp: new Date().toISOString() }
    }));
    
    if (status === 'contacted') {
      // In real app, record followup and send notification
      console.log(`Followup recorded for defaulter ${defaulterId}`);
    }
  };

  const getRiskColor = (riskLevel) => {
    const colors = {
      high: 'red',
      medium: 'yellow',
      low: 'green'
    };
    return colors[riskLevel] || 'gray';
  };

  const getDaysOverdueText = (days) => {
    if (days <= 7) return `(${days} day${days !== 1 ? 's' : ''} overdue)`;
    if (days <= 30) return `(${days} days overdue - Urgent)`;
    return `(${days} days overdue - Critical)`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Defaulters List" 
        subtitle="Children with overdue vaccinations requiring follow-up"
      />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Defaulters</p>
                  <p className="text-2xl font-bold text-gray-900">{defaulters.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk</p>
                  <p className="text-2xl font-bold text-red-600">
                    {defaulters.filter(d => d.riskLevel === 'high').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Days Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(defaulters.reduce((acc, d) => acc + d.daysOverdue, 0) / defaulters.length)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Follow-ups Today</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search by child name, mother name, or phone number..."
                  onClear={() => setSearchTerm('')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level
                </label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Defaulters List */}
          <div className="space-y-6">
            {filteredDefaulters.map((defaulter) => {
              const followup = followupStatus[defaulter.id];
              
              return (
                <div key={defaulter.id} className="bg-white rounded-lg shadow border-l-4 border-red-500">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {defaulter.childName}
                            </h3>
                            <div className="flex items-center mt-1 space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {defaulter.motherPhone} ({defaulter.motherName})
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Due: {new Date(defaulter.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge variant={getRiskColor(defaulter.riskLevel)}>
                              {defaulter.riskLevel.toUpperCase()} RISK
                            </Badge>
                            <span className="text-sm text-red-600 font-medium">
                              {getDaysOverdueText(defaulter.daysOverdue)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900">Overdue Vaccine</h4>
                          <p className="text-red-600 font-semibold">{defaulter.vaccineName}</p>
                          
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">CHW Assigned:</span>
                              <span className="ml-2 font-medium">{defaulter.chwAssigned}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Follow-up Attempts:</span>
                              <span className="ml-2 font-medium">{defaulter.followupAttempts}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Last Follow-up:</span>
                              <span className="ml-2 font-medium">
                                {new Date(defaulter.lastFollowup).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Follow-up Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div>
                        {followup ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-green-600 font-medium">
                              Follow-up recorded ({followup.status}) - {new Date(followup.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-600">No follow-up recorded today</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleFollowup(defaulter.id, 'contacted')}
                          variant="success"
                          className="flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Contacted
                        </Button>
                        <Button
                          onClick={() => handleFollowup(defaulter.id, 'visited')}
                          className="flex items-center"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Home Visit
                        </Button>
                        <Button
                          onClick={() => handleFollowup(defaulter.id, 'unreachable')}
                          variant="outline"
                          className="flex items-center"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Unreachable
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDefaulters.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No defaulters found</h3>
              <p className="text-gray-600">
                {defaulters.length === 0 
                  ? "Great! All children are up to date with their vaccinations."
                  : "No defaulters match your search criteria."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultersList;