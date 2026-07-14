import type { RouteObject } from "react-router-dom";
import { APP_ROUTES } from "shared-config";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import InterviewerDashboard from "./pages/InterviewerDashboard";

const dashboardRoutes: RouteObject[] = [
  { path: APP_ROUTES.userDashboard, element: <UserDashboard /> },
  { path: APP_ROUTES.adminDashboard, element: <AdminDashboard /> },
  { path: APP_ROUTES.interviewerDashboard, element: <InterviewerDashboard /> },
];

export default dashboardRoutes;
