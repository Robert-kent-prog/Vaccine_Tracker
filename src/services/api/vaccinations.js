// src/services/api/vaccinations.js
import api from './config';

export const vaccinationsAPI = {
  // Child vaccinations
  getChildVaccinations: async (childId) => {
    const response = await api.get(`/children/${childId}/vaccinations`);
    return response.data;
  },

  recordVaccination: async (data) => {
    const response = await api.post('/vaccinations', data);
    return response.data;
  },

  updateVaccination: async (vaccinationId, data) => {
    const response = await api.put(`/vaccinations/${vaccinationId}`, data);
    return response.data;
  },

  getUpcomingVaccinations: async (days = 30) => {
    const response = await api.get(`/vaccinations/upcoming?days=${days}`);
    return response.data;
  },

  // Vaccine schedule
  getVaccineSchedule: async (childId) => {
    const response = await api.get(`/children/${childId}/schedule`);
    return response.data;
  },

  // Coverage reports
  getCoverageReports: async (filters = {}) => {
    const response = await api.get('/reports/coverage', { params: filters });
    return response.data;
  },

  // Defaulters
  getDefaulters: async (filters = {}) => {
    const response = await api.get('/reports/defaulters', { params: filters });
    return response.data;
  }
};