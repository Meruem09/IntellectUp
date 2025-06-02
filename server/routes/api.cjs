// src/api.js
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Add interceptor
export const useApiWithToken = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};
export default api;
