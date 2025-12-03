/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is stored
        const storedUser = authAPI.getStoredUser();
        const isAuthenticated = authAPI.isAuthenticated();

        if (isAuthenticated && storedUser) {
          setUser(storedUser);
          // Verify token with backend
          await authAPI.getCurrentUser();
        }
      } catch (err) {
        // Log and clear invalid token/storage
        console.error(err);
        authAPI.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setError(null);
    const response = await authAPI.login(credentials);

    if (response.success) {
      const { user } = response.data;
      setUser(user);
      return { success: true, user };
    } else {
      throw new Error(response.message || "Login failed");
    }
  };

  const signup = async (userData) => {
    setError(null);

    // Transform frontend role to backend role
    const roleMapping = {
      mother: "mother",
      "health-worker": "health_worker",
      hospital: "hospital_staff",
      admin: "admin",
    };

    const backendData = {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: roleMapping[userData.role] || "mother",
      phone: userData.phone || "",
      subCounty: userData.subCounty || "",
      ward: userData.ward || "",
      location: userData.location || "",
      children: userData.children || [],
    };

    const response = await authAPI.register(backendData);

    if (response.success) {
      const { user } = response.data;
      setUser(user);
      return { success: true, user };
    } else {
      throw new Error(response.message || "Registration failed");
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setError(null);
  };

  const updateProfile = async (userData) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    const response = await authAPI.updateProfile(user._id, userData);

    if (response.success) {
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } else {
      throw new Error(response.message || "Update failed");
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    return await authAPI.changePassword(user._id, currentPassword, newPassword);
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
