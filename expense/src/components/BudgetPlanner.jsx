import { formatCurrency } from "../utils/formatters";

export function BudgetPlanner({ budgets }) {
  if (!budgets.length) {
    return (
      <div className="card">
        <h3>Budget Planner</h3>
        <div>No budget data found. Set budgets to track spending.</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Budget Planner</h3>
      {budgets.map((b) => {
        const pct = b.monthlyLimit > 0 ? Math.min((b.spentAmount / b.monthlyLimit) * 100, 100) : 0;
        return (
          <div key={b.category} className="budget-item">
            <div className="budget-head">
              <span>{b.category}</span>
              <small>
                {formatCurrency(b.spentAmount)} / {formatCurrency(b.monthlyLimit)}
              </small>
            </div>
            <div className="progress">
              <div style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
