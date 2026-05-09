import { useExpense } from "../context/ExpenseContext";
import { TransactionList } from "../components/TransactionList";

export function TransactionsPage() {
  const { filteredTransactions, filterType, setFilterType, sortBy, setSortBy, loading, error } = useExpense();

  return (
    <section>
      <h1>Transactions</h1>
      {loading ? <div className="card">Loading transactions...</div> : null}
      {error ? <div className="card text-red">{error}</div> : null}
      <div className="filters">
        {["all", "credit", "debit"].map((f) => (
          <button key={f} onClick={() => setFilterType(f)} className={filterType === f ? "primary-btn" : ""}>
            {f}
          </button>
        ))}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>
      </div>
      <TransactionList transactions={filteredTransactions} />
    </section>
  );
}
