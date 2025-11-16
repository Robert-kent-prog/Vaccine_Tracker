// src/components/dashboard/DashboardHeader.jsx
import React from 'react';
import { Bell, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const DashboardHeader = ({ title, subtitle }) => {
  const { user, logout } = useAuth();
  const { setSidebarOpen, notifications } = useApp();

  const getRoleDisplay = (role) => {
    const roles = {
      mother: 'Mother/Parent',
      'health-worker': 'Community Health Worker',
      hospital: 'Hospital Staff',
      admin: 'System Administrator'
    };
    return roles[role] || role;
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 lg:ml-0">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {getRoleDisplay(user?.role)}
              </p>
            </div>
            
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;