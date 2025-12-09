// src/pages/hospital/PatientRecords.jsx
import React, { useState } from 'react';
import {
  User,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  FileText,
  Calendar,
  Shield,
  TrendingUp,
  Phone,
} from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import PatientDetail from '../../components/forms/PatientDetail';

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientDetail, setShowPatientDetail] = useState(false);

  // Mock patient data
  const patients = [
    {
      id: 1,
      childName: 'John Doe',
      parentName: 'Jane Doe',
      dateOfBirth: new Date(2023, 8, 15),
      age: '6 months',
      gender: 'Male',
      contact: '+254712345678',
      email: 'jane.doe@email.com',
      address: '123 Main St, Nairobi',
      status: 'up-to-date', // up-to-date, defaulting, overdue
      lastVisit: new Date(2024, 1, 15),
      nextVisit: new Date(2024, 3, 15),
      vaccines: [
        { name: 'BCG', date: new Date(2023, 8, 15), status: 'completed' },
        { name: 'OPV 0', date: new Date(2023, 8, 15), status: 'completed' },
        { name: 'Pentavalent 1', date: new Date(2023, 10, 15), status: 'completed' },
        { name: 'Pentavalent 2', date: new Date(2024, 0, 15), status: 'completed' },
        { name: 'Pentavalent 3', date: new Date(2024, 3, 15), status: 'scheduled' }
      ]
    },
    {
      id: 2,
      childName: 'Sarah Smith',
      parentName: 'Michael Smith',
      dateOfBirth: new Date(2023, 10, 20),
      age: '4 months',
      gender: 'Female',
      contact: '+254723456789',
      email: 'michael.smith@email.com',
      address: '456 Oak Ave, Mombasa',
      status: 'defaulting',
      lastVisit: new Date(2024, 0, 20),
      nextVisit: new Date(2024, 2, 20),
      vaccines: [
        { name: 'BCG', date: new Date(2023, 10, 20), status: 'completed' },
        { name: 'OPV 0', date: new Date(2023, 10, 20), status: 'completed' },
        { name: 'Pentavalent 1', date: new Date(2024, 0, 20), status: 'completed' },
        { name: 'Pentavalent 2', date: new Date(2024, 2, 20), status: 'overdue' }
      ]
    },
    {
      id: 3,
      childName: 'David Johnson',
      parentName: 'Mary Johnson',
      dateOfBirth: new Date(2023, 2, 10),
      age: '12 months',
      gender: 'Male',
      contact: '+254734567890',
      email: 'mary.johnson@email.com',
      address: '789 Pine Rd, Kisumu',
      status: 'overdue',
      lastVisit: new Date(2023, 11, 10),
      nextVisit: null,
      vaccines: [
        { name: 'BCG', date: new Date(2023, 2, 10), status: 'completed' },
        { name: 'OPV 0', date: new Date(2023, 2, 10), status: 'completed' },
        { name: 'Pentavalent 1', date: new Date(2023, 4, 10), status: 'completed' },
        { name: 'Pentavalent 2', date: new Date(2023, 6, 10), status: 'completed' },
        { name: 'Pentavalent 3', date: new Date(2023, 8, 10), status: 'completed' },
        { name: 'Measles', date: new Date(2024, 2, 10), status: 'overdue' }
      ]
    }
  ];

  const statusColors = {
    'up-to-date': 'green',
    'defaulting': 'yellow',
    'overdue': 'red'
  };

  const getStatusLabel = (status) => {
    const labels = {
      'up-to-date': 'Up to Date',
      'defaulting': 'Defaulting',
      'overdue': 'Overdue'
    };
    return labels[status] || status;
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.contact.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesAge = ageFilter === 'all' || 
                      (ageFilter === 'infant' && parseInt(patient.age) <= 12) ||
                      (ageFilter === 'toddler' && parseInt(patient.age) > 12 && parseInt(patient.age) <= 36);
    return matchesSearch && matchesStatus && matchesAge;
  });

  const stats = {
    total: patients.length,
    upToDate: patients.filter(p => p.status === 'up-to-date').length,
    defaulting: patients.filter(p => p.status === 'defaulting').length,
    overdue: patients.filter(p => p.status === 'overdue').length
  };

  const handleExportRecords = () => {
    console.log('Exporting patient records...');
    // In real app, generate and download PDF/Excel report
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetail(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
   

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Up to Date</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.upToDate}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Defaulting</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.defaulting}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 w-64"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Status</option>
                  <option value="up-to-date">Up to Date</option>
                  <option value="defaulting">Defaulting</option>
                  <option value="overdue">Overdue</option>
                </select>

                {/* Age Filter */}
                <select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Ages</option>
                  <option value="infant">Infants (0-12 months)</option>
                  <option value="toddler">Toddlers (13-36 months)</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleExportRecords}
                  variant="outline"
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  New Patient
                </Button>
              </div>
            </div>
          </div>

          {/* Patients Grid/List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Patient Records ({filteredPatients.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Child Information
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parent/Guardian
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vaccination Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Due
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.childName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {patient.age} • {patient.gender}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.parentName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {patient.contact}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Badge variant={statusColors[patient.status]}>
                            {getStatusLabel(patient.status)}
                          </Badge>
                          <div className="ml-2 text-xs text-gray-500">
                            {patient.vaccines.filter(v => v.status === 'completed').length}/
                            {patient.vaccines.length} completed
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.lastVisit ? patient.lastVisit.toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.nextVisit ? patient.nextVisit.toLocaleDateString() : 'None scheduled'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="small"
                            variant="outline"
                            onClick={() => handleViewPatient(patient)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="small"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="small"
                            variant="outline"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Patient Detail Modal */}
          <Modal
            isOpen={showPatientDetail}
            onClose={() => {
              setShowPatientDetail(false);
              setSelectedPatient(null);
            }}
            title="Patient Details"
            size="extra-large"
          >
            <PatientDetail
              patient={selectedPatient}
              onClose={() => {
                setShowPatientDetail(false);
                setSelectedPatient(null);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;