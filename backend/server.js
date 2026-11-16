const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const { connectDB, getIsConnected } = require('./config/db');

// Load environment configuration
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

// Connect Database (MongoDB or local JSON persistence fallback)
connectDB();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      // Allow localhost on any port during development
      if (origin.match(/^http:\/\/localhost(:\d+)?$/) || origin.match(/^http:\/\/127\.0\.0\.1(:\d+)?$/)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/assessment', predictionRoutes); // Backward compatibility
app.use('/api/users', userRoutes);

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Diabetes Risk Predictor Backend API',
    status: 'running',
    port: PORT,
    database: getIsConnected() ? 'MongoDB Connected' : 'Local Persistence Store Active',
    mlServiceUrl: ML_SERVICE_URL,
    endpoints: {
      auth: '/api/auth',
      predictions: '/api/predictions',
      users: '/api/users',
      health: '/health',
    },
  });
});

app.get('/health', async (req, res) => {
  let mlStatus = 'unreachable';
  try {
    const mlHealth = await axios.get(`${ML_SERVICE_URL}/health`, { timeout: 2000 });
    mlStatus = mlHealth.data?.status || 'healthy';
  } catch {
    mlStatus = 'disconnected';
  }

  res.json({
    backend: 'healthy',
    database: getIsConnected() ? 'connected' : 'local-store',
    mlModelService: mlStatus,
    timestamp: new Date().toISOString(),
  });
});

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Diabetes Risk Predictor Backend running on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
  console.log(`ML Microservice URL: ${ML_SERVICE_URL}`);
  console.log(`Database: ${getIsConnected() ? 'MongoDB' : 'Local JSON Store'}`);
  console.log(`====================================================`);
});

module.exports = app;
