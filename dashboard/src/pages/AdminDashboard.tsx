import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type AuthState = {
  auth: {
    user: {
      id: string;
      name: string;
      email: string;
      role: "user" | "admin" | "interviewer";
    } | null;
  };
};

export default function AdminDashboard() {
  const user = useSelector((state: AuthState) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
      <p className="mt-2 text-muted">
        Hello {user.name} — signed in as {user.email}.
      </p>
      <Link to="/" className="mt-6 inline-block text-sm text-muted underline">
        Back home
      </Link>
    </div>
  );
}
