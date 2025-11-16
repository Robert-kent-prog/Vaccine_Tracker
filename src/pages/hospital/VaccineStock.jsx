// src/pages/hospital/VaccineStocks.jsx
import React, { useState } from 'react';
import { Package, Plus, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StockManagementForm from '../../components/forms/StockManagementForm';
import StockLevelsChart from '../../components/charts/StockLevelsChart';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { mockFacilities } from '../../data/mockData/facilities';

const VaccineStocks = () => {
  const [showStockForm, setShowStockForm] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [stockHistory, setStockHistory] = useState({});
  
  const currentFacility = mockFacilities[0];

  const handleStockUpdate = async (stockData) => {
    console.log('Updating stock:', stockData);
    // In real app, update stock via API
    setShowStockForm(false);
    setSelectedVaccine(null);
  };

  const getStockStatus = (vaccine) => {
    const ratio = vaccine.stock / vaccine.minStock;
    if (ratio >= 1.5) return { status: 'adequate', color: 'green', label: 'Adequate' };
    if (ratio >= 1.0) return { status: 'low', color: 'yellow', label: 'Low' };
    return { status: 'critical', color: 'red', label: 'Critical' };
  };

  const criticalVaccines = currentFacility.vaccines.filter(v => 
    getStockStatus(v).status === 'critical'
  );

  const lowVaccines = currentFacility.vaccines.filter(v => 
    getStockStatus(v).status === 'low'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Vaccine Stock Management" 
        subtitle="Monitor and manage vaccine inventory levels"
      />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Alert Summary */}
          {(criticalVaccines.length > 0 || lowVaccines.length > 0) && (
            <div className="mb-6 space-y-3">
              {criticalVaccines.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                    <h3 className="text-sm font-medium text-red-800">
                      Critical Stock Alert
                    </h3>
                  </div>
                  <p className="text-sm text-red-700 mt-1">
                    {criticalVaccines.map(v => v.name).join(', ')} {criticalVaccines.length === 1 ? 'is' : 'are'} below minimum stock levels
                  </p>
                </div>
              )}
              {lowVaccines.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                    <h3 className="text-sm font-medium text-yellow-800">
                      Low Stock Warning
                    </h3>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    {lowVaccines.map(v => v.name).join(', ')} {lowVaccines.length === 1 ? 'is' : 'are'} running low
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Stock Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vaccines</p>
                  <p className="text-2xl font-bold text-gray-900">{currentFacility.vaccines.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Adequate Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {currentFacility.vaccines.filter(v => getStockStatus(v).status === 'adequate').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingDown className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Need Reorder</p>
                  <p className="text-2xl font-bold text-red-600">
                    {criticalVaccines.length + lowVaccines.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Chart and Management */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Stock Levels Chart */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Stock Levels Overview
              </h3>
              <StockLevelsChart />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Button
                  onClick={() => {
                    setSelectedVaccine(null);
                    setShowStockForm(true);
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Stock
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Generate reorder report
                    const reorderList = [...criticalVaccines, ...lowVaccines];
                    console.log('Reorder list:', reorderList);
                  }}
                >
                  Generate Reorder Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                >
                  View Stock History
                </Button>
              </div>

              {/* Stock Status Summary */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Stock Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Adequate</span>
                    <Badge variant="success">
                      {currentFacility.vaccines.filter(v => getStockStatus(v).status === 'adequate').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Low</span>
                    <Badge variant="warning">
                      {lowVaccines.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Critical</span>
                    <Badge variant="danger">
                      {criticalVaccines.length}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stock Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Vaccine Inventory</h3>
                <span className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
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
                      Days Remaining
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentFacility.vaccines.map((vaccine, index) => {
                    const status = getStockStatus(vaccine);
                    const daysRemaining = Math.round((vaccine.stock / vaccine.minStock) * 30);
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Package className={`h-5 w-5 mr-3 text-${status.color}-500`} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{vaccine.name}</div>
                              <div className="text-sm text-gray-500">Batch: {vaccine.batchNumber || 'N/A'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vaccine.stock} vials
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vaccine.minStock} vials
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={status.color}>
                            {status.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            {daysRemaining <= 7 ? (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            )}
                            {daysRemaining} days
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button
                              size="small"
                              onClick={() => {
                                setSelectedVaccine(vaccine);
                                setShowStockForm(true);
                              }}
                            >
                              Update
                            </Button>
                            {status.status !== 'adequate' && (
                              <Button
                                size="small"
                                variant="outline"
                              >
                                Order
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stock Management Modal */}
          <Modal
            isOpen={showStockForm}
            onClose={() => {
              setShowStockForm(false);
              setSelectedVaccine(null);
            }}
            title={selectedVaccine ? `Update ${selectedVaccine.name} Stock` : 'Add New Stock'}
            size="large"
          >
            <StockManagementForm
              vaccine={selectedVaccine}
              onSubmit={handleStockUpdate}
              onCancel={() => {
                setShowStockForm(false);
                setSelectedVaccine(null);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default VaccineStocks;