// src/services/api/stock.js
import api from './config';

export const stockAPI = {
  // Get stock levels for facility
  getStockLevels: async (facilityId) => {
    const response = await api.get(`/facilities/${facilityId}/stock`);
    return response.data;
  },

  // Update stock levels
  updateStock: async (facilityId, stockData) => {
    const response = await api.post(`/facilities/${facilityId}/stock`, stockData);
    return response.data;
  },

  // Get stock history
  getStockHistory: async (facilityId, vaccineId = null) => {
    const params = vaccineId ? { vaccineId } : {};
    const response = await api.get(`/facilities/${facilityId}/stock-history`, { params });
    return response.data;
  },

  // Create stock order
  createOrder: async (facilityId, orderData) => {
    const response = await api.post(`/facilities/${facilityId}/orders`, orderData);
    return response.data;
  },

  // Get pending orders
  getOrders: async (facilityId, status = 'pending') => {
    const response = await api.get(`/facilities/${facilityId}/orders`, { params: { status } });
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}`, { status });
    return response.data;
  },

  // Get stock alerts
  getStockAlerts: async (facilityId = null) => {
    const params = facilityId ? { facilityId } : {};
    const response = await api.get('/stock/alerts', { params });
    return response.data;
  },

  // Get consumption rates
  getConsumptionRates: async (facilityId, period = '30d') => {
    const response = await api.get(`/facilities/${facilityId}/consumption`, { params: { period } });
    return response.data;
  },

  // Predict stock requirements
  predictStockNeeds: async (facilityId, period = '30d') => {
    const response = await api.get(`/facilities/${facilityId}/stock-prediction`, { params: { period } });
    return response.data;
  }
};

// Mock data for development
export const mockStockData = {
  stockLevels: [
    {
      vaccineId: 'bcg',
      vaccineName: 'BCG',
      currentStock: 450,
      minStock: 100,
      status: 'adequate',
      batchNumber: 'BCG-2023-001',
      expiryDate: '2024-06-30'
    },
    {
      vaccineId: 'measles',
      vaccineName: 'Measles Rubella',
      currentStock: 95,
      minStock: 100,
      status: 'low',
      batchNumber: 'MR-2023-001',
      expiryDate: '2024-05-15'
    }
  ],
  orders: [
    {
      id: 1,
      vaccineId: 'measles',
      vaccineName: 'Measles Rubella',
      quantity: 200,
      status: 'pending',
      orderDate: '2023-10-20',
      expectedDelivery: '2023-10-27'
    }
  ],
  consumption: {
    monthly: [
      { vaccine: 'BCG', consumption: 45 },
      { vaccine: 'OPV', consumption: 38 },
      { vaccine: 'Pentavalent', consumption: 42 },
      { vaccine: 'Measles', consumption: 35 }
    ]
  }
};