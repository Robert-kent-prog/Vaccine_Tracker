// src/pages/admin/HospitalManagement.jsx
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Building, Phone, Mail, MapPin } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import HospitalManagementForm from '../../components/forms/HospitalManagementForm';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import SearchBar from '../../components/ui/SearchBar';

const HospitalManagement = () => {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'Nairobi General Hospital',
      type: 'Public',
      county: 'Nairobi',
      subCounty: 'Westlands',
      phone: '+254-20-1234567',
      email: 'info@nairobihospital.go.ke',
      address: 'Hospital Road, Westlands',
      status: 'active',
      staffCount: 45,
      coverageRate: 78,
      dateRegistered: '2023-01-15'
    },
    {
      id: 2,
      name: 'Kenyatta National Hospital',
      type: 'National Referral',
      county: 'Nairobi',
      subCounty: 'Nairobi Central',
      phone: '+254-20-7654321',
      email: 'admin@knh.or.ke',
      address: 'Hospital Street, Nairobi',
      status: 'active',
      staffCount: 120,
      coverageRate: 85,
      dateRegistered: '2023-02-20'
    },
    {
      id: 3,
      name: 'Mombasa County Hospital',
      type: 'County',
      county: 'Mombasa',
      subCounty: 'Mombasa Island',
      phone: '+254-41-9876543',
      email: 'contact@mombasahospital.go.ke',
      address: 'Nyerere Avenue, Mombasa',
      status: 'inactive',
      staffCount: 32,
      coverageRate: 65,
      dateRegistered: '2023-03-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [countyFilter, setCountyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showHospitalForm, setShowHospitalForm] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.phone.includes(searchTerm);
    
    const matchesCounty = countyFilter === 'all' || hospital.county === countyFilter;
    const matchesStatus = statusFilter === 'all' || hospital.status === statusFilter;
    
    return matchesSearch && matchesCounty && matchesStatus;
  });

  const handleCreateHospital = async (hospitalData) => {
    const newHospital = {
      id: Date.now(),
      ...hospitalData,
      dateRegistered: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setHospitals(prev => [...prev, newHospital]);
    setShowHospitalForm(false);
  };

  const handleUpdateHospital = async (hospitalData) => {
    setHospitals(prev => prev.map(hospital => 
      hospital.id === editingHospital.id ? { ...hospital, ...hospitalData } : hospital
    ));
    setEditingHospital(null);
    setShowHospitalForm(false);
  };

  const handleDeleteHospital = (hospitalId) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      setHospitals(prev => prev.filter(hospital => hospital.id !== hospitalId));
    }
  };

  const handleEditHospital = (hospital) => {
    setEditingHospital(hospital);
    setShowHospitalForm(true);
  };

  const columns = [
    {
      key: 'hospital',
      header: 'Hospital',
      render: (hospital) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
            <Building className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{hospital.name}</div>
            <div className="text-sm text-gray-500">{hospital.type}</div>
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      header: 'Contact',
      render: (hospital) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            {hospital.phone}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            {hospital.email}
          </div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (hospital) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {hospital.county}, {hospital.subCounty}
          </div>
          <div className="text-sm text-gray-500">{hospital.address}</div>
        </div>
      )
    },
    {
      key: 'stats',
      header: 'Statistics',
      render: (hospital) => (
        <div>
          <div className="text-sm text-gray-900">Staff: {hospital.staffCount}</div>
          <div className="text-sm text-gray-500">Coverage: {hospital.coverageRate}%</div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (hospital) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          hospital.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {hospital.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (hospital) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditHospital(hospital)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteHospital(hospital.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  const counties = [...new Set(hospitals.map(h => h.county))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospitals</h1>
              <p className="text-gray-600">Manage all healthcare facilities in the system</p>
            </div>
            <Button
              onClick={() => {
                setEditingHospital(null);
                setShowHospitalForm(true);
              }}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Hospital
            </Button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search hospitals by name, county, or phone..."
                  onClear={() => setSearchTerm('')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    County
                  </label>
                  <select
                    value={countyFilter}
                    onChange={(e) => setCountyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Counties</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Hospitals Table */}
          <div className="bg-white rounded-lg shadow">
            <Table
              columns={columns}
              data={filteredHospitals}
              emptyMessage="No hospitals found matching your criteria"
            />
          </div>

          {/* Hospital Form Modal */}
          <Modal
            isOpen={showHospitalForm}
            onClose={() => {
              setShowHospitalForm(false);
              setEditingHospital(null);
            }}
            title={editingHospital ? 'Edit Hospital' : 'Add New Hospital'}
            size="large"
          >
            <HospitalManagementForm
              hospital={editingHospital}
              onSubmit={editingHospital ? handleUpdateHospital : handleCreateHospital}
              onCancel={() => {
                setShowHospitalForm(false);
                setEditingHospital(null);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HospitalManagement;