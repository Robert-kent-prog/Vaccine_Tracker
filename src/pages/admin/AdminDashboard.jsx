// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';

import { 
  Shield, 
  LogOut,
  Users,
  BarChart3,
  Settings,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('analytics');

  const systemStats = [
    { label: 'Total Users', value: '2,847', change: '+12%' },
    { label: 'Active CHWs', value: '156', change: '+5%' },
    { label: 'Registered Children', value: '8,452', change: '+8%' },
    { label: 'Vaccinations This Month', value: '3,217', change: '+15%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
            <p className="text-gray-600 mt-2">Monitor system performance and manage users</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <div className="flex items-baseline mt-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="ml-2 text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {['analytics', 'users', 'system', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* System Health */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                System Health
              </h3>
              <div className="space-y-4">
                {[
                  { service: 'API Server', status: 'operational', latency: '45ms' },
                  { service: 'Database', status: 'operational', latency: '12ms' },
                  { service: 'SMS Gateway', status: 'degraded', latency: '280ms' },
                  { service: 'File Storage', status: 'operational', latency: '65ms' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.service}</p>
                      <p className="text-sm text-gray-600">Latency: {item.latency}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'operational' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent System Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'User Login', user: 'CHW-045', time: '2 min ago', status: 'success' },
                  { action: 'Vaccination Recorded', user: 'Nurse-112', time: '5 min ago', status: 'success' },
                  { action: 'SMS Sent', user: 'System', time: '8 min ago', status: 'success' },
                  { action: 'Stock Updated', user: 'Hospital-023', time: '12 min ago', status: 'success' },
                  { action: 'Failed Login Attempt', user: 'Unknown', time: '15 min ago', status: 'error' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">By {activity.user} • {activity.time}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'success' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;