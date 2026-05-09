import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function ProfileSettings() {
  const { user, logout } = useAuth();
  const [draft, setDraft] = useState(user);

  return (
    <div className="card">
      <h3>Profile Settings</h3>
      <input value={draft?.name || ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
      <input value={draft?.email || ""} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
      <input value={draft?.phone || ""} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
      <button className="danger-btn" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
}
