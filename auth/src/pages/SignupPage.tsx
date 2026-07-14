import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardPath, signup, type Role } from "shared-auth";
import { APP_ROUTES, MESSAGES } from "shared-config";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signup(name, email, password, role);
      dispatch({ type: "auth/setUser", payload: res.data.user });
      navigate(dashboardPath(res.data.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : MESSAGES.signupFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-53px)] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-foreground">Signup</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-foreground"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <select
            className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-foreground"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="user">User</option>
            <option value="interviewer">Interviewer</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-primary px-3 py-2 text-sm text-primary-fg disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-muted">
          Already have an account?{" "}
          <Link to={APP_ROUTES.login} className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
