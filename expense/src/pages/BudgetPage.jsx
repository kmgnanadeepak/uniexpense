import { BudgetPlanner } from "../components/BudgetPlanner";
import { useExpense } from "../context/ExpenseContext";

export function BudgetPage() {
  const { budgets, loading, error } = useExpense();
  return (
    <section>
      <h1>Budget Planner</h1>
      {loading ? <div className="card">Loading budgets...</div> : null}
      {error ? <div className="card text-red">{error}</div> : null}
      <BudgetPlanner budgets={budgets} />
    </section>
  );
}
