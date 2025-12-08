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

    console.log("🔍 AuthContext - Login called with:", credentials);

    try {
      const response = await authAPI.login(credentials);

      console.log("🔍 AuthContext - Login API response:", response);

      if (response.success) {
        const { user } = response.data;

        console.log("✅ AuthContext - Login successful:", {
          userId: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        });

        setUser(user);
        return { success: true, user };
      } else {
        console.log("❌ AuthContext - Login failed:", response.message);
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("🔥 AuthContext - Login error caught:", {
        message: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  };

  const signup = async (userData) => {
    setError(null);

    console.log("🔍 AuthContext - Signup called with:", userData);

    // Send data exactly as frontend provides (no transformation needed)
    // The backend will handle role validation
    const backendData = {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role, // Send role exactly as selected
      // Only include these fields if they exist (for mother role)
      ...(userData.phone && { phone: userData.phone }),
      ...(userData.subCounty && { subCounty: userData.subCounty }),
      ...(userData.ward && { ward: userData.ward }),
      ...(userData.location && { location: userData.location }),
      children: userData.children || [],
    };

    console.log("🔍 AuthContext - Backend data:", backendData);

    try {
      const response = await authAPI.register(backendData);

      if (response.success) {
        const { user } = response.data;
        setUser(user);
        return { success: true, user };
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("🔥 AuthContext - Signup error:", error);
      throw error;
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
