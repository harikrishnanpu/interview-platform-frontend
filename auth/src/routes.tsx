import type { RouteObject } from "react-router-dom";
import { APP_ROUTES } from "shared-config";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const authRoutes: RouteObject[] = [
  { path: APP_ROUTES.login, element: <LoginPage /> },
  { path: APP_ROUTES.signup, element: <SignupPage /> },
  { path: APP_ROUTES.forgotPassword, element: <ForgotPasswordPage /> },
  { path: APP_ROUTES.resetPassword, element: <ResetPasswordPage /> },
];

export default authRoutes;
