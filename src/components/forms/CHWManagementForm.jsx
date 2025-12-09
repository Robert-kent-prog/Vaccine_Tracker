// src/components/forms/CHWManagementForm.jsx
import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Building } from 'lucide-react';
import Button from '../ui/Button';

const CHWManagementForm = ({ chw, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    county: '',
    subCounty: '',
    facility: '',
    assignedMothers: 0,
    coverageRate: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (chw) {
      setFormData({
        firstName: chw.firstName || '',
        lastName: chw.lastName || '',
        phone: chw.phone || '',
        email: chw.email || '',
        county: chw.county || '',
        subCounty: chw.subCounty || '',
        facility: chw.facility || '',
        assignedMothers: chw.assignedMothers || 0,
        coverageRate: chw.coverageRate || 0
      });
    }
  }, [chw]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.county.trim()) newErrors.county = 'County is required';
    if (!formData.subCounty.trim()) newErrors.subCounty = 'Sub-county is required';
    if (!formData.facility.trim()) newErrors.facility = 'Facility is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const counties = ['Nairobi', 'Kiambu', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu', 'Kakamega', 'Bungoma'];
  const facilities = [
    'Nairobi General Hospital',
    'Kenyatta National Hospital',
    'Mombasa County Hospital',
    'Kisumu County Hospital',
    'Thika Level 5 Hospital',
    'Nakuru Provincial Hospital'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-green-500 focus:border-green-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter first name"
            />
          </div>
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className={`w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-green-500 focus:border-green-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+254 XXX XXX XXX"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-green-500 focus:border-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="chw@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            County *
          </label>
          <select
            value={formData.county}
            onChange={(e) => handleChange('county', e.target.value)}
            className={`w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500 ${
              errors.county ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select County</option>
            {counties.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
          {errors.county && <p className="mt-1 text-sm text-red-600">{errors.county}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub-County *
          </label>
          <input
            type="text"
            value={formData.subCounty}
            onChange={(e) => handleChange('subCounty', e.target.value)}
            className={`w-full border rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500 ${
              errors.subCounty ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter sub-county"
          />
          {errors.subCounty && <p className="mt-1 text-sm text-red-600">{errors.subCounty}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assigned Facility *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={formData.facility}
            onChange={(e) => handleChange('facility', e.target.value)}
            className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-green-500 focus:border-green-500 ${
              errors.facility ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Facility</option>
            {facilities.map(facility => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>
        {errors.facility && <p className="mt-1 text-sm text-red-600">{errors.facility}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assigned Mothers
          </label>
          <input
            type="number"
            value={formData.assignedMothers}
            onChange={(e) => handleChange('assignedMothers', parseInt(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coverage Rate (%)
          </label>
          <input
            type="number"
            value={formData.coverageRate}
            onChange={(e) => handleChange('coverageRate', parseInt(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {chw ? 'Update CHW' : 'Create CHW'}
        </Button>
      </div>
    </form>
  );
};

export default CHWManagementForm;