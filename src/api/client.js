import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://13.214.178.102:5000";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  // Ambil token dari berbagai key umum
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("access_token");

  console.log("TOKEN DIKIRIM:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
