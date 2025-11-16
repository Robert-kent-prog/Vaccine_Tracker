// src/hooks/useVaccination.js
import { useState, useEffect } from 'react';
import { vaccinationsAPI } from '../services/api/vaccinations';

export const useVaccination = (childId) => {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (childId) {
      fetchVaccinations();
    }
  }, [childId]);

  const fetchVaccinations = async () => {
    try {
      setLoading(true);
      const data = await vaccinationsAPI.getChildVaccinations(childId);
      setVaccinations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const recordVaccination = async (vaccinationData) => {
    try {
      const newVaccination = await vaccinationsAPI.recordVaccination(vaccinationData);
      setVaccinations(prev => [...prev, newVaccination]);
      return newVaccination;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateVaccination = async (vaccinationId, updates) => {
    try {
      const updated = await vaccinationsAPI.updateVaccination(vaccinationId, updates);
      setVaccinations(prev => 
        prev.map(v => v.id === vaccinationId ? updated : v)
      );
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    vaccinations,
    loading,
    error,
    recordVaccination,
    updateVaccination,
    refetch: fetchVaccinations
  };
};