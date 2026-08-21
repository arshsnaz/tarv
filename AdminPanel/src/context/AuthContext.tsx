import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { api, setToken } from '../services/api';
import { supabaseService } from '../services/supabaseClient';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
  sessionError: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearSessionError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  sessionError: null,
  login: async () => {},
  logout: () => {},
  clearSessionError: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setAuthToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('admin_token');
      const storedUser = localStorage.getItem('admin_user');

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Verify if session is still valid on Supabase (single-device lock)
          const isValidDevice = await supabaseService.verifySuperAdminSession(storedToken);
          if (!isValidDevice) {
            setToken(null);
            localStorage.removeItem('admin_user');
            setAuthToken(null);
            setUser(null);
            setSessionError('Session terminated: Super Admin logged in from another device.');
            setLoading(false);
            return;
          }

          setUser(parsedUser);
          setAuthToken(storedToken);
          setLoading(false);
          return;
        } catch {
          // fallback
        }
      }

      setLoading(false);
    };

    initAuth();

    // Background 3-second Single-Device Session Lock Monitor
    const sessionInterval = setInterval(async () => {
      const currentToken = localStorage.getItem('admin_token');
      if (currentToken && currentToken.startsWith('super_admin_session_token_')) {
        const isValid = await supabaseService.verifySuperAdminSession(currentToken);
        if (!isValid) {
          setToken(null);
          localStorage.removeItem('admin_user');
          setAuthToken(null);
          setUser(null);
          setSessionError('⚠️ Security Alert: Super Admin console was logged into from another device. This session has been terminated.');
        }
      }
    }, 3000);

    const handleUnauthorized = () => {
      const currentToken = localStorage.getItem('admin_token');
      if (currentToken && currentToken.startsWith('super_admin_session_token_')) {
        return;
      }
      setUser(null);
      setAuthToken(null);
      localStorage.removeItem('admin_user');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      clearInterval(sessionInterval);
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (username: string, password: string) => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // Validate Super Admin credentials
    if (
      (trimmedUser.toLowerCase() === 'admin' || trimmedUser.toLowerCase() === 'superadmin') &&
      trimmedPass === 'Admin@Consistent2026'
    ) {
      const superUser: AdminUser = {
        id: 'super_admin_1',
        username: trimmedUser,
        role: 'Super Administrator',
        createdAtUtc: '2025-01-01T00:00:00Z',
        lastLoginAtUtc: new Date().toISOString()
      };

      const sessionToken = 'super_admin_session_token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
      
      // Register single active session in Supabase PostgreSQL (overwriting any previous device)
      await supabaseService.registerSuperAdminSession(sessionToken);

      setToken(sessionToken);
      localStorage.setItem('admin_user', JSON.stringify(superUser));
      setAuthToken(sessionToken);
      setUser(superUser);
      setSessionError(null);
      return;
    }

    // Attempt backend API login for other accounts
    try {
      const res = await api.login(trimmedUser, trimmedPass);
      setToken(res.token);
      localStorage.setItem('admin_user', JSON.stringify(res.user));
      setAuthToken(res.token);
      setUser(res.user);
      setSessionError(null);
    } catch (err: any) {
      if (trimmedUser.toLowerCase() === 'admin' || trimmedUser.toLowerCase() === 'superadmin') {
        throw new Error('Invalid Super Admin password. Please check your password.');
      }
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('admin_user');
    setAuthToken(null);
    setUser(null);
  };

  const clearSessionError = () => {
    setSessionError(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, sessionError, login, logout, clearSessionError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
