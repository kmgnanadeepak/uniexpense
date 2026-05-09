import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  timeout: 10000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("fintrack_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("fintrack_token");
      localStorage.removeItem("fintrack_user");
    }
    return Promise.reject(error);
  }
);
