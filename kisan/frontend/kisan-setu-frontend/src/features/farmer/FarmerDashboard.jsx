const FarmerDashboard = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[linear-gradient(180deg,rgba(26,61,43,0.95),rgba(15,36,25,0.98))] border-r border-[rgba(61,181,110,0.18)] p-6">
        <h2 className="font-display text-xl text-mist mb-6">Farmer Workspace</h2>
        <nav className="space-y-2 text-[13px] text-[rgba(232,245,238,0.7)]">
          <button type="button" className="w-full text-left px-3 py-2 rounded-lg bg-[rgba(61,181,110,0.24)]">
            Disease Intelligence
          </button>
          <button type="button" className="w-full text-left px-3 py-2 rounded-lg hover:bg-[rgba(26,61,43,0.7)]">
            Marketplace
          </button>
          <button type="button" className="w-full text-left px-3 py-2 rounded-lg hover:bg-[rgba(26,61,43,0.7)]">
            Farming Calendar
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 space-y-6">
        <header className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[rgba(232,245,238,0.6)]">
              Farmer Dashboard
            </p>
            <h1 className="font-display text-2xl text-mist mt-1">AI Disease & Advisory Hub</h1>
          </div>
        </header>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="ks-glass-card p-5 lg:col-span-2">
            <h3 className="text-sm text-mist font-medium mb-3">Disease Detection (Image / Symptoms)</h3>
            <p className="text-[13px] text-[rgba(232,245,238,0.65)] mb-4">
              Upload a crop leaf image or describe visible symptoms to get instant AI-powered diagnosis and
              treatment plan.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-[13px]">
              <button type="button" className="ks-primary-btn w-full py-2.5">
                Upload Leaf Image
              </button>
              <button
                type="button"
                className="w-full py-2.5 rounded-xl border border-[rgba(61,181,110,0.35)] text-[rgba(232,245,238,0.9)] hover:bg-[rgba(26,61,43,0.7)] transition-colors"
              >
                Describe Symptoms
              </button>
            </div>
          </div>

          <div className="ks-glass-card p-5">
            <h3 className="text-sm text-mist font-medium mb-2">Today&apos;s Field Snapshot</h3>
            <p className="text-[12px] text-[rgba(232,245,238,0.65)]">
              This will host quick stats, risk alerts and calendar tasks.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FarmerDashboard;

