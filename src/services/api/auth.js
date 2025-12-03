import axios from "axios";

// Use environment variable or default to your backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create axios instance with configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Return just the data from successful responses
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - token invalid/expired
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          window.location.href = "/login";
          break;

        case 403:
          // Forbidden - insufficient permissions
          console.warn("Access forbidden:", data.message);
          break;

        case 404:
          // Not found
          console.error("Resource not found:", error.config.url);
          break;

        case 500:
          // Server error
          console.error("Server error:", data.message);
          break;

        default:
          console.error("API Error:", error.message);
      }

      // Return a consistent error format
      return Promise.reject({
        success: false,
        message: data?.message || `Error ${status}: ${error.message}`,
        status,
        data: data || null,
      });
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
      return Promise.reject({
        success: false,
        message: "Network error. Please check your connection.",
        status: 0,
      });
    } else {
      // Request setup error
      console.error("Request error:", error.message);
      return Promise.reject({
        success: false,
        message: error.message,
        status: null,
      });
    }
  }
);

// Store token and user data
const storeAuthData = (token, user) => {
  if (token) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
    // Set default auth header for future requests
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// Clear auth data
const clearAuthData = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  delete api.defaults.headers.common["Authorization"];
};

// Main auth API object
export const authAPI = {
  // Login with email/username and password
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    if (response.success && response.data) {
      const { accessToken, user } = response.data;
      storeAuthData(accessToken, user);
    }

    return response;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);

    // Auto-login after successful registration
    if (response.success && response.data) {
      const { accessToken, user } = response.data;
      storeAuthData(accessToken, user);
    }

    return response;
  },

  // Logout (clear local storage)
  logout: () => {
    clearAuthData();
    return { success: true, message: "Logged out successfully" };
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");

    if (response.success && response.data) {
      // Update stored user data
      localStorage.setItem("auth_user", JSON.stringify(response.data.user));
    }

    return response;
  },

  // Refresh token (if implemented on backend)
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post("/auth/refresh", { refreshToken });

    if (response.success && response.data) {
      const { accessToken, user } = response.data;
      storeAuthData(accessToken, user);
    }

    return response;
  },

  // Reset password request
  resetPassword: async (email) => {
    return await api.post("/auth/reset-password", { email });
  },

  // Update password (with token)
  updatePassword: async (token, newPassword) => {
    return await api.post("/auth/update-password", {
      token,
      newPassword,
    });
  },

  // Verify email
  verifyEmail: async (token) => {
    return await api.post("/auth/verify-email", { token });
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("auth_user");
    return !!(token && user);
  },

  // Get stored user data
  getStoredUser: () => {
    const userStr = localStorage.getItem("auth_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem("auth_token");
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);

    if (response.success && response.data) {
      // Update stored user data
      localStorage.setItem("auth_user", JSON.stringify(response.data));
    }

    return response;
  },

  // Change password
  changePassword: async (userId, currentPassword, newPassword) => {
    return await api.put(`/users/${userId}/password`, {
      currentPassword,
      newPassword,
    });
  },
};

// Export the axios instance for other services
export { api };

// Optional: Create a default export
export default authAPI;
