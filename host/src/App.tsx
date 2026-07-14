import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { dashboardPath, logout, toggleTheme } from "./store";

const AuthRoutes = lazy(() => import("authApp/routes"));
const DashboardRoutes = lazy(() => import("dashboardApp/routes"));

function Nav() {
  const user = useAppSelector((s) => s.auth.user);
  const theme = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <nav className="flex items-center gap-4 border-b border-border bg-surface px-6 py-3 text-sm">
      <Link to="/" className="font-medium text-foreground">
        Interview Platform
      </Link>
      <Link to="/login" className="text-muted hover:text-foreground">
        Login
      </Link>
      <Link to="/signup" className="text-muted hover:text-foreground">
        Signup
      </Link>
      {user && (
        <Link
          to={dashboardPath(user.role)}
          className="text-muted hover:text-foreground"
        >
          Dashboard
        </Link>
      )}
      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="rounded border border-border px-3 py-1 text-foreground"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
        {user ? (
          <>
            <span className="text-muted">
              {user.name} · {user.role}
            </span>
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className="rounded bg-primary px-3 py-1 text-primary-fg"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-muted">guest</span>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">Interview Platform</h1>
      <p className="mt-2 text-muted">
        {user
          ? `Welcome back, ${user.name} (${user.role}).`
          : "Please login or signup to continue."}
      </p>
    </div>
  );
}

function Loading() {
  return <p className="p-6 text-sm text-muted">Loading...</p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface text-foreground">
        <Nav />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <AuthRoutes />
          <DashboardRoutes />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
