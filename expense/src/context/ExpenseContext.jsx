import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { filterTransactions, sortTransactions } from "../utils/helpers";
import { transactionService } from "../services/transactionService";
import { analyticsService } from "../services/analyticsService";
import { budgetService } from "../services/budgetService";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [budgets, setBudgets] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    savings: 0
  });
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);

  const totalIncome = useMemo(
    () => Number(dashboardSummary.totalIncome || 0),
    [dashboardSummary]
  );
  const totalExpense = useMemo(
    () => Number(dashboardSummary.totalExpense || 0),
    [dashboardSummary]
  );
  const balance = totalIncome - totalExpense;

  const filteredTransactions = useMemo(() => {
    const filtered = filterTransactions(transactions, { search, filterType });
    return sortTransactions(filtered, sortBy);
  }, [transactions, search, filterType, sortBy]);

  const fetchExpenseData = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError("");
      const [txPage, summary, categoryMap, savingsMap, budgetStatus] = await Promise.all([
        transactionService.list({ page: 0, size: 100, sortBy: "timestamp", direction: "DESC" }),
        analyticsService.dashboardSummary(),
        analyticsService.categoryBreakdown(),
        analyticsService.savingsTrend(),
        budgetService.status()
      ]);

      const txContent = Array.isArray(txPage?.content) ? txPage.content : [];
      const normalizedTransactions = txContent.map((tx) => ({
        ...tx,
        amount: Number(tx.amount || 0),
        type: (tx.type || "").toLowerCase(),
        source: (tx.source || "").toLowerCase(),
        timestamp: tx.timestamp
      }));
      setTransactions(normalizedTransactions);

      setDashboardSummary({
        totalIncome: Number(summary?.totalIncome || 0),
        totalExpense: Number(summary?.totalExpense || 0),
        savings: Number(summary?.savings || 0)
      });

      const categoryEntries = Object.entries(categoryMap || {});
      setCategoryData(
        categoryEntries.map(([name, value], idx) => ({
          name,
          value: Number(value || 0),
          color: ["#ef4444", "#f59e0b", "#8b5cf6", "#3b82f6", "#10b981", "#14b8a6"][idx % 6]
        }))
      );

      setMonthlyData(
        Object.entries(savingsMap || {}).map(([month, savings]) => ({
          month: month.slice(5),
          savings: Number(savings || 0)
        }))
      );

      setBudgets(
        Array.isArray(budgetStatus)
          ? budgetStatus.map((b) => ({
              category: b.category,
              monthlyLimit: Number(b.monthlyLimit || 0),
              spentAmount: Number(b.spentAmount || 0),
              remainingAmount: Number(b.remainingAmount || 0)
            }))
          : []
      );
    } catch (err) {
      setError(err?.response?.data?.error || "Unable to load dashboard data.");
      setTransactions([]);
      setDashboardSummary({ totalIncome: 0, totalExpense: 0, savings: 0 });
      setCategoryData([]);
      setMonthlyData([]);
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchExpenseData();
  }, [fetchExpenseData]);

  const addTransaction = async (payload) => {
    if (!payload.amount || Number.isNaN(Number(payload.amount))) return false;
    const request = {
      amount: Number(payload.amount),
      type: payload.type.toUpperCase(),
      category: payload.category,
      note: payload.note || payload.category,
      paymentMode: payload.mode,
      source: "MANUAL",
      timestamp: payload.date ? `${payload.date}T00:00:00` : undefined
    };
    await transactionService.create(request);
    await fetchExpenseData();
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 2000);
    return true;
  };

  const value = {
    dark,
    setDark,
    sidebarOpen,
    setSidebarOpen,
    showNotifPanel,
    setShowNotifPanel,
    transactions,
    setTransactions,
    filteredTransactions,
    search,
    setSearch,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    budgets,
    loading,
    error,
    addSuccess,
    addTransaction,
    fetchExpenseData,
    totalIncome,
    totalExpense,
    balance,
    monthlyData,
    categoryData
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpense must be used inside ExpenseProvider");
  return context;
}
