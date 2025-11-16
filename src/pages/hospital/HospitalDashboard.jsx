// src/pages/hospital/HospitalDashboard.jsx
import React, { useState } from 'react';
import { 
  Building, 
  Shield, 
  LogOut,
  Package,
  BarChart3,
  Users,
  AlertTriangle
} from 'lucide-react';
import CoverageChart from '../../components/charts/CoverageChart';
import StockLevelsChart from '../../components/charts/StockLevelsChart';

const HospitalDashboard = () => {
  
  const [activeTab, setActiveTab] = useState('overview');


  const stats = [
    { label: 'Total Children', value: '1,247', change: '+5%', icon: Users, color: 'blue' },
    { label: 'Vaccine Coverage', value: '78%', change: '+2%', icon: Shield, color: 'green' },
    { label: 'Stock Level', value: '85%', change: '-3%', icon: Package, color: 'orange' },
    { label: 'Defaulters', value: '45', change: '-8%', icon: AlertTriangle, color: 'red' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage vaccine stock and monitor coverage in your facility</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600 mr-4`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className={`ml-2 text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'stock', 'coverage', 'reports'].map((tab) => (
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
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coverage Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vaccination Coverage
              </h3>
              <CoverageChart />
            </div>

            {/* Stock Levels */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vaccine Stock Levels
              </h3>
              <StockLevelsChart />
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Low Stock Alerts
              </h3>
              <div className="space-y-3">
                {[
                  { vaccine: 'BCG', current: 45, min: 100, status: 'critical' },
                  { vaccine: 'Pentavalent', current: 80, min: 100, status: 'warning' },
                  { vaccine: 'OPV', current: 120, min: 100, status: 'good' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.vaccine}</p>
                      <p className="text-sm text-gray-600">
                        Current stock: {item.current} vials
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === 'critical' 
                        ? 'bg-red-100 text-red-800'
                        : item.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status === 'critical' ? 'Critical' : 
                       item.status === 'warning' ? 'Low' : 'Adequate'}
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

export default HospitalDashboard;