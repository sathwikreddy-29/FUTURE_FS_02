import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const envApiUrl = process.env.REACT_APP_API_URL;
const apiBaseURL = envApiUrl && envApiUrl !== 'https://your-render-backend-url.onrender.com'
  ? envApiUrl
  : process.env.NODE_ENV === 'development'
    ? '/'
    : 'https://future-fs-02-7-pa3x.onrender.com';

if (!envApiUrl || envApiUrl === 'https://your-render-backend-url.onrender.com') {
  console.warn(
    'REACT_APP_API_URL is not set or is still using the placeholder. Falling back to:',
    apiBaseURL === '/' ? 'relative path/proxy' : apiBaseURL
  );
}

axios.defaults.baseURL = apiBaseURL;

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and set admin
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // For simplicity, we'll assume token is valid if exists
      setAdmin({ token, authenticated: true });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAdmin({ token, authenticated: true });
      // Small delay to ensure state is updated before navigation
      setTimeout(() => {}, 100);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      const details = error.response
        ? `${message}`
        : `Unable to reach backend at ${apiBaseURL}: ${message}`;
      return { success: false, message: details };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};