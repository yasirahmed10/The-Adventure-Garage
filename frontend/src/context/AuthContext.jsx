import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: "Demo Admin",
    email: "admin@theadventuregarage.com",
    role: "admin"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auth checks disabled for demo mode
  }, []);

  const login = async (email, password, isAdmin = false) => {
    const url = isAdmin ? '/auth/admin/login' : '/auth/login';
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const res = await api.post(url, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    localStorage.setItem('token', res.data.access_token);
    setUser({
      id: res.data.user_id,
      name: res.data.name,
      email: res.data.email,
      role: res.data.role
    });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
