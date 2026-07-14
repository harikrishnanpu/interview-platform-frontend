import { Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import InterviewerDashboard from "./pages/InterviewerDashboard";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/interviewer/dashboard" element={<InterviewerDashboard />} />
    </Routes>
  );
}
