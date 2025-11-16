// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create and export AuthContext
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // Store registered users

  useEffect(() => {
    // Check for stored auth data and registered users
    const storedUser = localStorage.getItem('vaccination_user');
    const storedUsers = localStorage.getItem('vaccination_users');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem('vaccination_user', JSON.stringify(userData));
  };

  const signup = async (userData) => {
    // Check if username already exists
    const existingUser = users.find(u => u.username === userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Check if email already exists
    const existingEmail = users.find(u => u.email === userData.email);
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    // Create new user object
    const newUser = {
      id: Date.now().toString(), // Simple ID generation
      ...userData,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // Add to users array and update storage
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('vaccination_users', JSON.stringify(updatedUsers));

    // Auto-login after signup
    const { confirmPassword, children, ...loginData } = newUser;
    await login(loginData);

    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vaccination_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('vaccination_user', JSON.stringify(updatedUser));

    // Also update in users array if needed
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...updatedData } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('vaccination_users', JSON.stringify(updatedUsers));
  };

  // Helper function to validate credentials (for login)
  const validateCredentials = (username, password) => {
    const foundUser = users.find(u => 
      u.username === username && u.password === password && u.isActive
    );
    return foundUser || null;
  };

  const value = {
    user,
    users,
    login,
    signup,
    logout,
    updateUser,
    validateCredentials,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext as default for use in useAuth.js
export default AuthContext;