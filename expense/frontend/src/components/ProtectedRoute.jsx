import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();
  if (authLoading) return <div style={{ padding: "24px" }}>Authenticating...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
