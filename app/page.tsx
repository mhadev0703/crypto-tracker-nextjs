"use client";

import { useCoins } from "./hooks/useCoinData";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { data, isLoading, error } = useCoins();

  if (isLoading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5">Error loading coins: {error.message}</p>;

  return (
    <div className="max-w-screen-md mx-auto px-5">
      <header className="h-20 flex justify-center items-center">
        <h1 className="text-4xl text-center text-blue-400">CryptoTracker</h1>
      </header>

      <ul className="mt-4 list-none">
        {data?.map((coin) => (
          <li key={coin.id} className="bg-white text-black rounded-lg mb-3 shadow-md hover:bg-gray-100 transition">
            <Link href={`/${coin.id}`} className="flex items-center p-5">
              <Image
                src={coin.image}
                alt={coin.name}
                width={36} 
                height={36} 
                className="mr-4"
              />
              {coin.name} &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
