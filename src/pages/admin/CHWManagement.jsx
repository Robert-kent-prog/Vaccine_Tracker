// src/pages/admin/CHWManagement.jsx
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Users, Phone, Mail, MapPin, Shield } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import CHWManagementForm from '../../components/forms/CHWManagementForm';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import SearchBar from '../../components/ui/SearchBar';

const CHWManagement = () => {
  const [chws, setChws] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Wambui',
      phone: '+254712345678',
      email: 'sarah.wambui@chw.org',
      county: 'Nairobi',
      subCounty: 'Westlands',
      facility: 'Nairobi General Hospital',
      assignedMothers: 45,
      coverageRate: 89,
      status: 'active',
      dateJoined: '2023-01-15',
      lastActivity: '2024-02-15'
    },
    {
      id: 2,
      firstName: 'James',
      lastName: 'Mwangi',
      phone: '+254723456789',
      email: 'james.mwangi@chw.org',
      county: 'Kiambu',
      subCounty: 'Thika',
      facility: 'Thika Level 5 Hospital',
      assignedMothers: 38,
      coverageRate: 76,
      status: 'active',
      dateJoined: '2023-02-20',
      lastActivity: '2024-02-14'
    },
    {
      id: 3,
      firstName: 'Grace',
      lastName: 'Akinyi',
      phone: '+254734567890',
      email: 'grace.akinyi@chw.org',
      county: 'Kisumu',
      subCounty: 'Kisumu Central',
      facility: 'Kisumu County Hospital',
      assignedMothers: 52,
      coverageRate: 92,
      status: 'inactive',
      dateJoined: '2023-03-10',
      lastActivity: '2024-01-20'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [countyFilter, setCountyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCHWForm, setShowCHWForm] = useState(false);
  const [editingCHW, setEditingCHW] = useState(null);

  const filteredCHWs = chws.filter(chw => {
    const matchesSearch = 
      chw.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chw.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chw.phone.includes(searchTerm) ||
      chw.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCounty = countyFilter === 'all' || chw.county === countyFilter;
    const matchesStatus = statusFilter === 'all' || chw.status === statusFilter;
    
    return matchesSearch && matchesCounty && matchesStatus;
  });

  const handleCreateCHW = async (chwData) => {
    const newCHW = {
      id: Date.now(),
      ...chwData,
      dateJoined: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setChws(prev => [...prev, newCHW]);
    setShowCHWForm(false);
  };

  const handleUpdateCHW = async (chwData) => {
    setChws(prev => prev.map(chw => 
      chw.id === editingCHW.id ? { ...chw, ...chwData } : chw
    ));
    setEditingCHW(null);
    setShowCHWForm(false);
  };

  const handleDeleteCHW = (chwId) => {
    if (window.confirm('Are you sure you want to delete this CHW?')) {
      setChws(prev => prev.filter(chw => chw.id !== chwId));
    }
  };

  const handleEditCHW = (chw) => {
    setEditingCHW(chw);
    setShowCHWForm(true);
  };

  const columns = [
    {
      key: 'chw',
      header: 'CHW',
      render: (chw) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {chw.firstName} {chw.lastName}
            </div>
            <div className="text-sm text-gray-500">
              Joined {new Date(chw.dateJoined).toLocaleDateString()}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      header: 'Contact',
      render: (chw) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            {chw.phone}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            {chw.email}
          </div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location & Facility',
      render: (chw) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {chw.county}, {chw.subCounty}
          </div>
          <div className="text-sm text-gray-500">{chw.facility}</div>
        </div>
      )
    },
    {
      key: 'performance',
      header: 'Performance',
      render: (chw) => (
        <div>
          <div className="text-sm text-gray-900">
            Mothers: {chw.assignedMothers}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            Coverage: {chw.coverageRate}%
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (chw) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          chw.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {chw.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (chw) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditCHW(chw)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteCHW(chw.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  const counties = [...new Set(chws.map(chw => chw.county))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community Health Workers</h1>
              <p className="text-gray-600">Manage all CHWs and monitor their performance</p>
            </div>
            <Button
              onClick={() => {
                setEditingCHW(null);
                setShowCHWForm(true);
              }}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New CHW
            </Button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search CHWs by name, phone, or email..."
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* CHW Table */}
          <div className="bg-white rounded-lg shadow">
            <Table
              columns={columns}
              data={filteredCHWs}
              emptyMessage="No CHWs found matching your criteria"
            />
          </div>

          {/* CHW Form Modal */}
          <Modal
            isOpen={showCHWForm}
            onClose={() => {
              setShowCHWForm(false);
              setEditingCHW(null);
            }}
            title={editingCHW ? 'Edit CHW' : 'Add New CHW'}
            size="large"
          >
            <CHWManagementForm
              chw={editingCHW}
              onSubmit={editingCHW ? handleUpdateCHW : handleCreateCHW}
              onCancel={() => {
                setShowCHWForm(false);
                setEditingCHW(null);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CHWManagement;