'use client';

import { useEffect, useState } from 'react';

export default function RecentCoins({ className }: { className?: string }) {
  const [coins, setCoins] = useState<any[]>([]);

  // Get the recent coins from the server
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/history', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setCoins(data));
  }, []);

  // Remove duplicate coinId entries, keep only the most recent
  const uniqueCoins = coins.filter(
    (item, idx, arr) => arr.findIndex(c => c.coinId === item.coinId) === idx
  );
  if (!uniqueCoins.length) return null;

  return (
    <div className={`mb-8 ${className}`}>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-bold mb-2 text-blue-400">Recent Viewed Coins</h3>
        <ul>
          {uniqueCoins.slice(0, 5).map((item) => (
            <li key={item.coinId} className="mb-1">{item.coinId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
