import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", currency: "INR", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.currency || form.password.length < 6) {
      setError("Enter username, email, currency and a 6+ character password.");
      return;
    }
    try {
      setLoading(true);
      await signup(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Signup failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create Account</h2>
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Currency (e.g. INR)" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error ? <small className="text-red">{error}</small> : null}
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
