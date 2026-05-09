import { formatCurrency } from "../utils/formatters";

export function TelegramSync({ transactions }) {
  return (
    <div className="card">
      <h3>Telegram Bot</h3>
      <p>Connected: @FinTrackBot</p>
      {transactions.map((tx) => (
        <div key={tx.id} className="tx-row">
          <span>{tx.note}</span>
          <strong>{formatCurrency(tx.amount)}</strong>
        </div>
      ))}
    </div>
  );
}
