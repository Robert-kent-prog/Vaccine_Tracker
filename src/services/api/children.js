// src/services/api/children.js
import api from './config';

export const childrenAPI = {
  registerChild: async (childData) => {
    const response = await api.post('/children', childData);
    return response.data;
  },

  getChildren: async (filters = {}) => {
    const response = await api.get('/children', { params: filters });
    return response.data;
  },

  getChild: async (childId) => {
    const response = await api.get(`/children/${childId}`);
    return response.data;
  },

  updateChild: async (childId, updates) => {
    const response = await api.put(`/children/${childId}`, updates);
    return response.data;
  },

  deleteChild: async (childId) => {
    const response = await api.delete(`/children/${childId}`);
    return response.data;
  },

  // Growth monitoring
  recordGrowth: async (childId, growthData) => {
    const response = await api.post(`/children/${childId}/growth`, growthData);
    return response.data;
  },

  getGrowthHistory: async (childId) => {
    const response = await api.get(`/children/${childId}/growth`);
    return response.data;
  }
};