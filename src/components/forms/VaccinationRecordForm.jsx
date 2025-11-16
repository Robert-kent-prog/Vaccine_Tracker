// src/components/forms/VaccinationRecordForm.jsx
import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../ui/Button';

const VaccinationRecordForm = ({ child, vaccine, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    vaccineId: vaccine?.id || '',
    dateGiven: new Date().toISOString().split('T')[0],
    batchNumber: '',
    healthWorker: '',
    notes: '',
    nextVisitDate: ''
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
      await onSubmit({
        ...formData,
        childId: child.id,
        childName: child.name
      });
      showNotification('Vaccination recorded successfully!', 'success');
    } catch (error) {
      showNotification('Failed to record vaccination: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900">Child Information</h3>
        <p className="text-gray-600">{child.name} • {child.gender} • Born {new Date(child.dob).toLocaleDateString()}</p>
      </div>

      {vaccine && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">Vaccine Information</h3>
          <p className="text-blue-700">{vaccine.name} - {vaccine.disease}</p>
          <p className="text-blue-600 text-sm">{vaccine.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Given *
          </label>
          <input
            type="date"
            name="dateGiven"
            value={formData.dateGiven}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            Health Worker Name *
          </label>
          <input
            type="text"
            name="healthWorker"
            value={formData.healthWorker}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter health worker name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Next Visit Date
          </label>
          <input
            type="date"
            name="nextVisitDate"
            value={formData.nextVisitDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any additional notes or observations..."
          />
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
          Record Vaccination
        </Button>
      </div>
    </form>
  );
};

export default VaccinationRecordForm;