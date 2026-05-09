import { DashboardCards } from "../components/DashboardCards";
import { TransactionList } from "../components/TransactionList";
import { useExpense } from "../context/ExpenseContext";

export function DashboardPage() {
  const { totalIncome, totalExpense, balance, transactions, loading, error, fetchExpenseData } = useExpense();

  return (
    <section>
      <h1>Dashboard</h1>
      {loading ? <div className="card">Loading dashboard...</div> : null}
      {error ? (
        <div className="card">
          <div className="text-red">{error}</div>
          <button className="primary-btn" onClick={fetchExpenseData}>
            Retry
          </button>
        </div>
      ) : null}
      <DashboardCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
      <h3>Recent Transactions</h3>
      <TransactionList transactions={transactions.slice(0, 5)} />
    </section>
  );
}
