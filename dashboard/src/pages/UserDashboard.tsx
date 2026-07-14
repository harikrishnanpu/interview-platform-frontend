import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { AppState } from "shared-auth";

export default function UserDashboard() {
  const user = useSelector((state: AppState) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "user") return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <h1 className="text-xl font-semibold text-foreground">User Dashboard</h1>
      <p className="mt-2 text-muted">
        Hello {user.name} — signed in as {user.email}.
      </p>
      <Link to="/" className="mt-6 inline-block text-sm text-muted underline">
        Back home
      </Link>
    </div>
  );
}
