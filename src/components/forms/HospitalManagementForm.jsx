// src/components/forms/HospitalManagementForm.jsx
import React, { useState, useEffect } from 'react';
import { Building, Phone, Mail, MapPin } from 'lucide-react';
import Button from '../ui/Button';

const HospitalManagementForm = ({ hospital, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'public',
    county: '',
    subCounty: '',
    phone: '',
    email: '',
    address: '',
    staffCount: 0,
    coverageRate: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name || '',
        type: hospital.type || 'public',
        county: hospital.county || '',
        subCounty: hospital.subCounty || '',
        phone: hospital.phone || '',
        email: hospital.email || '',
        address: hospital.address || '',
        staffCount: hospital.staffCount || 0,
        coverageRate: hospital.coverageRate || 0
      });
    }
  }, [hospital]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Hospital name is required';
    if (!formData.county.trim()) newErrors.county = 'County is required';
    if (!formData.subCounty.trim()) newErrors.subCounty = 'Sub-county is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

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

  const hospitalTypes = [
    { value: 'public', label: 'Public Hospital' },
    { value: 'national', label: 'National Referral' },
    { value: 'county', label: 'County Hospital' },
    { value: 'private', label: 'Private Hospital' },
    { value: 'faith-based', label: 'Faith-based Hospital' }
  ];

  const counties = ['Nairobi', 'Kiambu', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu', 'Kakamega', 'Bungoma'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Name *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter hospital name"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {hospitalTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
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
            className={`w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${
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
            className={`w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.subCounty ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter sub-county"
          />
          {errors.subCounty && <p className="mt-1 text-sm text-red-600">{errors.subCounty}</p>}
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
              className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
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
              className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="hospital@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <textarea
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter full hospital address"
          />
        </div>
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Staff Count
          </label>
          <input
            type="number"
            value={formData.staffCount}
            onChange={(e) => handleChange('staffCount', parseInt(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
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
          {hospital ? 'Update Hospital' : 'Create Hospital'}
        </Button>
      </div>
    </form>
  );
};

export default HospitalManagementForm;