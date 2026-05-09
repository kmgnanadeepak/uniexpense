import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || form.password.length < 4) {
      setError("Enter valid credentials.");
      return;
    }
    try {
      setLoading(true);
      await login(form);
      const nextPath = location.state?.from || "/dashboard";
      navigate(nextPath, { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Invalid username or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Welcome Back</h2>
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error ? <small className="text-red">{error}</small> : null}
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
