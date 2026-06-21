import api from "./api";

const extractData = (response) =>
  response.data?.data ?? response.data;

const authService = {
  async login(credentials) {
    const response = await api.post(
      "/auth/login",
      credentials
    );

    return extractData(response);
  },

  async verifyOtp(payload) {
    const response = await api.post(
      "/auth/verify-otp",
      payload
    );

    return extractData(response);
  },

  async resendOtp(payload) {
    const response = await api.post(
      "/auth/resend-otp",
      payload
    );

    return extractData(response);
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me");

    return extractData(response);
  },

  async logout() {
    const response = await api.post("/auth/logout");

    return extractData(response);
  },

  async forgotPassword(payload) {
    const response = await api.post(
      "/auth/forgot-password",
      payload
    );

    return extractData(response);
  },

  async resetPassword(payload) {
    const response = await api.post(
      "/auth/reset-password",
      payload
    );

    return extractData(response);
  },

  getGoogleLoginUrl() {
    return `${import.meta.env.VITE_API_URL}/auth/google`;
  },
};

export default authService;