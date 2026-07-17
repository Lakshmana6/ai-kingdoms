import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { StatCard } from '../components/StatCard';

export function AdminPage() {
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    api('/admin/dashboard').then(setDashboard).catch(console.error);
    const id = setInterval(() => {
      api('/admin/dashboard').then(setDashboard).catch(console.error);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-200">Administration Dashboard</h2>
        <p className="text-sm text-slate-400">Observe live simulation, economy, and world activity.</p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Tick" value={dashboard?.simulation?.tick ?? 0} />
        <StatCard label="AI Citizens" value={dashboard?.citizens ?? 0} />
        <StatCard label="Guilds" value={dashboard?.guilds?.length ?? 0} />
        <StatCard label="Speed" value={dashboard?.simulation?.speed ?? 1} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="mb-3 text-lg font-semibold text-blue-200">Settlements</h3>
          <div className="space-y-2 text-sm text-slate-300">
            {dashboard?.settlements?.map((settlement: any) => (
              <div className="rounded bg-slate-800 px-3 py-2" key={settlement.id}>
                <div className="font-medium text-slate-100">{settlement.name}</div>
                <div>Population: {settlement.population} · Security: {settlement.security} · Economy: {settlement.economy}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="mb-3 text-lg font-semibold text-blue-200">Recent Events</h3>
          <div className="space-y-2 text-sm text-slate-300">
            {dashboard?.events?.slice(0, 12)?.map((event: any) => (
              <div className="rounded bg-slate-800 px-3 py-2" key={event.id}>
                <div className="font-medium text-slate-100">{event.title}</div>
                <div>{event.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="mb-3 text-lg font-semibold text-blue-200">Market Listings</h3>
          <div className="space-y-2 text-sm text-slate-300">
            {dashboard?.listings?.slice(0, 12)?.map((listing: any) => (
              <div className="rounded bg-slate-800 px-3 py-2" key={listing.id}>
                <div>{listing.sellerName} selling {listing.itemTemplateId}</div>
                <div>Qty: {listing.quantity} · Price: {listing.pricePerUnit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="mb-3 text-lg font-semibold text-blue-200">Economy Snapshots</h3>
          <div className="space-y-2 text-sm text-slate-300">
            {dashboard?.snapshots?.slice(0, 12)?.map((snapshot: any) => (
              <div className="rounded bg-slate-800 px-3 py-2" key={snapshot.id}>
                <div>Tick {snapshot.tick}</div>
                <div>Total Wealth: {snapshot.totalWealth} · Gini: {snapshot.wealthGini.toFixed?.(2) ?? snapshot.wealthGini}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
