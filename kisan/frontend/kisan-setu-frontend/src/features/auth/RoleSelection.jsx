import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../lib/firebase.js';
import { useAuth } from './AuthContext.jsx';

const roles = [
  { key: 'farmer', label: 'Farmer', description: 'AI crop health, marketplace, calendar & advisory' },
  { key: 'customer', label: 'Customer', description: 'Discover fresh produce and agri-products' },
  { key: 'merchant', label: 'Merchant', description: 'Manage inventory, orders & sales analytics' },
  { key: 'logistics', label: 'Logistics Provider', description: 'Coordinate field pickups & deliveries' },
];

const RoleSelection = () => {
  const navigate = useNavigate();
  const { firebaseUser, role } = useAuth();

  const ensureAuthAndBootstrap = async (roleKey) => {
    let user = firebaseUser;

    if (!user) {
      // Simple email/password demo identity; in production, replace with full auth UI.
      const email = `demo+${roleKey}@kisansetu.local`;
      const password = 'kisan-demo-pass';
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        user = cred.user;
      } catch {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        user = cred.user;
      }
    }

    const token = await user.getIdToken();
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/bootstrap`,
      {
        role: roleKey,
        profile: {},
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    navigate(`/${roleKey}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="ks-glass-card max-w-5xl w-full grid md:grid-cols-[260px,1fr] gap-10 p-10 relative">
        <div className="absolute -top-16 -right-10 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(61,181,110,0.35),transparent_65%)] opacity-70 blur-3xl pointer-events-none" />

        <aside className="border-r border-[rgba(61,181,110,0.25)] pr-6">
          <p className="text-[11px] tracking-[0.16em] uppercase text-[rgba(232,245,238,0.58)] mb-3">
            Welcome to
          </p>
          <h1 className="font-display text-3xl text-mist mb-3">KisanSetu Platform</h1>
          <p className="text-[rgba(232,245,238,0.7)] text-sm mb-6">
            Choose how you participate in the agricultural ecosystem. Each role unlocks a tailored workspace
            and intelligence tools.
          </p>
          <ul className="text-[11px] space-y-1 text-[rgba(232,245,238,0.5)]">
            <li>• AI disease detection & prescriptions</li>
            <li>• Farmer–Merchant–Customer marketplace</li>
            <li>• Logistics & fulfillment orchestration</li>
          </ul>
        </aside>

        <main className="grid sm:grid-cols-2 gap-5">
          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              onClick={() => ensureAuthAndBootstrap(role.key)}
              className="text-left relative group ks-glass-card p-4 bg-[rgba(15,36,25,0.5)] border-[rgba(61,181,110,0.18)] hover:border-[rgba(126,217,87,0.55)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_0%_0%,rgba(126,217,87,0.25),transparent_55%)]" />
              <span className="inline-flex items-center text-[11px] uppercase tracking-[0.16em] text-[rgba(232,245,238,0.6)] mb-2">
                {role.label}
              </span>
              <p className="text-sm text-[rgba(232,245,238,0.82)] mb-4">{role.description}</p>
              <span className="ks-primary-btn inline-flex items-center justify-center px-4 py-2 text-[13px]">
                Continue as {role.label}
              </span>
            </button>
          ))}
        </main>
      </div>
    </div>
  );
};

export default RoleSelection;

