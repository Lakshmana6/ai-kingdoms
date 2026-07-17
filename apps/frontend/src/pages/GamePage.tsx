import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { GameCanvas } from '../components/GameCanvas';
import { StatCard } from '../components/StatCard';
import { useRealtimeStore } from '../state/realtimeStore';

export function GamePage() {
  const [world, setWorld] = useState<any>(null);
  const { tick, messages } = useRealtimeStore();

  useEffect(() => {
    api('/world').then(setWorld).catch(console.error);
  }, []);

  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[1fr_380px]">
      <section>
        <GameCanvas />
      </section>
      <aside className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="World Tick" value={tick} />
          <StatCard label="Settlements" value={world?.settlements?.length ?? 0} />
          <StatCard label="Buildings" value={world?.buildings?.length ?? 0} />
          <StatCard label="Monsters" value={world?.monsters?.length ?? 0} />
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="mb-3 text-lg font-semibold text-blue-200">Live Feed</h2>
          <div className="max-h-[360px] space-y-2 overflow-auto text-sm text-slate-300">
            {messages.slice(-20).map((message, i) => (
              <div className="rounded bg-slate-800 px-3 py-2" key={`${message.text}-${i}`}>
                <span className="text-blue-300">[{message.type}]</span> {message.text}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
