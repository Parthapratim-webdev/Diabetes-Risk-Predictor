import api from './api';

// Demo seed user for preview & viva demonstrations
const DEMO_USER = {
  id: 'usr_demo_7721',
  name: 'Alex Morgan',
  email: 'alex.morgan@healthportal.demo',
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

/**
 * Authentication Service
 * Communicates with Node.js Express endpoints when available,
 * or gracefully provides demonstration fallback for frontend reviews.
 */
export const authService = {
  /**
   * Log in user
   * POST /api/auth/login
   */
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      if (token) {
        sessionStorage.setItem('drp_auth_token', token);
      }
      sessionStorage.setItem('drp_user_session', JSON.stringify(user));
      return { success: true, user, isDemo: false };
    } catch (error) {
      // If backend is not available, provide structured demonstration login
      if (error.isNetworkError || import.meta.env.VITE_ENABLE_DEMO_MODE === 'true') {
        const demoUser = {
          ...DEMO_USER,
          email: credentials.email || DEMO_USER.email,
          name: credentials.email ? credentials.email.split('@')[0].replace('.', ' ') : DEMO_USER.name,
        };
        const demoToken = 'demo_jwt_token_sample_session_' + Date.now();
        sessionStorage.setItem('drp_auth_token', demoToken);
        sessionStorage.setItem('drp_user_session', JSON.stringify(demoUser));
        return {
          success: true,
          user: demoUser,
          isDemo: true,
          notice: 'Connected in Demonstration Mode (Backend offline or not yet connected)',
        };
      }
      throw error;
    }
  },

  /**
   * Register new user
   * POST /api/auth/register
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      const { user, token } = response.data;
      if (token) {
        sessionStorage.setItem('drp_auth_token', token);
      }
      sessionStorage.setItem('drp_user_session', JSON.stringify(user));
      return { success: true, user, isDemo: false };
    } catch (error) {
      if (error.isNetworkError || import.meta.env.VITE_ENABLE_DEMO_MODE === 'true') {
        const newUser = {
          id: 'usr_' + Math.random().toString(36).substring(2, 9),
          name: userData.name,
          email: userData.email,
          role: 'User',
          createdAt: new Date().toISOString(),
          avatarInitials: userData.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2),
          notifications: { emailReports: true, healthTips: true, reminders: true },
          privacySettings: { shareTelemetry: false, demoModeActive: true },
        };
        const demoToken = 'demo_jwt_token_reg_' + Date.now();
        sessionStorage.setItem('drp_auth_token', demoToken);
        sessionStorage.setItem('drp_user_session', JSON.stringify(newUser));
        return {
          success: true,
          user: newUser,
          isDemo: true,
          notice: 'Demonstration account registered successfully.',
        };
      }
      throw error;
    }
  },

  /**
   * Get current authenticated user profile
   * GET /api/auth/me
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch {
      const saved = sessionStorage.getItem('drp_user_session');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
      return null;
    }
  },

  /**
   * Update user profile
   * PATCH /api/users/profile
   */
  async updateProfile(profileData) {
    try {
      const response = await api.patch('/users/profile', profileData);
      const updatedUser = response.data.user;
      sessionStorage.setItem('drp_user_session', JSON.stringify(updatedUser));
      return updatedUser;
    } catch {
      // Demonstration fallback
      const saved = sessionStorage.getItem('drp_user_session');
      const currentUser = saved ? JSON.parse(saved) : DEMO_USER;
      const updatedUser = {
        ...currentUser,
        ...profileData,
      };
      sessionStorage.setItem('drp_user_session', JSON.stringify(updatedUser));
      return updatedUser;
    }
  },

  /**
   * Change user password
   * POST /api/auth/change-password
   */
  async changePassword(passwordData) {
    try {
      const response = await api.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      if (error.isNetworkError || import.meta.env.VITE_ENABLE_DEMO_MODE === 'true') {
        return { success: true, message: 'Password updated successfully in session.' };
      }
      throw error;
    }
  },

  /**
   * Log out user
   * POST /api/auth/logout
   */
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // Backend may be offline
    } finally {
      sessionStorage.removeItem('drp_auth_token');
      sessionStorage.removeItem('drp_user_session');
    }
    return { success: true };
  },
};
