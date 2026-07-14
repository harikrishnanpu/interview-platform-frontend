import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setMessage(
        data.data.resetToken
          ? `${data.message} Token: ${data.data.resetToken}`
          : data.message
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-12">
      <h1 className="text-xl font-semibold text-foreground">Forgot password</h1>
      <p className="mt-2 text-sm text-muted">
        Enter your email and we will create a reset token.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          className="w-full rounded border border-border bg-surface px-3 py-2 text-sm text-foreground"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        {message && <p className="break-all text-sm text-success">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-primary px-3 py-2 text-sm text-primary-fg disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Send reset token"}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted">
        <Link to="/login" className="underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
