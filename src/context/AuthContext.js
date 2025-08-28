// context/AuthContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';
import { DataContext } from './DataContext';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { users, addUser } = useContext(DataContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showHome, setShowHome] = useState(false); // ✅ NEW

  const login = (email, password) => {
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) throw new Error('Invalid email or password');
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    setShowSignup(false);
    setShowHome(false); // ✅ reset home
  };

  const signupCustomer = (name, email, password) => {
    const newUser = { name, email, password, role: 'Customer' };
    addUser(newUser);
    setCurrentUser(newUser);
    return newUser;
  };

  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
      signupCustomer,
      showSignup,
      setShowSignup,
      showHome,        // ✅ export it
      setShowHome,     // ✅ export setter
    }),
    [currentUser, showSignup, showHome]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
