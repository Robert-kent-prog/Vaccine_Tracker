// src/pages/hospital/FacilityManagement.jsx
import React, { useState } from 'react';
import { Building, MapPin, Phone, Mail, Edit, Users, Shield } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import { mockFacilities } from '../../data/mockData/facilities';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState(mockFacilities);
  const [editingFacility, setEditingFacility] = useState(null);

  const currentFacility = facilities[0]; // Simulate current hospital

  const handleUpdateFacility = (updatedData) => {
    setFacilities(prev => 
      prev.map(facility => 
        facility.id === editingFacility.id 
          ? { ...facility, ...updatedData }
          : facility
      )
    );
    setEditingFacility(null);
  };

  const getStockStatusColor = (status) => {
    const colors = {
      adequate: 'green',
      low: 'yellow',
      critical: 'red'
    };
    return colors[status] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Current Facility Overview */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Building className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentFacility.name}</h2>
                    <p className="text-gray-600">{currentFacility.type}</p>
                    <div className="flex flex-wrap items-center mt-2 space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {currentFacility.county}, {currentFacility.subCounty}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {currentFacility.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {currentFacility.email}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setEditingFacility(currentFacility)}
                  variant="outline"
                  className="flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Facility
                </Button>
              </div>
            </div>

            {/* Facility Stats */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                  <p className="text-sm text-blue-600">Registered Children</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">78%</p>
                  <p className="text-sm text-green-600">Coverage Rate</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">24</p>
                  <p className="text-sm text-purple-600">Active CHWs</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">3,217</p>
                  <p className="text-sm text-orange-600">Vaccinations This Month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vaccine Stock Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Vaccine Stock Levels</h3>
              <p className="text-gray-600 text-sm">Current inventory and stock status</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vaccine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Minimum Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days of Supply
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentFacility.vaccines.map((vaccine, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vaccine.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vaccine.stock} vials
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vaccine.minStock} vials
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vaccine.status === 'adequate' 
                            ? 'bg-green-100 text-green-800'
                            : vaccine.status === 'low'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vaccine.status.charAt(0).toUpperCase() + vaccine.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {Math.round((vaccine.stock / vaccine.minStock) * 30)} days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button size="small" variant="outline">
                            Update Stock
                          </Button>
                          <Button size="small">
                            Order More
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Coverage by Vaccine */}
          <div className="bg-white rounded-lg shadow mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Vaccination Coverage</h3>
              <p className="text-gray-600 text-sm">Coverage rates by vaccine type</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(currentFacility.coverage).map(([vaccine, rate]) => (
                  <div key={vaccine} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{vaccine}</span>
                        <span className="text-gray-900">{rate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            rate >= 90 ? 'bg-green-600' :
                            rate >= 80 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${rate}%` }}
                        ></div>
                      </div>
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

export default FacilityManagement;