import { NavLink } from "react-router-dom";
import { PAGES } from "../utils/constants";
import { useExpense } from "../context/ExpenseContext";
import { useAuth } from "../context/AuthContext";

export function Sidebar() {
  const { sidebarOpen } = useExpense();
  const { user } = useAuth();

  return (
    <aside className={`sidebar ${sidebarOpen ? "expanded" : "collapsed"}`}>
      <div className="brand">
        <div className="logo">₹</div>
        {sidebarOpen ? (
          <div>
            <div className="brand-title">FinTrack</div>
            <div className="brand-subtitle">Smart Expense Manager</div>
          </div>
        ) : null}
      </div>
      <nav className="nav-list">
        {PAGES.map((item) => (
          <NavLink key={item.path} to={item.path} className="nav-item">
            <span>{item.icon}</span>
            {sidebarOpen ? <span>{item.label}</span> : null}
          </NavLink>
        ))}
      </nav>
      {sidebarOpen ? (
        <div className="sidebar-user">
          <div className="avatar">D</div>
          <div>
            <div>{user?.name || "User"}</div>
            <small>Pro Account</small>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
