import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://13.214.178.102:5000";

export const api = axios.create({
  baseURL,
});

// Interceptor Request (menambahkan token)
api.interceptors.request.use((config) => {
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

// Interceptor Response (logout otomatis jika token expired)
api.interceptors.response.use(
  (response) => {
    if (response.data?.message === "Token telah kadaluarsa") {
      localStorage.clear();
      window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
