import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardPath, login } from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      const user = data.data.user;
      dispatch({ type: "auth/setUser", payload: user });
      localStorage.setItem("auth_user", JSON.stringify(user));
      navigate(dashboardPath(user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-12">
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
        <Link to="/signup" className="underline">
          Signup
        </Link>
        {" · "}
        <Link to="/forgot-password" className="underline">
          Forgot password
        </Link>
      </p>
    </div>
  );
}
