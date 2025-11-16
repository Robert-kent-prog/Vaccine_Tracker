// src/pages/admin/UserManagement.jsx
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, UserPlus } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import UserManagementForm from '../../components/forms/UserManagementForm';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import SearchBar from '../../components/ui/SearchBar';
import { mockCHWs } from '../../data/mockData/chw';

const UserManagement = () => {
  const [users, setUsers] = useState(mockCHWs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = async (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      dateJoined: new Date().toISOString().split('T')[0],
      status: 'active',
      lastActive: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    setShowUserForm(false);
  };

  const handleUpdateUser = async (userData) => {
    setUsers(prev => prev.map(user => 
      user.id === editingUser.id ? { ...user, ...userData } : user
    ));
    setEditingUser(null);
    setShowUserForm(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (user) => `${user.firstName} ${user.lastName}`
    },
    {
      key: 'contact',
      header: 'Contact',
      render: (user) => (
        <div>
          <div className="text-sm text-gray-900">{user.phone}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (user) => `${user.county}, ${user.subCounty}`
    },
    {
      key: 'facility',
      header: 'Facility',
      render: (user) => user.facility || '-'
    },
    {
      key: 'status',
      header: 'Status',
      render: (user) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditUser(user)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Users</h1>
              <p className="text-gray-600">Manage all system users and their access</p>
            </div>
            <Button
              onClick={() => {
                setEditingUser(null);
                setShowUserForm(true);
              }}
              className="flex items-center"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search users by name, phone, or email..."
                  onClear={() => setSearchTerm('')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="health-worker">Community Health Worker</option>
                  <option value="hospital">Hospital Staff</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow">
            <Table
              columns={columns}
              data={filteredUsers}
              emptyMessage="No users found matching your criteria"
            />
          </div>

          {/* User Form Modal */}
          <Modal
            isOpen={showUserForm}
            onClose={() => {
              setShowUserForm(false);
              setEditingUser(null);
            }}
            title={editingUser ? 'Edit User' : 'Create New User'}
            size="large"
          >
            <UserManagementForm
              user={editingUser}
              onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
              onCancel={() => {
                setShowUserForm(false);
                setEditingUser(null);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;