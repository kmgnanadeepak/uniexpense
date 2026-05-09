import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { AddTransactionPage } from "./pages/AddTransactionPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { BudgetPage } from "./pages/BudgetPage";
import { TelegramPage } from "./pages/TelegramPage";
import { ProfilePage } from "./pages/ProfilePage";

export const routes = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <App />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/transactions", element: <TransactionsPage /> },
          { path: "/add", element: <AddTransactionPage /> },
          { path: "/analytics", element: <AnalyticsPage /> },
          { path: "/budget", element: <BudgetPage /> },
          { path: "/telegram", element: <TelegramPage /> },
          { path: "/profile", element: <ProfilePage /> }
        ]
      }
    ]
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> }
]);
