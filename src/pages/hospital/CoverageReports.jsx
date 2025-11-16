// src/pages/hospital/CoverageReports.jsx
import React, { useState } from 'react';
import { BarChart3, Download, Filter, TrendingUp, Users } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import CoverageChart from '../../components/charts/CoverageChart';
import VaccinationTrends from '../../components/charts/VaccinationTrends';
import Button from '../../components/ui/Button';
import { mockFacilities } from '../../data/mockData/facilities';

const CoverageReports = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [vaccineFilter, setVaccineFilter] = useState('all');
  const [facilityFilter, setFacilityFilter] = useState('all');

  const currentFacility = mockFacilities[0]; // Simulate current hospital

  const coverageData = [
    { vaccine: 'BCG', coverage: 95, target: 90, trend: 'up' },
    { vaccine: 'OPV', coverage: 88, target: 90, trend: 'stable' },
    { vaccine: 'Pentavalent', coverage: 82, target: 90, trend: 'up' },
    { vaccine: 'PCV', coverage: 78, target: 90, trend: 'up' },
    { vaccine: 'Measles', coverage: 75, target: 90, trend: 'down' },
    { vaccine: 'Yellow Fever', coverage: 70, target: 90, trend: 'stable' },
  ];

  const performanceMetrics = [
    { metric: 'Monthly Growth', value: '+5.2%', trend: 'up' },
    { metric: 'Target Achievement', value: '83%', trend: 'up' },
    { metric: 'Regional Rank', value: '3/15', trend: 'stable' },
    { metric: 'Defaulters Rate', value: '12%', trend: 'down' },
  ];

  const handleExportReport = () => {
    console.log('Exporting coverage report...');
    // In real app, generate and download PDF/Excel report
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filters and Controls */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="1year">Last Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vaccine
                  </label>
                  <select
                    value={vaccineFilter}
                    onChange={(e) => setVaccineFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Vaccines</option>
                    <option value="bcg">BCG</option>
                    <option value="opv">OPV</option>
                    <option value="pentavalent">Pentavalent</option>
                    <option value="pcv">PCV</option>
                    <option value="measles">Measles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facility
                  </label>
                  <select
                    value={facilityFilter}
                    onChange={(e) => setFacilityFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Facilities</option>
                    {mockFacilities.map(facility => (
                      <option key={facility.id} value={facility.id}>
                        {facility.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleExportReport}
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceMetrics.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{item.metric}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                  </div>
                  <div className={`p-2 rounded-full ${
                    item.trend === 'up' ? 'bg-green-100 text-green-600' :
                    item.trend === 'down' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <TrendingUp className={`h-5 w-5 ${
                      item.trend === 'down' ? 'transform rotate-180' : ''
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Coverage Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
                  Vaccination Coverage
                </h3>
                <span className="text-sm text-gray-500">Current vs Target</span>
              </div>
              <CoverageChart />
            </div>

            {/* Trends Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Vaccination Trends
                </h3>
                <span className="text-sm text-gray-500">Last 6 Months</span>
              </div>
              <VaccinationTrends />
            </div>
          </div>

          {/* Detailed Coverage Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Detailed Coverage by Vaccine
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vaccine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coverage Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gap
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coverageData.map((vaccine, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vaccine.vaccine}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${vaccine.coverage}%` }}
                            ></div>
                          </div>
                          {vaccine.coverage}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vaccine.target}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vaccine.target - vaccine.coverage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <TrendingUp className={`h-4 w-4 mr-1 ${
                            vaccine.trend === 'up' ? 'text-green-600' :
                            vaccine.trend === 'down' ? 'text-red-600 transform rotate-180' :
                            'text-gray-400'
                          }`} />
                          {vaccine.trend}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vaccine.coverage >= vaccine.target 
                            ? 'bg-green-100 text-green-800'
                            : vaccine.coverage >= vaccine.target - 10
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vaccine.coverage >= vaccine.target 
                            ? 'On Target'
                            : vaccine.coverage >= vaccine.target - 10
                            ? 'Near Target'
                            : 'Below Target'
                          }
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageReports;