const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diabetes_predictor';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick fallback if local MongoDB is not running
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    console.log(`[Database] MongoDB not running locally (${error.message}).`);
    console.log('[Database] Operating with resilient local JSON persistence store.');
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
