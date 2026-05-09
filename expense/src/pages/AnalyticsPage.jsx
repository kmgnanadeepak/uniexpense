import { AnalyticsCharts } from "../components/AnalyticsCharts";
import { useExpense } from "../context/ExpenseContext";

export function AnalyticsPage() {
  const { monthlyData, categoryData, loading, error } = useExpense();
  return (
    <section>
      <h1>Analytics</h1>
      {loading ? <div className="card">Loading analytics...</div> : null}
      {error ? <div className="card text-red">{error}</div> : null}
      <AnalyticsCharts monthlyData={monthlyData} categoryData={categoryData} />
    </section>
  );
}
