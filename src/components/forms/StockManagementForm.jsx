// src/components/forms/StockManagementForm.jsx
import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../ui/Button';

const StockManagementForm = ({ vaccine, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    vaccineId: vaccine?.id || '',
    action: 'add', // 'add' or 'remove'
    quantity: '',
    reason: '',
    batchNumber: '',
    expiryDate: '',
    supplier: ''
  });

  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotifications();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      showNotification('Stock updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update stock: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {vaccine && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">Vaccine Information</h3>
          <p className="text-blue-700">{vaccine.name}</p>
          <p className="text-blue-600 text-sm">Current stock: {vaccine.currentStock} vials</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Action *
          </label>
          <select
            name="action"
            value={formData.action}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="add">Add to Stock</option>
            <option value="remove">Remove from Stock</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter quantity"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batch Number *
          </label>
          <input
            type="text"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter batch number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date *
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supplier
          </label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter supplier name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason *
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select reason</option>
            <option value="new-supply">New Supply</option>
            <option value="transfer-in">Transfer In</option>
            <option value="donation">Donation</option>
            <option value="usage">Regular Usage</option>
            <option value="wastage">Wastage</option>
            <option value="transfer-out">Transfer Out</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Update Stock
        </Button>
      </div>
    </form>
  );
};

export default StockManagementForm;