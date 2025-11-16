// src/pages/health-worker/FieldReports.jsx
import React, { useState } from 'react';
import { Plus, FileText, Calendar, MapPin, Users, Shield } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const FieldReports = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reports, setReports] = useState([
    {
      id: 1,
      date: '2023-10-25',
      location: 'Kibera, Lindi Village',
      mothersVisited: 8,
      vaccinationsGiven: 12,
      followups: 3,
      challenges: 'Heavy rains affected mobility',
      notes: 'Successfully convinced 2 defaulting mothers to visit health facility',
      status: 'submitted'
    },
    {
      id: 2,
      date: '2023-10-24',
      location: 'Mathare, Mabatini',
      mothersVisited: 6,
      vaccinationsGiven: 8,
      followups: 2,
      challenges: 'Some mothers unavailable during visit',
      notes: 'Coordinated with local community leaders for awareness',
      status: 'submitted'
    }
  ]);

  const [newReport, setNewReport] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    mothersVisited: '',
    vaccinationsGiven: '',
    followups: '',
    challenges: '',
    notes: ''
  });

  const handleSubmitReport = (e) => {
    e.preventDefault();
    const report = {
      id: Date.now(),
      ...newReport,
      mothersVisited: parseInt(newReport.mothersVisited),
      vaccinationsGiven: parseInt(newReport.vaccinationsGiven),
      followups: parseInt(newReport.followups),
      status: 'submitted'
    };
    setReports(prev => [report, ...prev]);
    setShowReportForm(false);
    setNewReport({
      date: new Date().toISOString().split('T')[0],
      location: '',
      mothersVisited: '',
      vaccinationsGiven: '',
      followups: '',
      challenges: '',
      notes: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prev => ({ ...prev, [name]: value }));
  };

  const stats = {
    totalReports: reports.length,
    totalMothersVisited: reports.reduce((sum, report) => sum + report.mothersVisited, 0),
    totalVaccinations: reports.reduce((sum, report) => sum + report.vaccinationsGiven, 0),
    totalFollowups: reports.reduce((sum, report) => sum + report.followups, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Field Reports" 
        subtitle="Document your daily field activities and achievements"
      />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Mothers Visited</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalMothersVisited}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Vaccinations Given</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVaccinations}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Follow-ups</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFollowups}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Header with Action Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daily Reports</h2>
              <p className="text-gray-600">View and submit your field activity reports</p>
            </div>
            <Button
              onClick={() => setShowReportForm(true)}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>

          {/* Reports List */}
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(report.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {report.location}
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {report.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{report.mothersVisited}</p>
                          <p className="text-sm text-blue-600">Mothers Visited</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{report.vaccinationsGiven}</p>
                          <p className="text-sm text-green-600">Vaccinations Given</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{report.followups}</p>
                          <p className="text-sm text-purple-600">Follow-ups</p>
                        </div>
                      </div>

                      {report.challenges && (
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900 mb-1">Challenges</h4>
                          <p className="text-gray-600 text-sm">{report.challenges}</p>
                        </div>
                      )}

                      {report.notes && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                          <p className="text-gray-600 text-sm">{report.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
              <p className="text-gray-600 mb-4">
                Start documenting your field activities by creating your first report.
              </p>
              <Button
                onClick={() => setShowReportForm(true)}
                className="flex items-center mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Report
              </Button>
            </div>
          )}

          {/* Report Form Modal */}
          <Modal
            isOpen={showReportForm}
            onClose={() => setShowReportForm(false)}
            title="New Field Report"
            size="large"
          >
            <form onSubmit={handleSubmitReport} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newReport.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newReport.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter location/village"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mothers Visited *
                  </label>
                  <input
                    type="number"
                    name="mothersVisited"
                    value={newReport.mothersVisited}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaccinations Given *
                  </label>
                  <input
                    type="number"
                    name="vaccinationsGiven"
                    value={newReport.vaccinationsGiven}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-ups Conducted
                  </label>
                  <input
                    type="number"
                    name="followups"
                    value={newReport.followups}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenges Faced
                </label>
                <textarea
                  name="challenges"
                  value={newReport.challenges}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe any challenges encountered during your field work..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={newReport.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Any additional observations or success stories..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReportForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Report
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FieldReports;