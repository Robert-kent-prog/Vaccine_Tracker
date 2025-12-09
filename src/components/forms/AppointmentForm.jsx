// src/components/forms/AppointmentForm.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, X } from 'lucide-react';
import Button from '../ui/Button';

const AppointmentForm = ({ appointment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    date: '',
    time: '',
    vaccine: '',
    duration: 30,
    contact: '',
    email: '',
    notes: '',
    status: 'scheduled'
  });

  const [errors, setErrors] = useState({});

  // Vaccine options
  const vaccineOptions = [
    'BCG',
    'OPV 0',
    'OPV 1',
    'OPV 2',
    'OPV 3',
    'Pentavalent 1',
    'Pentavalent 2',
    'Pentavalent 3',
    'PCV 1',
    'PCV 2',
    'PCV 3',
    'Measles',
    'Yellow Fever',
    'HPV 1',
    'HPV 2'
  ];

  // Time slots (9:00 AM to 4:00 PM, 30-minute intervals)
  const timeSlots = [];
  for (let hour = 9; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeString);
    }
  }

  useEffect(() => {
    if (appointment) {
      // Pre-fill form with existing appointment data
      setFormData({
        childName: appointment.childName || '',
        parentName: appointment.parentName || '',
        date: appointment.date ? appointment.date.toISOString().split('T')[0] : '',
        time: appointment.date ? appointment.date.toTimeString().slice(0, 5) : '',
        vaccine: appointment.vaccine || '',
        duration: appointment.duration || 30,
        contact: appointment.contact || '',
        email: appointment.email || '',
        notes: appointment.notes || '',
        status: appointment.status || 'scheduled'
      });
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [appointment]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.childName.trim()) {
      newErrors.childName = 'Child name is required';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent/Guardian name is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.vaccine) {
      newErrors.vaccine = 'Vaccine selection is required';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid contact number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Combine date and time into a single Date object
      const appointmentDateTime = new Date(`${formData.date}T${formData.time}`);
      
      const submissionData = {
        ...formData,
        date: appointmentDateTime,
        id: appointment ? appointment.id : Date.now() // Generate ID if new appointment
      };

      onSubmit(submissionData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Child Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Child Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={formData.childName}
                onChange={(e) => handleChange('childName', e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-red-500 focus:border-red-500 ${
                  errors.childName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter child's full name"
              />
            </div>
            {errors.childName && (
              <p className="mt-1 text-sm text-red-600">{errors.childName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent/Guardian Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-red-500 focus:border-red-500 ${
                  errors.parentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter parent/guardian name"
              />
            </div>
            {errors.parentName && (
              <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-red-500 focus:border-red-500 ${
                  errors.contact ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+254 XXX XXX XXX"
              />
            </div>
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-red-500 focus:border-red-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="optional@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                min={getMinDate()}
                className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-red-500 focus:border-red-500 ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-red-500 focus:border-red-500 ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
        </div>

        {/* Vaccine Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vaccine *
          </label>
          <select
            value={formData.vaccine}
            onChange={(e) => handleChange('vaccine', e.target.value)}
            className={`w-full border rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500 ${
              errors.vaccine ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select vaccine</option>
            {vaccineOptions.map((vaccine) => (
              <option key={vaccine} value={vaccine}>
                {vaccine}
              </option>
            ))}
          </select>
          {errors.vaccine && (
            <p className="mt-1 text-sm text-red-600">{errors.vaccine}</p>
          )}
        </div>

        {/* Status (only for editing existing appointments) */}
        {appointment && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>
        )}

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Any special instructions, allergies, or additional information..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
          >
            {appointment ? 'Update Appointment' : 'Create Appointment'}
          </Button>
        </div>
      </form>

      {/* Form Preview (optional) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Appointment Preview</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Child:</strong> {formData.childName || 'Not specified'}</p>
          <p><strong>Parent:</strong> {formData.parentName || 'Not specified'}</p>
          <p><strong>When:</strong> {formData.date && formData.time ? 
            `${new Date(formData.date).toLocaleDateString()} at ${formData.time}` : 
            'Not scheduled'
          }</p>
          <p><strong>Vaccine:</strong> {formData.vaccine || 'Not selected'}</p>
          <p><strong>Contact:</strong> {formData.contact || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;