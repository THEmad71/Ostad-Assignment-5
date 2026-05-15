import { create } from "zustand";
import API from "../api/axios";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),

  // Register
  register: async (name, email, password) => {
    const res = await API.post("/users/register", { name, email, password });
    return res.data;
  },

  // Login
  login: async (email, password) => {
    const res = await API.post("/users/login", { email, password });
    const token = res.data.data.token;
    localStorage.setItem("token", token);
    set({ token, isLoggedIn: true });
    return res.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isLoggedIn: false });
  },

  // Get Profile
  getProfile: async () => {
    const res = await API.get("/users/profile");
    set({ user: res.data.data });
    return res.data;
  },

  // Update Profile
  updateProfile: async (data) => {
    const res = await API.put("/users/update-profile", data);
    set({ user: res.data.data });
    return res.data;
  },
}));

export default useAuthStore;