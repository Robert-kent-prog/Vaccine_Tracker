// src/services/api/chw.js
import api from './config';

export const chwAPI = {
  // Get all CHWs
  getCHWs: async (filters = {}) => {
    const response = await api.get('/chws', { params: filters });
    return response.data;
  },

  // Get specific CHW
  getCHW: async (chwId) => {
    const response = await api.get(`/chws/${chwId}`);
    return response.data;
  },

  // Create new CHW
  createCHW: async (chwData) => {
    const response = await api.post('/chws', chwData);
    return response.data;
  },

  // Update CHW
  updateCHW: async (chwId, updates) => {
    const response = await api.put(`/chws/${chwId}`, updates);
    return response.data;
  },

  // Delete CHW
  deleteCHW: async (chwId) => {
    const response = await api.delete(`/chws/${chwId}`);
    return response.data;
  },

  // Get CHW performance
  getCHWPerformance: async (chwId) => {
    const response = await api.get(`/chws/${chwId}/performance`);
    return response.data;
  },

  // Get assigned mothers for CHW
  getAssignedMothers: async (chwId) => {
    const response = await api.get(`/chws/${chwId}/assigned-mothers`);
    return response.data;
  },

  // Assign mothers to CHW
  assignMothers: async (chwId, motherIds) => {
    const response = await api.post(`/chws/${chwId}/assign-mothers`, { motherIds });
    return response.data;
  },

  // Get CHW field reports
  getFieldReports: async (chwId, filters = {}) => {
    const response = await api.get(`/chws/${chwId}/field-reports`, { params: filters });
    return response.data;
  },

  // Submit field report
  submitFieldReport: async (chwId, reportData) => {
    const response = await api.post(`/chws/${chwId}/field-reports`, reportData);
    return response.data;
  }
};

// Mock data for development
export const mockCHWData = {
  chws: [
    {
      id: 1,
      firstName: 'David',
      lastName: 'Omondi',
      phone: '+254712345678',
      email: 'david.omondi@example.com',
      county: 'Nairobi',
      subCounty: 'Kibera',
      facility: 'Kibera Community Health Unit',
      chwId: 'CHW-001',
      status: 'active',
      dateJoined: '2022-01-15',
      assignedMothers: 24,
      coverageRate: 85,
      lastActive: '2023-10-25'
    }
  ],
  performance: {
    monthly: [
      {
        month: '2023-10',
        vaccinationsRecorded: 45,
        followupsCompleted: 38,
        defaultersIdentified: 7,
        newRegistrations: 12,
        performanceScore: 92
      }
    ]
  }
};