import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/transactions.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <RouterProvider router={routes} />
      </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>
);
