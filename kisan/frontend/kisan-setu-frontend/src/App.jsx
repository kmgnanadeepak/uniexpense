import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import SplashScreen from './features/shell/SplashScreen.jsx';
import RoleSelection from './features/auth/RoleSelection.jsx';
import FarmerDashboard from './features/farmer/FarmerDashboard.jsx';
import CustomerDashboard from './features/customer/CustomerDashboard.jsx';
import MerchantDashboard from './features/merchant/MerchantDashboard.jsx';
import LogisticsDashboard from './features/logistics/LogisticsDashboard.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/select-role" element={<RoleSelection />} />

        <Route element={<ProtectedRoute allowedRoles={['farmer']} />}>
          <Route path="/farmer" element={<FarmerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/customer" element={<CustomerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['merchant']} />}>
          <Route path="/merchant" element={<MerchantDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['logistics']} />}>
          <Route path="/logistics" element={<LogisticsDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
