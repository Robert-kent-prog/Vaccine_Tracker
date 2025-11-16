// src/services/storage/indexedDB.js
const DB_NAME = 'VaccinationSystemDB';
const DB_VERSION = 1;

const STORES = {
  CHILDREN: 'children',
  VACCINATIONS: 'vaccinations',
  MOTHERS: 'mothers',
  CHWS: 'chws',
  FACILITIES: 'facilities',
  SYNC_QUEUE: 'sync_queue',
  SETTINGS: 'settings'
};

class IndexedDBService {
  constructor() {
    this.db = null;
    this.initPromise = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        this.createStores(db);
      };
    });
  }

  createStores(db) {
    // Children store
    if (!db.objectStoreNames.contains(STORES.CHILDREN)) {
      const childrenStore = db.createObjectStore(STORES.CHILDREN, { keyPath: 'id' });
      childrenStore.createIndex('motherId', 'motherId', { unique: false });
      childrenStore.createIndex('dateOfBirth', 'dateOfBirth', { unique: false });
    }

    // Vaccinations store
    if (!db.objectStoreNames.contains(STORES.VACCINATIONS)) {
      const vaccinationsStore = db.createObjectStore(STORES.VACCINATIONS, { keyPath: 'id' });
      vaccinationsStore.createIndex('childId', 'childId', { unique: false });
      vaccinationsStore.createIndex('dateGiven', 'dateGiven', { unique: false });
      vaccinationsStore.createIndex('vaccineId', 'vaccineId', { unique: false });
    }

    // Mothers store
    if (!db.objectStoreNames.contains(STORES.MOTHERS)) {
      const mothersStore = db.createObjectStore(STORES.MOTHERS, { keyPath: 'id' });
      mothersStore.createIndex('phone', 'phone', { unique: true });
      mothersStore.createIndex('county', 'county', { unique: false });
    }

    // CHWs store
    if (!db.objectStoreNames.contains(STORES.CHWS)) {
      const chwsStore = db.createObjectStore(STORES.CHWS, { keyPath: 'id' });
      chwsStore.createIndex('chwId', 'chwId', { unique: true });
      chwsStore.createIndex('county', 'county', { unique: false });
    }

    // Facilities store
    if (!db.objectStoreNames.contains(STORES.FACILITIES)) {
      const facilitiesStore = db.createObjectStore(STORES.FACILITIES, { keyPath: 'id' });
      facilitiesStore.createIndex('facilityCode', 'facilityCode', { unique: true });
      facilitiesStore.createIndex('county', 'county', { unique: false });
    }

    // Sync queue store
    if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
      const syncStore = db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id', autoIncrement: true });
      syncStore.createIndex('action', 'action', { unique: false });
      syncStore.createIndex('timestamp', 'timestamp', { unique: false });
      syncStore.createIndex('status', 'status', { unique: false });
    }

    // Settings store
    if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
      db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
    }
  }

  async ensureDB() {
    if (!this.db) {
      await this.initPromise;
    }
    return this.db;
  }

  // Generic CRUD operations
  async add(storeName, data) {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get(storeName, key) {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName, indexName = null, query = null) {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const target = indexName ? store.index(indexName) : store;
      const request = query ? target.getAll(query) : target.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update(storeName, data) {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, key) {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Specific methods for vaccination data
  async getChildVaccinations(childId) {
    return this.getAll(STORES.VACCINATIONS, 'childId', childId);
  }

  async getMotherChildren(motherId) {
    return this.getAll(STORES.CHILDREN, 'motherId', motherId);
  }

  async getUpcomingVaccinations(days = 30) {
    const allVaccinations = await this.getAll(STORES.VACCINATIONS);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + days);

    return allVaccinations.filter(vaccination => {
      const dueDate = new Date(vaccination.dueDate);
      return dueDate <= cutoffDate && vaccination.status === 'pending';
    });
  }

  // Sync queue management
  async queueForSync(action, data) {
    const syncItem = {
      action,
      data,
      timestamp: new Date().toISOString(),
      status: 'pending',
      attempts: 0
    };

    return this.add(STORES.SYNC_QUEUE, syncItem);
  }

  async getPendingSyncItems() {
    return this.getAll(STORES.SYNC_QUEUE, 'status', 'pending');
  }

  async updateSyncItem(id, updates) {
    const item = await this.get(STORES.SYNC_QUEUE, id);
    if (item) {
      const updatedItem = { ...item, ...updates };
      return this.update(STORES.SYNC_QUEUE, updatedItem);
    }
  }

  // Settings management
  async getSetting(key) {
    const setting = await this.get(STORES.SETTINGS, key);
    return setting ? setting.value : null;
  }

  async setSetting(key, value) {
    return this.update(STORES.SETTINGS, { key, value });
  }

  // Data export
  async exportData(storeName) {
    const data = await this.getAll(storeName);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }

  // Data import
  async importData(storeName, data) {
    const db = await this.ensureDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    // Clear existing data
    await this.clearStore(storeName);

    // Add new data
    const promises = data.map(item => {
      return new Promise((resolve, reject) => {
        const request = store.add(item);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });

    return Promise.all(promises);
  }

  async clearStore(storeName) {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Database maintenance
  async getDatabaseSize() {
    const db = await this.ensureDB();
    let totalSize = 0;

    for (const storeName of db.objectStoreNames) {
      const size = await this.getStoreSize(storeName);
      totalSize += size;
    }

    return totalSize;
  }

  async getStoreSize(storeName) {
    const allData = await this.getAll(storeName);
    const jsonString = JSON.stringify(allData);
    return new Blob([jsonString]).size;
  }

  async cleanupOldData(daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // Clean old sync items
    const syncItems = await this.getAll(STORES.SYNC_QUEUE);
    const oldSyncItems = syncItems.filter(item => 
      new Date(item.timestamp) < cutoffDate && item.status !== 'pending'
    );

    for (const item of oldSyncItems) {
      await this.delete(STORES.SYNC_QUEUE, item.id);
    }

    return oldSyncItems.length;
  }
}

// Create singleton instance
export const indexedDBService = new IndexedDBService();
export default indexedDBService;