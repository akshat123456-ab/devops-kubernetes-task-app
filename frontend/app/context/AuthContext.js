'use client';

import { createContext, useState, useEffect, useCallback } from 'react';
import API from '../../lib/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token with backend
      setUser({ email: localStorage.getItem('userEmail') || 'User' });
    }
    setLoading(false);
  }, []);

  const register = useCallback(async (name, email, password) => {
    const response = await API.post('/auth/register', { name, email, password });
    return response.data;
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    setUser({ email });
    return response.data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
