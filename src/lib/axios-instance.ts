// src/lib/axios-instance.ts
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://round5-byway.huma-volve.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token automatically if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
