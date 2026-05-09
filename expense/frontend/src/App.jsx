import { Outlet } from "react-router-dom";
import { useExpense } from "./context/ExpenseContext";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Notifications } from "./components/Notifications";

export default function App() {
  const { dark, showNotifPanel, setShowNotifPanel } = useExpense();

  return (
    <div className={`app-shell ${dark ? "theme-dark" : "theme-light"}`}>
      <Sidebar />
      <div className="main-shell">
        <Navbar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      {showNotifPanel ? (
        <Notifications onClose={() => setShowNotifPanel(false)} />
      ) : null}
    </div>
  );
}
