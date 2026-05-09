export const COLORS = {
  green: "#10b981",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  amber: "#f59e0b"
};

export const PAGES = [
  { path: "/dashboard", label: "Dashboard", icon: "⊞" },
  { path: "/transactions", label: "Transactions", icon: "↕" },
  { path: "/add", label: "Add Transaction", icon: "+" },
  { path: "/analytics", label: "Analytics", icon: "◈" },
  { path: "/telegram", label: "Telegram Bot", icon: "✈" },
  { path: "/budget", label: "Budget Planner", icon: "◎" },
  { path: "/profile", label: "Profile", icon: "◉" }
];

export const CATEGORY_OPTIONS = {
  debit: ["Food", "Rent", "Fuel", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", "Travel", "Other"],
  credit: ["Salary", "Freelance", "Refund", "Investment", "Gift", "Other"]
};

export const PAYMENT_MODES = ["UPI", "Cash", "Card", "Bank Transfer", "Wallet"];
