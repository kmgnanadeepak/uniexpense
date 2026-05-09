import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/select-role'), 600);
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-40 blur-3xl bg-[radial-gradient(circle_at_center,#3db56e_0%,transparent_60%)] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-40 blur-3xl bg-[radial-gradient(circle_at_center,#7ed957_0%,transparent_55%)] animate-[pulse_7s_ease-in-out_infinite]" />
      </div>

      <div className="ks-glass-card px-10 py-12 max-w-xl w-full relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,#7ed957,transparent_55%),radial-gradient(circle_at_70%_80%,#2d7a4f,transparent_55%)] flex items-center justify-center shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
            <div className="w-14 h-14 rounded-[22px] border border-[rgba(240,235,224,0.4)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(240,235,224,0.16),transparent_55%)]" />
              <div className="w-10 h-10 rounded-full border border-[rgba(126,217,87,0.45)] bg-[conic-gradient(from_210deg_at_50%_50%,#7ed957_0deg,#3db56e_120deg,#1a3d2b_260deg,#7ed957_360deg)] flex items-center justify-center animate-[spin_12s_linear_infinite]">
                <div className="w-7 h-7 rounded-full bg-[radial-gradient(circle_at_30%_20%,#f0ebe0,transparent_60%)] flex items-center justify-center">
                  <span className="text-[22px]" aria-hidden="true">
                    🌱
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 blur-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(126,217,87,0.6),transparent_65%)] animate-pulse" />
        </div>

        <div className="mb-4">
          <h1 className="font-display text-3xl md:text-4xl tracking-tight text-mist mb-2">
            Kisan<span className="text-lime">Setu</span>
          </h1>
          <p className="text-[13px] tracking-[0.18em] uppercase text-[rgba(232,245,238,0.6)]">
            The Farmer&apos;s Bridge — Connecting Farmers, Merchants &amp; Customers
          </p>
        </div>

        <div className="mt-6 w-full">
          <div className="h-1.5 w-full rounded-full bg-[rgba(26,61,43,0.6)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#2d7a4f,#3db56e,#7ed957)] shadow-[0_0_18px_rgba(61,181,110,0.75)] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] text-[rgba(232,245,238,0.6)]">
            <span>Preparing your fields of data...</span>
            <div className="ks-typing-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

