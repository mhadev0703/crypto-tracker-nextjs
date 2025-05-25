'use client';

import { useEffect, useState } from 'react';

export default function PopularCoins({ className }: { className?: string }) {
  const [coins, setCoins] = useState<any[]>([]);

  // Get the popular coins from the server
  useEffect(() => {
    fetch('/api/coins/popular')
      .then(res => res.ok ? res.json() : [])
      .then(data => setCoins(data));
  }, []);

  // Remove duplicate coinId entries, keep only the most popular
  const uniqueCoins = coins.filter(
    (item, idx, arr) => arr.findIndex(c => c.coinId === item.coinId) === idx
  );
  if (!uniqueCoins.length) return null;

  return (
    <div className={className}>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-bold mb-2 text-blue-400">Popular Coins (Top 5)</h3>
        <ul>
          {uniqueCoins.slice(0, 5).map((item) => (
            <li key={item.coinId} className="mb-1">{item.coinId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
