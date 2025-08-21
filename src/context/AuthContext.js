import React, { createContext, useContext, useMemo, useState } from 'react';
import { DataContext } from './DataContext';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { users } = useContext(DataContext);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    setCurrentUser(user);
    return user;
  };

  const logout = () => setCurrentUser(null);

  const value = useMemo(() => ({
    currentUser,
    login,
    logout,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
