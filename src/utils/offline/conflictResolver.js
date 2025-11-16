// src/utils/offline/conflictResolver.js
/**
 * Conflict resolution strategies for offline data synchronization
 */

export const conflictResolver = {
  // Resolve conflicts between local and server data
  resolveConflict: (localData, serverData, conflictType) => {
    const strategies = {
      'last-write-wins': resolveLastWriteWins,
      'client-wins': resolveClientWins,
      'server-wins': resolveServerWins,
      'merge': resolveMerge,
      'custom': resolveCustom
    };

    const strategy = strategies[conflictType] || resolveLastWriteWins;
    return strategy(localData, serverData);
  },

  // Detect conflicts between datasets
  detectConflicts: (localData, serverData) => {
    const conflicts = [];

    // Check for version conflicts
    if (localData._version && serverData._version && localData._version !== serverData._version) {
      conflicts.push({
        type: 'version',
        field: '_version',
        local: localData._version,
        server: serverData._version
      });
    }

    // Check for timestamp conflicts
    if (localData.updatedAt && serverData.updatedAt) {
      const localTime = new Date(localData.updatedAt).getTime();
      const serverTime = new Date(serverData.updatedAt).getTime();
      
      if (Math.abs(localTime - serverTime) > 5000) { // 5 second threshold
        conflicts.push({
          type: 'timestamp',
          field: 'updatedAt',
          local: localData.updatedAt,
          server: serverData.updatedAt
        });
      }
    }

    // Check for data conflicts in key fields
    const keyFields = ['name', 'phone', 'dateOfBirth', 'vaccineId', 'batchNumber'];
    
    keyFields.forEach(field => {
      if (localData[field] && serverData[field] && localData[field] !== serverData[field]) {
        conflicts.push({
          type: 'data',
          field,
          local: localData[field],
          server: serverData[field]
        });
      }
    });

    return conflicts;
  },

  // Resolve multiple conflicts in a dataset
  resolveDatasetConflicts: (localDataset, serverDataset, strategy = 'last-write-wins') => {
    const resolved = [];
    const conflicts = [];

    // Create maps for easy lookup
    const localMap = new Map(localDataset.map(item => [item.id, item]));
    const serverMap = new Map(serverDataset.map(item => [item.id, item]));

    // Process all unique IDs
    const allIds = new Set([...localMap.keys(), ...serverMap.keys()]);

    allIds.forEach(id => {
      const localItem = localMap.get(id);
      const serverItem = serverMap.get(id);

      if (!localItem) {
        // New item from server
        resolved.push(serverItem);
      } else if (!serverItem) {
        // New item from client
        resolved.push(localItem);
      } else {
        // Conflict - need resolution
        const itemConflicts = conflictResolver.detectConflicts(localItem, serverItem);
        
        if (itemConflicts.length > 0) {
          conflicts.push({
            id,
            type: 'item',
            conflicts: itemConflicts
          });

          const resolvedItem = conflictResolver.resolveConflict(localItem, serverItem, strategy);
          resolved.push(resolvedItem);
        } else {
          // No conflicts, use server data
          resolved.push(serverItem);
        }
      }
    });

    return {
      resolved,
      conflicts,
      stats: {
        total: resolved.length,
        conflicts: conflicts.length,
        localOnly: localDataset.length - conflicts.length,
        serverOnly: serverDataset.length - conflicts.length
      }
    };
  }
};

// Resolution strategies
function resolveLastWriteWins(localData, serverData) {
  const localTime = new Date(localData.updatedAt || localData.createdAt || 0).getTime();
  const serverTime = new Date(serverData.updatedAt || serverData.createdAt || 0).getTime();

  return localTime > serverTime ? localData : serverData;
}

function resolveClientWins(localData) {
  return localData;
}

function resolveServerWins(localData, serverData) {
  return serverData;
}

function resolveMerge(localData, serverData) {
  // Merge strategy: prefer non-null values, with client precedence
  const merged = { ...serverData, ...localData };
  
  // Special handling for version and timestamp
  if (localData._version && serverData._version) {
    merged._version = Math.max(localData._version, serverData._version) + 1;
  }
  
  merged.updatedAt = new Date().toISOString();
  merged._conflictResolved = true;
  
  return merged;
}

