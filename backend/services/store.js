const fs = require('fs');
const path = require('path');
const { getIsConnected } = require('../config/db');
const User = require('../models/User');
const Assessment = require('../models/Assessment');

const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial demo seed
const INITIAL_DEMO_USER = {
  id: 'usr_guest_demo',
  _id: 'usr_guest_demo',
  name: 'Alex Morgan',
  email: 'alex.morgan@healthportal.demo',
  password: '', // Allows demo login
  role: 'User',
  createdAt: '2026-01-15T09:30:00Z',
  avatarInitials: 'AM',
  notifications: {
    emailReports: true,
    healthTips: true,
    reminders: false,
  },
  privacySettings: {
    shareTelemetry: false,
    demoModeActive: true,
  },
};

const readLocalData = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading local db file:', err);
  }
  return { users: [INITIAL_DEMO_USER], assessments: [] };
};

const writeLocalData = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local db file:', err);
  }
};

// Seed if missing
if (!fs.existsSync(DB_FILE)) {
  writeLocalData({ users: [INITIAL_DEMO_USER], assessments: [] });
}

const store = {
  // Users
  async findUserByEmail(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (getIsConnected()) {
      try {
        const user = await User.findOne({ email: cleanEmail });
        if (user) return user.toObject();
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    return data.users.find((u) => u.email.toLowerCase() === cleanEmail) || null;
  },

  async findUserById(id) {
    if (getIsConnected()) {
      try {
        const user = await User.findById(id);
        if (user) return user.toObject();
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    return data.users.find((u) => u.id === id || u._id === id) || null;
  },

  async createUser(userData) {
    if (getIsConnected()) {
      try {
        const user = await User.create(userData);
        return user.toObject();
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    const newUser = {
      id: `usr_${Date.now()}`,
      _id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...userData,
    };
    data.users.push(newUser);
    writeLocalData(data);
    return newUser;
  },

  async updateUser(id, updateData) {
    if (getIsConnected()) {
      try {
        const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (updated) return updated.toObject();
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    const idx = data.users.findIndex((u) => u.id === id || u._id === id);
    if (idx !== -1) {
      data.users[idx] = { ...data.users[idx], ...updateData };
      writeLocalData(data);
      return data.users[idx];
    }
    return null;
  },

  // Assessments
  async createAssessment(assessmentData) {
    if (getIsConnected()) {
      try {
        const created = await Assessment.create({
          assessmentId: assessmentData.id,
          userId: assessmentData.userId,
          status: assessmentData.status,
          serviceConnected: assessmentData.serviceConnected,
          measurements: assessmentData.measurements,
          predictionResult: assessmentData.predictionResult,
        });
        return { ...created.toObject(), id: assessmentData.id };
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    data.assessments.unshift(assessmentData);
    writeLocalData(data);
    return assessmentData;
  },

  async getAssessments(userId = null) {
    if (getIsConnected()) {
      try {
        const query = userId && userId !== 'usr_guest_demo' ? { userId } : {};
        const items = await Assessment.find(query).sort({ createdAt: -1 });
        return items.map((item) => ({
          ...item.toObject(),
          id: item.assessmentId || item._id.toString(),
        }));
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    if (userId && userId !== 'usr_guest_demo') {
      return data.assessments.filter((a) => a.userId === userId);
    }
    return data.assessments;
  },

  async getAssessmentById(id) {
    if (getIsConnected()) {
      try {
        const item = await Assessment.findOne({ assessmentId: id });
        if (item) return { ...item.toObject(), id: item.assessmentId };
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    return data.assessments.find((a) => a.id === id) || null;
  },

  async deleteAssessment(id) {
    if (getIsConnected()) {
      try {
        await Assessment.deleteOne({ assessmentId: id });
      } catch (err) {
        console.warn('Mongo error, fallback to local store:', err.message);
      }
    }
    const data = readLocalData();
    data.assessments = data.assessments.filter((a) => a.id !== id);
    writeLocalData(data);
    return true;
  },
};

module.exports = store;
