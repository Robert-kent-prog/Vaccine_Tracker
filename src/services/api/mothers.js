// src/services/api/mothers.js
import api from './config';

export const mothersAPI = {
  // Get all mothers
  getMothers: async (filters = {}) => {
    const response = await api.get('/mothers', { params: filters });
    return response.data;
  },

  // Get specific mother
  getMother: async (motherId) => {
    const response = await api.get(`/mothers/${motherId}`);
    return response.data;
  },

  // Register new mother
  registerMother: async (motherData) => {
    const response = await api.post('/mothers', motherData);
    return response.data;
  },

  // Update mother information
  updateMother: async (motherId, updates) => {
    const response = await api.put(`/mothers/${motherId}`, updates);
    return response.data;
  },

  // Get mother's children
  getMotherChildren: async (motherId) => {
    const response = await api.get(`/mothers/${motherId}/children`);
    return response.data;
  },

  // Get mother's vaccination reminders
  getMotherReminders: async (motherId) => {
    const response = await api.get(`/mothers/${motherId}/reminders`);
    return response.data;
  },

  // Update mother's reminder preferences
  updateReminderPreferences: async (motherId, preferences) => {
    const response = await api.put(`/mothers/${motherId}/reminder-preferences`, preferences);
    return response.data;
  },

  // Get mother's vaccination history
  getVaccinationHistory: async (motherId) => {
    const response = await api.get(`/mothers/${motherId}/vaccination-history`);
    return response.data;
  },

  // Send SMS to mother
  sendSMS: async (motherId, message) => {
    const response = await api.post(`/mothers/${motherId}/send-sms`, { message });
    return response.data;
  }
};

// Mock data for development
export const mockMothersData = {
  mothers: [
    {
      id: 1,
      name: 'Jane Atieno',
      phone: '+254712345678',
      idNumber: '12345678',
      dateOfBirth: '1990-05-15',
      county: 'Nairobi',
      subCounty: 'Kibera',
      village: 'Lindi',
      children: [1, 2],
      reminderPreferences: {
        sms: true,
        phone: false,
        language: 'english',
        daysBefore: [7, 3, 1]
      }
    }
  ],
  children: [
    {
      id: 1,
      firstName: 'Maria',
      lastName: 'Auma',
      dateOfBirth: '2023-05-15',
      gender: 'Female',
      birthWeight: '3.2',
      birthHeight: '50',
      motherId: 1
    }
  ]
};