export function Notifications({ onClose }) {
  const notifs = [
    { title: "Budget Alert", msg: "Shopping budget 93% used" },
    { title: "Telegram Sync", msg: "3 new transactions synced" },
    { title: "Savings Goal", msg: "May savings on track" }
  ];

  return (
    <div className="notif-panel">
      <div className="notif-head">
        <strong>Notifications</strong>
        <button onClick={onClose}>×</button>
      </div>
      {notifs.map((n) => (
        <div key={n.title} className="notif-item">
          <div>{n.title}</div>
          <small>{n.msg}</small>
        </div>
      ))}
    </div>
  );
}
