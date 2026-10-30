import axios from 'axios';

/**
 * Centralized Axios instance configured for future Node.js / Express backend integration.
 * Supports environment-based base URL and HTTP-Only cookies.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // Configured for secure HTTP-only cookies from Express
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: Attach authorization header if token exists in session
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('drp_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Uniform error handling & 401 session expiration handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network offline / server unreachable gracefully
    if (!error.response) {
      console.warn('[API Integration] Backend server is not reachable at:', error.config?.baseURL);
      return Promise.reject({
        message: 'Unable to connect to the backend server. Running in demonstration mode.',
        isNetworkError: true,
      });
    }

    // 401 Unauthorized handling
    if (error.response.status === 401) {
      sessionStorage.removeItem('drp_auth_token');
      sessionStorage.removeItem('drp_user_session');
    }

    const customError = {
      status: error.response.status,
      message: error.response.data?.message || 'An unexpected server error occurred.',
      errors: error.response.data?.errors,
    };

    return Promise.reject(customError);
  }
);

export default api;
