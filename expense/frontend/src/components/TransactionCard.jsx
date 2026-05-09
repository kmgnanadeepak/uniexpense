import { formatCurrency } from "../utils/formatters";

export function TransactionCard({ tx }) {
  const icon = tx.type === "credit" ? "💰" : tx.source === "telegram" ? "✈️" : "💳";
  const dateText = tx.timestamp ? new Date(tx.timestamp).toLocaleDateString("en-IN") : "-";
  return (
    <div className="tx-row">
      <div className="tx-icon">{icon}</div>
      <div className="tx-main">
        <div className="tx-note">{tx.note || tx.category}</div>
        <small>
          {tx.category} • {dateText}
        </small>
      </div>
      <strong className={tx.type === "credit" ? "text-green" : "text-red"}>
        {tx.type === "credit" ? "+" : "-"}
        {formatCurrency(tx.amount)}
      </strong>
    </div>
  );
}
