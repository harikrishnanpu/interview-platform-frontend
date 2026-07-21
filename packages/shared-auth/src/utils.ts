import { APP_ROUTES } from "shared-config";
import type { Role } from "./types";

export function dashboardPath(role: Role) {
  if (role === "admin") return APP_ROUTES.adminDashboard;
  if (role === "interviewer") return APP_ROUTES.interviewerDashboard;
  return APP_ROUTES.userDashboard;
}
