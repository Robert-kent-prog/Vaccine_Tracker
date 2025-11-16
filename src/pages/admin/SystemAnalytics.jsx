// src/pages/admin/SystemAnalytics.jsx
import React, { useState } from 'react';
import { BarChart3, Users, Shield, TrendingUp, Download } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatsCard from '../../components/dashboard/StatsCard';
import CoverageChart from '../../components/charts/CoverageChart';
import VaccinationTrends from '../../components/charts/VaccinationTrends';
import DefaultersChart from '../../components/charts/DefaultersChart';
import Button from '../../components/ui/Button';

const SystemAnalytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [countyFilter, setCountyFilter] = useState('all');

  const systemStats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Vaccinations This Month',
      value: '3,217',
      change: '+15%',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Coverage Rate',
      value: '78%',
      change: '+2%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Active CHWs',
      value: '156',
      change: '+5%',
      icon: Users,
      color: 'orange'
    }
  ];

  const counties = ['All Counties', 'Nairobi', 'Kiambu', 'Kisumu', 'Mombasa', 'Nakuru'];

  const handleExport = (type) => {
    console.log(`Exporting ${type} data...`);
    // In real app, generate and download report
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filters and Controls */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="1year">Last Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    County
                  </label>
                  <select
                    value={countyFilter}
                    onChange={(e) => setCountyFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {counties.map(county => (
                      <option key={county} value={county.toLowerCase()}>
                        {county}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleExport('pdf')}
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF Report
                </Button>
                <Button
                  onClick={() => handleExport('excel')}
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Excel Export
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Coverage Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Vaccination Coverage
                </h3>
                <span className="text-sm text-gray-500">By Vaccine</span>
              </div>
              <CoverageChart />
            </div>

            {/* Trends Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Vaccination Trends
                </h3>
                <span className="text-sm text-gray-500">Monthly</span>
              </div>
              <VaccinationTrends />
            </div>
          </div>

          {/* Additional Analytics */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Defaulters Analysis */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Defaulters Analysis
              </h3>
              <DefaultersChart />
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-4">
                {[
                  { metric: 'SMS Delivery Rate', value: '94%', trend: 'up' },
                  { metric: 'CHW Activity Rate', value: '87%', trend: 'up' },
                  { metric: 'Data Sync Success', value: '99%', trend: 'stable' },
                  { metric: 'System Uptime', value: '99.9%', trend: 'stable' },
                  { metric: 'User Satisfaction', value: '4.8/5', trend: 'up' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-900 mr-2">{item.value}</span>
                      <span className={`text-xs ${
                        item.trend === 'up' ? 'text-green-600' : 
                        item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                      </span>
                    </div>
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

export default SystemAnalytics;