import { Route, Routes, NavLink } from 'react-router-dom';
import { GamePage } from './pages/GamePage';
import { AdminPage } from './pages/AdminPage';
import { useRealtime } from './state/useRealtime';

export function App() {
  useRealtime();

  return (
    <div className="min-h-screen text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-300">AI Kingdoms</h1>
            <p className="text-sm text-slate-400">Autonomous civilization MMORPG</p>
          </div>
          <nav className="flex gap-3 text-sm">
            <NavLink className="rounded bg-slate-800 px-3 py-2 hover:bg-slate-700" to="/">Game</NavLink>
            <NavLink className="rounded bg-slate-800 px-3 py-2 hover:bg-slate-700" to="/admin">Admin</NavLink>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}
