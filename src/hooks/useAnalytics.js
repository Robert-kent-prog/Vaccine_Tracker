// src/hooks/useAnalytics.js
import { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api/analytics';

export const useAnalytics = (filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [filters]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const analyticsData = await analyticsAPI.getCoverageAnalytics(filters);
      setData(analyticsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics
  };
};