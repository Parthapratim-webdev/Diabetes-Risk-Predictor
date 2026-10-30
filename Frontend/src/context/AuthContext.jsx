import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Restore authenticated session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = sessionStorage.getItem('drp_auth_token');
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setToken(savedToken || 'demo_active_token');
        }
      } catch (err) {
        console.warn('Session restoration failed:', err);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      setUser(result.user);
      setToken(sessionStorage.getItem('drp_auth_token'));
      setIsDemoMode(result.isDemo ?? true);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      setUser(result.user);
      setToken(sessionStorage.getItem('drp_auth_token'));
      setIsDemoMode(result.isDemo ?? true);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginDemoGuest = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await authService.loginDemoGuest();
      setUser(result.user);
      setToken(sessionStorage.getItem('drp_auth_token'));
      setIsDemoMode(true);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updatedFields) => {
    const updated = await authService.updateProfile(updatedFields);
    setUser(updated);
    return updated;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    isLoading,
    isDemoMode,
    login,
    loginDemoGuest,
    register,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