function resolveCustom(localData, serverData) {
  // Custom resolution logic based on data type and business rules
  const dataType = getDataType(localData, serverData);
  
  switch (dataType) {
    case 'child':
      return resolveChildConflict(localData, serverData);
    
    case 'vaccination':
      return resolveVaccinationConflict(localData, serverData);
    
    case 'mother':
      return resolveMotherConflict(localData, serverData);
    
    default:
      return resolveLastWriteWins(localData, serverData);
  }
}

// Data type specific resolvers
function resolveChildConflict(localData, serverData) {
  // For children, prefer the most recent medical information
  const merged = { ...serverData, ...localData };
  
  // Prefer client data for growth measurements
  if (localData.lastWeight || localData.lastHeight) {
    merged.lastWeight = localData.lastWeight || serverData.lastWeight;
    merged.lastHeight = localData.lastHeight || serverData.lastHeight;
    merged.lastMeasurementDate = localData.lastMeasurementDate || serverData.lastMeasurementDate;
  }
  
  // Prefer server data for critical medical information
  if (serverData.allergies || serverData.medicalConditions) {
    merged.allergies = serverData.allergies || localData.allergies;
    merged.medicalConditions = serverData.medicalConditions || localData.medicalConditions;
  }
  
  merged.updatedAt = new Date().toISOString();
  merged._version = Math.max(localData._version || 0, serverData._version || 0) + 1;
  merged._conflictResolved = true;
  
  return merged;
}

function resolveVaccinationConflict(localData, serverData) {
  // For vaccinations, safety first - prefer the record that indicates vaccination was given
  if (localData.status === 'completed' && serverData.status !== 'completed') {
    return localData;
  } else if (serverData.status === 'completed' && localData.status !== 'completed') {
    return serverData;
  }
  
  // If both completed, use most recent
  return resolveLastWriteWins(localData, serverData);
}

function resolveMotherConflict(localData, serverData) {
  // For mothers, prefer most recent contact information
  const merged = { ...serverData, ...localData };
  
  // Prefer client data for contact preferences
  if (localData.reminderPreferences) {
    merged.reminderPreferences = { 
      ...serverData.reminderPreferences, 
      ...localData.reminderPreferences 
    };
  }
  
  // Prefer server data for demographic information
  if (serverData.idNumber || serverData.dateOfBirth) {
    merged.idNumber = serverData.idNumber || localData.idNumber;
    merged.dateOfBirth = serverData.dateOfBirth || localData.dateOfBirth;
  }
  
  merged.updatedAt = new Date().toISOString();
  merged._version = Math.max(localData._version || 0, serverData._version || 0) + 1;
  merged._conflictResolved = true;
  
  return merged;
}

// Helper functions
function getDataType(localData, serverData) {
  // Determine data type based on structure
  if (localData.vaccineId || serverData.vaccineId) return 'vaccination';
  if (localData.dateOfBirth || serverData.dateOfBirth) {
    if (localData.motherId || serverData.motherId) return 'child';
    return 'mother';
  }
  if (localData.chwId || serverData.chwId) return 'chw';
  if (localData.facilityCode || serverData.facilityCode) return 'facility';
  
  return 'unknown';
}

// Conflict logging and reporting
export const conflictLogger = {
  logConflict: (conflict, resolution, context = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      conflict,
      resolution,
      context,
      userAgent: navigator.userAgent,
      online: navigator.onLine
    };
    
    // Store in localStorage for debugging
    const existingLogs = JSON.parse(localStorage.getItem('conflictLogs') || '[]');
    existingLogs.push(logEntry);
    
    // Keep only last 100 entries
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100);
    }
    
    localStorage.setItem('conflictLogs', JSON.stringify(existingLogs));
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Conflict resolved:', logEntry);
    }
  },
  
  getConflictLogs: () => {
    return JSON.parse(localStorage.getItem('conflictLogs') || '[]');
  },
  
  clearConflictLogs: () => {
    localStorage.removeItem('conflictLogs');
  }
};

// Sync state management
export const syncStateManager = {
  getSyncState: (key) => {
    const state = JSON.parse(localStorage.getItem('syncState') || '{}');
    return state[key];
  },
  
  setSyncState: (key, value) => {
    const state = JSON.parse(localStorage.getItem('syncState') || '{}');
    state[key] = {
      ...value,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('syncState', JSON.stringify(state));
  },
  
  getPendingSyncCount: () => {
    const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    return queue.length;
  },
  
  getLastSyncTime: () => {
    const state = JSON.parse(localStorage.getItem('syncState') || '{}');
    return state.lastSync || null;
  }
};

// Export the main conflict resolver
export default conflictResolver;