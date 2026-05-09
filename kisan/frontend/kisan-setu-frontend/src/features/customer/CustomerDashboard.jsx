const CustomerDashboard = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[linear-gradient(180deg,rgba(26,61,43,0.95),rgba(15,36,25,0.98))] border-r border-[rgba(61,181,110,0.18)] p-6">
        <h2 className="font-display text-xl text-mist mb-6">Customer</h2>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="font-display text-2xl text-mist mb-4">Marketplace</h1>
        <p className="text-[13px] text-[rgba(232,245,238,0.7)]">
          This dashboard will let customers browse products, manage carts and track orders.
        </p>
      </main>
    </div>
  );
};

export default CustomerDashboard;

