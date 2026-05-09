import { useNavigate } from "react-router-dom";
import { useExpense } from "../context/ExpenseContext";

export function Navbar() {
  const navigate = useNavigate();
  const { dark, setDark, search, setSearch, setSidebarOpen, setShowNotifPanel } = useExpense();

  return (
    <header className="topbar">
      <button onClick={() => setSidebarOpen((s) => !s)}>☰</button>
      <input
        className="top-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transactions..."
      />
      <div className="top-actions">
        <button onClick={() => setDark((d) => !d)}>{dark ? "☀️" : "🌙"}</button>
        <button onClick={() => setShowNotifPanel((p) => !p)}>🔔</button>
        <button className="primary-btn" onClick={() => navigate("/add")}>
          + Add
        </button>
      </div>
    </header>
  );
}
