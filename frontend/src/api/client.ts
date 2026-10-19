import axios from "axios";
import { env, TOKEN_STORAGE_KEY } from "@/config/env";

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }
  }
  return config;
});

// Auto-logout on 401
apiClient.interceptors.response.use(
  (r) => r,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
