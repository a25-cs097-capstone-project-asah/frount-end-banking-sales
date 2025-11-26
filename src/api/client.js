import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://13.214.178.102:5000";

const api = axios.create({
  baseURL,
});

// Interceptor HARUS ditempatkan sebelum export
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  console.log("TOKEN DIKIRIM:", token);

  if (token) {
    // Tambahkan kedua header agar kompatibel dengan Express
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { api };
