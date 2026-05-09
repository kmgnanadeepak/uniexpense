import { useState } from "react";
import { CATEGORY_OPTIONS, PAYMENT_MODES } from "../utils/constants";

export function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState({
    amount: "",
    type: "debit",
    category: "Food",
    note: "",
    date: new Date().toISOString().split("T")[0],
    mode: "UPI"
  });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm((prev) => ({ ...prev, amount: "", note: "" }));
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Add Transaction</h3>
      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, category: CATEGORY_OPTIONS[e.target.value][0] })}>
        <option value="debit">Expense / Debit</option>
        <option value="credit">Income / Credit</option>
      </select>
      <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount" />
      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
        {CATEGORY_OPTIONS[form.type].map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
        {PAYMENT_MODES.map((mode) => (
          <option key={mode}>{mode}</option>
        ))}
      </select>
      <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Note" />
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <button className="primary-btn" type="submit">
        Add
      </button>
    </form>
  );
}
