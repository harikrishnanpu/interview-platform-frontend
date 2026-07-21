export const APP_ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  userDashboard: "/dashboard",
  adminDashboard: "/admin/dashboard",
  interviewerDashboard: "/interviewer/dashboard",
} as const;

export const API_BASE_URL = "http://localhost:4000";

export const API_ROUTES = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    me: "/auth/me",
    logout: "/auth/logout",
  },
} as const;
