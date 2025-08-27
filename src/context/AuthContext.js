import React, { createContext, useContext, useMemo, useState } from 'react';
import { DataContext } from './DataContext';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { users, addUser } = useContext(DataContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false); // toggle for signup screen
  const [showHome, setShowHome] = useState(true); // toggle for home screen (default true)

  const login = (email, password) => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );
    if (!user) throw new Error('Invalid email or password');
    setCurrentUser(user);
    setShowHome(false); // once logged in, hide home
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    setShowSignup(false);
    setShowHome(true); // show home again after logout
  };

  // New signup for customers only
  const signupCustomer = (name, email, password) => {
    const newUser = { name, email, password, role: 'Customer' };
    addUser(newUser);
    setCurrentUser(newUser);
    setShowHome(false);
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
      showHome,
      setShowHome,
    }),
    [currentUser, showSignup, showHome]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
