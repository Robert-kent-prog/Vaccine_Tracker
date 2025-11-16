// src/components/contexts/OfflineContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { syncManager } from '../utils/offline/syncManager';
import { useNotifications } from './NotificationContext';

const OfflineContext = createContext();

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { showNotification } = useNotifications();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showNotification('Connection restored. Syncing data...', 'success');
      processPendingSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      showNotification('You are currently offline. Changes will be synced when connection is restored.', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for pending sync on mount
    setPendingSync(syncManager.hasPendingSync());

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const processPendingSync = async () => {
    if (syncManager.hasPendingSync()) {
      setSyncProgress(0);
      try {
        const result = await syncManager.processSyncQueue();
        setSyncProgress(100);
        
        if (result.successful > 0) {
          showNotification(`Successfully synced ${result.successful} items`, 'success');
        }
        if (result.failed > 0) {
          showNotification(`${result.failed} items failed to sync`, 'error');
        }
        
        setPendingSync(result.remaining > 0);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        showNotification('Sync failed. Please try again.', 'error');
      }
    }
  };

  const queueAction = (action, data) => {
    syncManager.queueForSync(action, data);
    setPendingSync(true);
    
    if (!isOnline) {
      showNotification('Action queued for sync when online', 'info');
    }
  };

  const value = {
    isOnline,
    pendingSync,
    syncProgress,
    queueAction,
    processPendingSync
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};