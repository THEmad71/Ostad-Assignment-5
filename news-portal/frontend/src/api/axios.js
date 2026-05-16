import axios from "axios";

const API = axios.create({
  baseURL: "https://news-portal-backend-lgph.onrender.com/api",
});

// প্রতিটা request এ automatically token যুক্ত করবে
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;