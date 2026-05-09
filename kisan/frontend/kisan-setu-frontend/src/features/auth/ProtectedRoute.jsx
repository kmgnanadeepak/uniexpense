import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  const { firebaseUser, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="ks-glass-card px-6 py-4">
          <p className="text-sm text-[rgba(232,245,238,0.8)]">Checking your farm pass...</p>
        </div>
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to="/select-role" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/select-role" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

