import { formatCurrency, formatPercent } from "../utils/formatters";

export function DashboardCards({ totalIncome, totalExpense, balance }) {
  const savingsRate = totalIncome ? ((balance / totalIncome) * 100).toFixed(1) : 0;
  const cards = [
    { label: "Monthly Income", value: formatCurrency(totalIncome), cls: "text-green" },
    { label: "Monthly Expense", value: formatCurrency(totalExpense), cls: "text-red" },
    { label: "Balance", value: formatCurrency(balance), cls: "text-blue" },
    { label: "Savings Rate", value: formatPercent(savingsRate), cls: "text-purple" }
  ];
  return (
    <div className="grid-cards">
      {cards.map((card) => (
        <div key={card.label} className="card">
          <small>{card.label}</small>
          <h3 className={card.cls}>{card.value}</h3>
        </div>
      ))}
    </div>
  );
}
