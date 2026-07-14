import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "shared-auth";
import { APP_ROUTES, MESSAGES } from "shared-config";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError(MESSAGES.missingResetToken);
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      navigate(APP_ROUTES.login);
    } catch (err) {
      setError(err instanceof Error ? err.message : MESSAGES.resetFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-53px)] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-foreground">Reset password</h1>
        <p className="mt-2 text-sm text-muted">Enter your new password.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-foreground"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full rounded bg-primary px-3 py-2 text-sm text-primary-fg disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Reset password"}
          </button>
        </form>
        <p className="mt-4 text-sm text-muted">
          <Link to={APP_ROUTES.login} className="underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
