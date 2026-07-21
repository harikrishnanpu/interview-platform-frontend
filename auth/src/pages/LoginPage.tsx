import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dashboardPath, login, type AppState } from "shared-auth";
import { APP_ROUTES, MESSAGES } from "shared-config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.auth.user);

  if (user) {
    return <Navigate to={dashboardPath(user.role)} replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password);
      dispatch({ type: "auth/setUser", payload: res.data.user });
      navigate(dashboardPath(res.data.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : MESSAGES.loginFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-53px)] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-foreground">Login</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-foreground"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-foreground"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-primary px-3 py-2 text-sm text-primary-fg disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-muted">
          <Link to={APP_ROUTES.signup} className="underline">
            Signup
          </Link>
          {" · "}
          <Link to={APP_ROUTES.forgotPassword} className="underline">
            Forgot password
          </Link>
        </p>
      </div>
    </div>
  );
}
