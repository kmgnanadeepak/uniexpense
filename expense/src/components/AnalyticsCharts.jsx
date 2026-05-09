import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../utils/formatters";

export function AnalyticsCharts({ monthlyData, categoryData }) {
  const noCategoryData = !categoryData.length;
  const noMonthlyData = !monthlyData.length;

  return (
    <div className="grid-2">
      <div className="card">
        <h3>Expense Breakdown</h3>
        {noCategoryData ? (
          <div>No analytics data available yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" innerRadius={50} outerRadius={80}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="card">
        <h3>Savings Trend</h3>
        {noMonthlyData ? (
          <div>No trend data available yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Line dataKey="savings" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
