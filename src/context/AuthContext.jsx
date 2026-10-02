import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lilac_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('lilac_access_token'));
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await authApi.login({ username, password });
      if (res.success && res.data) {
        const { accessToken, refreshToken, user } = res.data;
        localStorage.setItem('lilac_access_token', accessToken);
        localStorage.setItem('lilac_refresh_token', refreshToken);
        localStorage.setItem('lilac_user', JSON.stringify(user));
        setToken(accessToken);
        setUser(user);
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err) {
      return { success: false, message: err.message || 'Network error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('lilac_access_token');
    localStorage.removeItem('lilac_refresh_token');
    localStorage.removeItem('lilac_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
