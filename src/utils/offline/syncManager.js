// src/utils/offline/syncManager.js
import { storageService, STORAGE_KEYS } from '../../services/storage/localStorage';

export const syncManager = {
  // Queue data for sync when online
  queueForSync: (action, data) => {
    const queue = storageService.get(STORAGE_KEYS.OFFLINE_DATA) || [];
    queue.push({
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      data,
      timestamp: Date.now(),
      attempts: 0
    });
    storageService.set(STORAGE_KEYS.OFFLINE_DATA, queue);
  },

  // Process sync queue when online
  processSyncQueue: async () => {
    const queue = storageService.get(STORAGE_KEYS.OFFLINE_DATA) || [];
    const successful = [];
    const failed = [];

    for (const item of queue) {
      try {
        // Simulate API call based on action
        await simulateAPICall(item.action, item.data);
        successful.push(item.id);
      } catch (error) {
        item.attempts += 1;
        if (item.attempts >= 3) {
          failed.push(item.id);
        }
      }
    }

    // Remove successful and permanently failed items
    const updatedQueue = queue.filter(item => 
      !successful.includes(item.id) && !failed.includes(item.id)
    );

    storageService.set(STORAGE_KEYS.OFFLINE_DATA, updatedQueue);

    return {
      successful: successful.length,
      failed: failed.length,
      remaining: updatedQueue.length
    };
  },

  // Check if data needs sync
  hasPendingSync: () => {
    const queue = storageService.get(STORAGE_KEYS.OFFLINE_DATA) || [];
    return queue.length > 0;
  }
};

// Simulate API calls for different actions
async function simulateAPICall(action, data) {
  // In real app, make actual API calls
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional failures
      if (Math.random() < 0.1) {
        reject(new Error('Network error'));
      } else {
        resolve({ success: true });
      }
    }, 500);
  });
}