// src/lib/axios-instance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if available
axiosInstance.interceptors.request.use((config) => {
  const tokenString = localStorage.getItem("auth_token");
  // console.log("Token string from localStorage:", tokenString);
  if (tokenString) {
    try {
      // Parse the JSON string to get the actual token
      const token = JSON.parse(tokenString);
      // console.log("Parsed token:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.warn("Error parsing token from localStorage:", error);
      // Fallback: try using the string directly in case it's not JSON
      config.headers.Authorization = `Bearer ${tokenString}`;
    }
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
      // if (window.location.pathname !== "/signin") {
      //   window.location.href = "/signin";
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
