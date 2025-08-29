import React, { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../api/client';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('token', data.token);
    setCurrentUser(data.user);
    setShowHome(false);
    return data.user;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    await AsyncStorage.removeItem('token');
    setCurrentUser(null);
    setShowSignup(false);
    setShowHome(true);
  };

  const signupCustomer = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    await AsyncStorage.setItem('token', data.token);
    setCurrentUser(data.user);
    setShowSignup(false);
    setShowHome(false);
    return data.user;
  };

  const value = useMemo(() => ({
    currentUser, login, logout, signupCustomer,
    showSignup, setShowSignup,
    showHome, setShowHome,
  }), [currentUser, showSignup, showHome]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
