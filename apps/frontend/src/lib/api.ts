export async function api(path: string, init?: RequestInit) {
  const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
  const response = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}
