// src/components/patient/PatientDetail.jsx
import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  FileText, 
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Printer
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const PatientDetail = ({ patient, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!patient) return null;

  const getStatusColor = (status) => {
    const colors = {
      'up-to-date': 'green',
      'defaulting': 'yellow',
      'overdue': 'red'
    };
    return colors[status] || 'gray';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'up-to-date': 'Up to Date',
      'defaulting': 'Defaulting',
      'overdue': 'Overdue'
    };
    return labels[status] || status;
  };

  const getVaccineStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getVaccineStatusColor = (status) => {
    const colors = {
      'completed': 'green',
      'overdue': 'red',
      'scheduled': 'blue',
      'pending': 'gray'
    };
    return colors[status] || 'gray';
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return { years, months };
  };

  const { years, months } = calculateAge(patient.dateOfBirth);
  const ageString = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''}`;

  const completedVaccines = patient.vaccines.filter(v => v.status === 'completed');
  const overdueVaccines = patient.vaccines.filter(v => v.status === 'overdue');
  const scheduledVaccines = patient.vaccines.filter(v => v.status === 'scheduled');

  const handlePrintRecord = () => {
    console.log('Printing patient record:', patient.id);
    // In real app, generate printable PDF
  };

  const handleExportRecord = () => {
    console.log('Exporting patient record:', patient.id);
    // In real app, generate downloadable file
  };

  const handleScheduleAppointment = () => {
    console.log('Schedule appointment for:', patient.id);
    // In real app, navigate to appointments page
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">{patient.childName}</h2>
                <Badge variant={getStatusColor(patient.status)}>
                  {getStatusLabel(patient.status)}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">Patient Record</p>
              
              <div className="flex flex-wrap items-center mt-3 space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Born: {patient.dateOfBirth.toLocaleDateString()} ({ageString})
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  {patient.gender}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {patient.contact}
                </div>
                {patient.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {patient.email}
                  </div>
                )}
              </div>
              
              {patient.address && (
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {patient.address}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePrintRecord}
              className="flex items-center"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              variant="outline"
              onClick={handleExportRecord}
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={onEdit}
              className="flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Parent/Guardian Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">Name:</span>
            <span className="ml-2 text-blue-700">{patient.parentName}</span>
          </div>
          <div>
            <span className="font-medium text-blue-800">Contact:</span>
            <span className="ml-2 text-blue-700">{patient.contact}</span>
          </div>
          {patient.email && (
            <div>
              <span className="font-medium text-blue-800">Email:</span>
              <span className="ml-2 text-blue-700">{patient.email}</span>
            </div>
          )}
          {patient.address && (
            <div className="md:col-span-2">
              <span className="font-medium text-blue-800">Address:</span>
              <span className="ml-2 text-blue-700">{patient.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'vaccinations', 'appointments', 'notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-green-600">Completed</p>
                    <p className="text-2xl font-bold text-green-900">{completedVaccines.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <XCircle className="h-8 w-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-red-600">Overdue</p>
                    <p className="text-2xl font-bold text-red-900">{overdueVaccines.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-600">Scheduled</p>
                    <p className="text-2xl font-bold text-blue-900">{scheduledVaccines.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-4">
                {patient.vaccines
                  .filter(v => v.status === 'completed')
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 3)
                  .map((vaccine, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{vaccine.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {vaccine.date.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                
                {completedVaccines.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>

            {/* Next Due Vaccines */}
            {overdueVaccines.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="text-sm font-medium text-red-800">Overdue Vaccinations</h3>
                </div>
                <ul className="mt-2 space-y-1">
                  {overdueVaccines.map((vaccine, index) => (
                    <li key={index} className="text-sm text-red-700">
                      {vaccine.name} - Due {vaccine.date.toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Vaccinations Tab */}
        {activeTab === 'vaccinations' && (
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Vaccination History</h3>
              <span className="text-sm text-gray-500">
                {completedVaccines.length} of {patient.vaccines.length} completed
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vaccine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scheduled Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patient.vaccines.map((vaccine, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getVaccineStatusIcon(vaccine.status)}
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {vaccine.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vaccine.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getVaccineStatusColor(vaccine.status)}>
                          {vaccine.status.charAt(0).toUpperCase() + vaccine.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {vaccine.status !== 'completed' && (
                          <Button
                            size="small"
                            onClick={handleScheduleAppointment}
                          >
                            Schedule
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Appointment History</h3>
                <Button
                  size="small"
                  onClick={handleScheduleAppointment}
                >
                  New Appointment
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Appointments Found</h4>
                <p className="text-gray-500 mb-4">
                  This patient doesn't have any scheduled appointments yet.
                </p>
                <Button onClick={handleScheduleAppointment}>
                  Schedule First Appointment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Medical Notes</h3>
              </div>
              <div className="p-4">
                <textarea
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Add medical notes, allergies, or special instructions..."
                />
                <div className="mt-3 flex justify-end">
                  <Button>Save Notes</Button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Growth Tracking</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Head Circumference (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button>Record Measurements</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleScheduleAppointment}>
          Schedule Appointment
        </Button>
      </div>
    </div>
  );
};

export default PatientDetail;