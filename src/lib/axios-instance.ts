// src/lib/axios-instance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://round5-byway.huma-volve.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to authentication issues
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear stored authentication data
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("role");

      // Redirect to sign-in page
      // Using window.location to ensure we can redirect from anywhere in the app
      if (window.location.pathname !== "/signin") {
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
