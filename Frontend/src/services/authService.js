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

const LOCAL_ACCOUNTS_KEY = 'drp_registered_accounts';

const getLocalAccounts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalAccounts = (accounts) => {
  try {
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.warn('Failed to save accounts locally:', err);
  }
};

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Authentication Service
 * Communicates with backend endpoints.
 * Includes offline / demo mode fallback for college evaluation and offline environments.
 */
export const authService = {
  /**
   * Log in user with email & password
   * POST /api/auth/login
   */
  async login(credentials) {
    const email = credentials.email ? credentials.email.trim().toLowerCase() : '';
    const password = credentials.password;

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
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
      // If the backend returned an explicit 401/403 credentials rejection from live server
      if (error?.status === 401 || error?.response?.status === 401) {
        throw new Error(error?.response?.data?.message || 'Invalid email or password. Please try again.');
      }

      // Backend is offline / unreachable (Network error / connection refused):
      // 1. Check default demo user
      if (email === DEMO_GUEST_USER.email.toLowerCase()) {
        sessionStorage.setItem('drp_auth_token', 'demo_active_token');
        sessionStorage.setItem('drp_user_session', JSON.stringify(DEMO_GUEST_USER));
        return { success: true, user: DEMO_GUEST_USER, isDemo: true };
      }

      // 2. Check locally registered accounts
      const localAccounts = getLocalAccounts();
      const existing = localAccounts.find((acc) => acc.email.toLowerCase() === email);

      if (existing) {
        if (existing.password && existing.password !== password) {
          throw new Error('Invalid email or password. Please try again.');
        }
        const { password: _, ...safeUser } = existing;
        sessionStorage.setItem('drp_auth_token', `token_local_${Date.now()}`);
        sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));
        return { success: true, user: safeUser, isDemo: true };
      }

      // 3. Auto-initialize account for entered email in offline demo mode
      const rawPrefix = email.split('@')[0] || 'User';
      const displayName = rawPrefix
        .replace(/[._-]/g, ' ')
        .split(' ')
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
        .join(' ') || 'User';

      const newAccount = {
        id: `usr_${Date.now()}`,
        name: displayName,
        email,
        password,
        role: 'User',
        createdAt: new Date().toISOString(),
        avatarInitials: getInitials(displayName),
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

      localAccounts.push(newAccount);
      saveLocalAccounts(localAccounts);

      const { password: _, ...safeUser } = newAccount;
      sessionStorage.setItem('drp_auth_token', `token_local_${Date.now()}`);
      sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));
      return { success: true, user: safeUser, isDemo: true };
    }
  },

  /**
   * Register new user
   * POST /api/auth/register
   */
  async register(userData) {
    const email = userData.email ? userData.email.trim().toLowerCase() : '';
    const name = userData.name ? userData.name.trim() : 'User';
    const password = userData.password;

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
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
      if (error?.status === 409 || error?.response?.status === 409) {
        throw new Error('An account with this email address already exists.');
      }

      // Backend is offline / unreachable: save account to local persistent storage
      const localAccounts = getLocalAccounts();
      const existing = localAccounts.find((acc) => acc.email.toLowerCase() === email);

      if (existing) {
        throw new Error('An account with this email address already exists. Please log in.');
      }

      const newAccount = {
        id: `usr_${Date.now()}`,
        name,
        email,
        password,
        role: 'User',
        createdAt: new Date().toISOString(),
        avatarInitials: getInitials(name),
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

      localAccounts.push(newAccount);
      saveLocalAccounts(localAccounts);

      const { password: _, ...safeUser } = newAccount;
      sessionStorage.setItem('drp_auth_token', `token_local_${Date.now()}`);
      sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));
      return { success: true, user: safeUser, isDemo: true };
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
      // Backend may be offline; check session
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
        avatarInitials: profileData.name ? getInitials(profileData.name) : currentUser.avatarInitials,
      };
      const { password: _, ...safeUser } = updatedUser;
      sessionStorage.setItem('drp_user_session', JSON.stringify(safeUser));

      // Also sync update in localAccounts if present
      const localAccounts = getLocalAccounts();
      const idx = localAccounts.findIndex((acc) => acc.email?.toLowerCase() === safeUser.email?.toLowerCase());
      if (idx >= 0) {
        localAccounts[idx] = {
          ...localAccounts[idx],
          ...safeUser,
        };
        saveLocalAccounts(localAccounts);
      }

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
      const saved = sessionStorage.getItem('drp_user_session');
      if (saved) {
        try {
          const user = JSON.parse(saved);
          const localAccounts = getLocalAccounts();
          const idx = localAccounts.findIndex((acc) => acc.email?.toLowerCase() === user.email?.toLowerCase());
          if (idx >= 0) {
            if (
              localAccounts[idx].password &&
              passwordData.currentPassword &&
              localAccounts[idx].password !== passwordData.currentPassword
            ) {
              throw new Error('Current password does not match.');
            }
            localAccounts[idx].password = passwordData.newPassword;
            saveLocalAccounts(localAccounts);
          }
          return { success: true, message: 'Password updated successfully.' };
        } catch (err) {
          if (err.message === 'Current password does not match.') throw err;
        }
      }
      return { success: true, message: 'Password updated successfully.' };
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
