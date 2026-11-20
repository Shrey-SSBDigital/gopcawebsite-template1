const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const INITIAL_DATA_PATH = path.join(__dirname, 'data', 'initialData.json');
const STORE_DATA_PATH = path.join(__dirname, 'data', 'store.json');

// In-memory / JSON store fallback state
let isMongoConnected = false;
let store = null;

function loadStore() {
  if (fs.existsSync(STORE_DATA_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(STORE_DATA_PATH, 'utf8'));
    } catch (e) {
      console.warn('Error reading store.json, falling back to initialData.json', e.message);
    }
  }
  if (fs.existsSync(INITIAL_DATA_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(INITIAL_DATA_PATH, 'utf8'));
      try {
        fs.writeFileSync(STORE_DATA_PATH, JSON.stringify(data, null, 2));
      } catch (writeErr) {
        // Safe in read-only environment like Vercel Lambda
      }
      return data;
    } catch (e) {
      console.error('Error reading initialData.json', e);
    }
  }
  return {};
}

function saveStore() {
  if (store) {
    try {
      fs.writeFileSync(STORE_DATA_PATH, JSON.stringify(store, null, 2));
    } catch (e) {
      // Safe fallback on read-only serverless filesystems
      console.warn('Notice: Disk write skipped in serverless environment:', e.message);
    }
  }
}

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    isMongoConnected = false;
    store = loadStore();
    return;
  }

  try {
    // Attempt Mongoose connection with 2.5s server selection timeout
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500
    });
    isMongoConnected = true;
    console.log(`✓ Connected to MongoDB at ${mongoUri}`);
  } catch (err) {
    isMongoConnected = false;
    console.log(`ℹ MongoDB not reachable (${err.message}). Using resilient local JSON store.`);
    store = loadStore();
  }
}

function getStore() {
  if (!store) {
    store = loadStore();
  }
  return store;
}

function resetStore() {
  if (fs.existsSync(INITIAL_DATA_PATH)) {
    store = JSON.parse(fs.readFileSync(INITIAL_DATA_PATH, 'utf8'));
    saveStore();
  }
  return store;
}

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoConnected,
  getStore,
  saveStore,
  resetStore
};
