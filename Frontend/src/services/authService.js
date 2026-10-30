import api from './api';

// Demo seed profile for guest preview mode (clearly marked as guest/demo)
const DEMO_GUEST_USER = {
  id: 'usr_guest_demo',
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
 * Communicates with backend endpoints.
 * Never stores passwords or plaintext secrets in browser storage.
 */
export const authService = {
  /**
   * Log in user with email & password
   * POST /api/auth/login
   */
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const { user, token } = response.data || {};
      if (token) {
        sessionStorage.setItem('drp_auth_token', token);
      }
      if (user) {
        // Ensure no password or sensitive field is ever stored in browser storage
        const { password: _, ...safeUser } = user;
        sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));
      }
      return { success: true, user, isDemo: false };
    } catch (error) {
      const friendlyMessage =
        error?.response?.data?.message ||
        (error?.status === 401
          ? 'Invalid email or password. Please try again.'
          : 'We could not sign you in. Please check your email and password.');
      throw new Error(friendlyMessage);
    }
  },

  /**
   * Register new user
   * POST /api/auth/register
   * Does not create fake accounts if backend fails.
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      const { user, token } = response.data || {};
      if (token) {
        sessionStorage.setItem('drp_auth_token', token);
      }
      if (user) {
        const { password: _, ...safeUser } = user;
        sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));
      }
      return { success: true, user, isDemo: false };
    } catch (error) {
      const friendlyMessage =
        error?.response?.data?.message ||
        (error?.status === 409
          ? 'An account with this email address already exists.'
          : 'Your account could not be created. Please try again.');
      throw new Error(friendlyMessage);
    }
  },

  /**
   * Explore platform with demonstration guest account
   * Clearly marked as guest demo preview
   */
  async loginDemoGuest() {
    const demoToken = 'guest_demo_preview_token';
    sessionStorage.setItem('drp_auth_token', demoToken);
    sessionStorage.setItem('drp_user_session', JSON.stringify(DEMO_GUEST_USER));
    return {
      success: true,
      user: DEMO_GUEST_USER,
      isDemo: true,
      notice: 'Signed in as Demonstration Guest (Preview Mode)',
    };
  },

  /**
   * Get current authenticated user profile
   * GET /api/auth/me
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      const user = response.data?.user;
      if (user) {
        const { password: _, ...safeUser } = user;
        return safeUser;
      }
    } catch {
      // Check session
    }

    const saved = sessionStorage.getItem('drp_user_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const { password: _, ...safeUser } = parsed;
        return safeUser;
      } catch {
        return null;
      }
    }
    return null;
  },

  /**
   * Update user profile
   * PATCH /api/users/profile
   */
  async updateProfile(profileData) {
    try {
      const response = await api.patch('/users/profile', profileData);
      const updatedUser = response.data?.user;
      if (updatedUser) {
        const { password: _, ...safeUser } = updatedUser;
        sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));
        return safeUser;
      }
    } catch {
      const saved = sessionStorage.getItem('drp_user_session');
      const currentUser = saved ? JSON.parse(saved) : DEMO_GUEST_USER;
      const updatedUser = {
        ...currentUser,
        ...profileData,
      };
      const { password: _, ...safeUser } = updatedUser;
      sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));
      return safeUser;
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
      throw new Error(error?.response?.data?.message || 'Password could not be updated. Please try again.');
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

export default authService;
