import axios from "axios";

// Create a single instance
const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Function to set auth token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;