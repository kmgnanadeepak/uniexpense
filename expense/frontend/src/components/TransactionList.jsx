import { TransactionCard } from "./TransactionCard";

export function TransactionList({ transactions }) {
  if (!transactions.length) return <div className="card">No transactions found.</div>;
  return (
    <div className="card">
      {transactions.map((tx) => (
        <TransactionCard key={tx.id} tx={tx} />
      ))}
    </div>
  );
}
