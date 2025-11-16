// src/services/api/analytics.js
import api from './config';

export const analyticsAPI = {
  // Coverage analytics
  getCoverageAnalytics: async (filters = {}) => {
    const response = await api.get('/analytics/coverage', { params: filters });
    return response.data;
  },

  // Vaccination trends
  getVaccinationTrends: async (period = '30d') => {
    const response = await api.get('/analytics/trends', { params: { period } });
    return response.data;
  },

  // Defaulters analysis
  getDefaultersAnalysis: async (filters = {}) => {
    const response = await api.get('/analytics/defaulters', { params: filters });
    return response.data;
  },

  // Performance metrics
  getPerformanceMetrics: async (facilityId = null) => {
    const params = facilityId ? { facilityId } : {};
    const response = await api.get('/analytics/performance', { params });
    return response.data;
  },

  // Stock analytics
  getStockAnalytics: async (facilityId = null) => {
    const params = facilityId ? { facilityId } : {};
    const response = await api.get('/analytics/stock', { params });
    return response.data;
  },

  // CHW performance
  getCHWPerformance: async (chwId = null) => {
    const params = chwId ? { chwId } : {};
    const response = await api.get('/analytics/chw-performance', { params });
    return response.data;
  },

  // System usage analytics
  getSystemUsage: async (period = '30d') => {
    const response = await api.get('/analytics/system-usage', { params: { period } });
    return response.data;
  },

  // Export analytics data
  exportAnalytics: async (type, filters = {}) => {
    const response = await api.get('/analytics/export', { 
      params: { type, ...filters },
      responseType: 'blob'
    });
    return response.data;
  }
};

// Mock data for development
export const mockAnalytics = {
  coverage: {
    overall: 78,
    byVaccine: [
      { vaccine: 'BCG', coverage: 95, target: 90 },
      { vaccine: 'OPV', coverage: 88, target: 90 },
      { vaccine: 'Pentavalent', coverage: 82, target: 90 },
      { vaccine: 'PCV', coverage: 78, target: 90 },
      { vaccine: 'Measles', coverage: 75, target: 90 }
    ],
    byRegion: [
      { region: 'Nairobi', coverage: 85 },
      { region: 'Central', coverage: 80 },
      { region: 'Rift Valley', coverage: 75 },
      { region: 'Nyanza', coverage: 72 },
      { region: 'Coast', coverage: 70 }
    ],
    trends: {
      monthly: [
        { month: 'Jan', coverage: 72 },
        { month: 'Feb', coverage: 74 },
        { month: 'Mar', coverage: 75 },
        { month: 'Apr', coverage: 76 },
        { month: 'May', coverage: 77 },
        { month: 'Jun', coverage: 78 }
      ]
    }
  },
  performance: {
    chwActivity: 87,
    smsDelivery: 94,
    dataQuality: 96,
    systemUptime: 99.8
  },
  defaulters: {
    total: 245,
    byVaccine: [
      { vaccine: 'Measles', count: 89 },
      { vaccine: 'Pentavalent 3', count: 67 },
      { vaccine: 'PCV 3', count: 45 },
      { vaccine: 'Yellow Fever', count: 44 }
    ],
    trends: {
      monthly: [
        { month: 'Jan', defaulters: 45 },
        { month: 'Feb', defaulters: 52 },
        { month: 'Mar', defaulters: 38 },
        { month: 'Apr', defaulters: 61 },
        { month: 'May', defaulters: 55 },
        { month: 'Jun', defaulters: 42 }
      ]
    }
  }
};