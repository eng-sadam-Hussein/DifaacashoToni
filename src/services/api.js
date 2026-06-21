import axios from "axios";

const configuredApiUrl =
  import.meta.env.VITE_API_URL?.trim();

const API_URL = (
  configuredApiUrl ||
  (import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "/api")
).replace(/\/+$/, "");

if (!configuredApiUrl && import.meta.env.DEV) {
  console.warn(
    "VITE_API_URL was not found. Using development fallback:",
    API_URL
  );
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

const authRoutes = [
  "/auth/login",
  "/auth/verify-otp",
  "/auth/resend-otp",
  "/auth/refresh",
  "/auth/logout",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const isAuthenticationRequest = (url = "") =>
  authRoutes.some((route) => url.includes(route));

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthenticationRequest(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post("/auth/refresh")
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return api(originalRequest);
    } catch (refreshError) {
      window.dispatchEvent(
        new CustomEvent("afess:session-expired")
      );

      return Promise.reject(refreshError);
    }
  }
);

export function getApiErrorMessage(
  error,
  fallbackMessage = "Something went wrong. Please try again."
) {
  if (!error?.response) {
    if (error?.code === "ECONNABORTED") {
      return "The server took too long to respond.";
    }

    return (
      "Unable to connect to the backend server at " +
      API_URL
    );
  }

  const data = error.response.data;

  if (typeof data === "string") {
    return data;
  }

  return (
    data?.message ||
    data?.error ||
    data?.errors?.[0]?.message ||
    fallbackMessage
  );
}

export { API_URL };

export default api;