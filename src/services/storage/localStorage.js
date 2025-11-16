// src/services/storage/localStorage.js
export const storageService = {
  // Set item with expiration
  set: (key, value, expiresIn = null) => {
    const item = {
      value,
      timestamp: expiresIn ? Date.now() + expiresIn : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  // Get item with expiration check
  get: (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    
    // Check if expired
    if (item.timestamp && Date.now() > item.timestamp) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  },

  // Remove item
  remove: (key) => {
    localStorage.removeItem(key);
  },

  // Clear all items
  clear: () => {
    localStorage.clear();
  },

  // Get all keys
  keys: () => {
    return Object.keys(localStorage);
  }
};

// Specific storage keys
export const STORAGE_KEYS = {
  USER: 'vaccination_user',
  CHILDREN: 'vaccination_children',
  VACCINATIONS: 'vaccination_records',
  OFFLINE_DATA: 'vaccination_offline_data'
};