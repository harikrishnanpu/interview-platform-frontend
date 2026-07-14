import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { AppState } from "shared-auth";
import { APP_ROUTES } from "shared-config";

export default function AdminDashboard() {
  const user = useSelector((state: AppState) => state.auth.user);

  if (!user) return <Navigate to={APP_ROUTES.login} replace />;
  if (user.role !== "admin") return <Navigate to={APP_ROUTES.login} replace />;

  return (
    <div className="flex min-h-[calc(100vh-53px)] items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
        <p className="mt-2 text-muted">
          Hello {user.name} — signed in as {user.email}.
        </p>
        <Link
          to={APP_ROUTES.home}
          className="mt-6 inline-block text-sm text-muted underline"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
