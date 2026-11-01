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

// Response interceptor: Uniform user-friendly error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network offline / server unreachable gracefully
    if (!error.response) {
      if (import.meta.env.DEV) {
        console.warn('[API Integration] Backend server is not reachable at:', error.config?.baseURL);
      }
      return Promise.reject({
        message: 'We could not connect to the service. Please check your internet connection and try again.',
        isNetworkError: true,
      });
    }

    // 401 Unauthorized handling
    if (error.response.status === 401) {
      sessionStorage.removeItem('drp_auth_token');
      sessionStorage.removeItem('drp_user_session');
      return Promise.reject({
        status: 401,
        message: 'Your session has expired. Please log in again.',
      });
    }

    // Friendly messages by HTTP status code
    let friendlyMessage = 'Something went wrong on our side. Please try again later.';
    const status = error.response.status;

    if (status === 400 || status === 422) {
      friendlyMessage = error.response.data?.message || 'Please check the highlighted fields and correct the information.';
    } else if (status === 404) {
      friendlyMessage = 'The requested information was not found.';
    } else if (status >= 500) {
      friendlyMessage = 'Something went wrong on our side. Please try again later.';
    }

    const customError = {
      status,
      message: friendlyMessage,
      errors: error.response.data?.errors,
    };

    return Promise.reject(customError);
  }
);

export default api;
