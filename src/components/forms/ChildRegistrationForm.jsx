// src/components/forms/ChildRegistrationForm.jsx
import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { validateChildRegistration } from '../../utils/validators/childRegistration';
import Button from '../ui/Button';

const ChildRegistrationForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    dateOfBirth: initialData.dateOfBirth || '',
    gender: initialData.gender || '',
    birthWeight: initialData.birthWeight || '',
    birthHeight: initialData.birthHeight || '',
    placeOfBirth: initialData.placeOfBirth || '',
    motherName: initialData.motherName || '',
    motherPhone: initialData.motherPhone || '',
    fatherName: initialData.fatherName || '',
    address: initialData.address || '',
    county: initialData.county || '',
    subCounty: initialData.subCounty || '',
    village: initialData.village || ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotifications();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateChildRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification('Please fix the errors in the form', 'error');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      showNotification('Child registered successfully!', 'success');
    } catch (error) {
      showNotification('Failed to register child: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale',
    'Garissa', 'Kakamega', 'Embu', 'Nyeri', 'Meru', 'Machakos', 'Kitui'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Child Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Child Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* Mother Information */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mother Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother's Name *
          </label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.motherName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter mother's name"
          />
          {errors.motherName && (
            <p className="mt-1 text-sm text-red-600">{errors.motherName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother's Phone *
          </label>
          <input
            type="tel"
            name="motherPhone"
            value={formData.motherPhone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.motherPhone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="254712345678"
          />
          {errors.motherPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.motherPhone}</p>
          )}
        </div>

        {/* Location Information */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            County *
          </label>
          <select
            name="county"
            value={formData.county}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.county ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select county</option>
            {counties.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
          {errors.county && (
            <p className="mt-1 text-sm text-red-600">{errors.county}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub-County
          </label>
          <input
            type="text"
            name="subCounty"
            value={formData.subCounty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter sub-county"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Village/ Estate
          </label>
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter village or estate"
          />
        </div>
      </div>

      {/* Form Actions */}
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
          {initialData.id ? 'Update Child' : 'Register Child'}
        </Button>
      </div>
    </form>
  );
};

export default ChildRegistrationForm;