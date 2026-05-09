import { ExpenseForm } from "../components/ExpenseForm";
import { useExpense } from "../context/ExpenseContext";
import { useState } from "react";

export function AddTransactionPage() {
  const { addTransaction, addSuccess } = useExpense();
  const [error, setError] = useState("");

  const handleSubmit = async (payload) => {
    try {
      setError("");
      await addTransaction(payload);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to add transaction.");
    }
  };

  return (
    <section>
      <h1>Add Transaction</h1>
      {addSuccess ? <div className="success">Transaction added successfully.</div> : null}
      {error ? <div className="card text-red">{error}</div> : null}
      <ExpenseForm onSubmit={handleSubmit} />
    </section>
  );
}
