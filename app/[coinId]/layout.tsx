"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("../components/Chart"), { ssr: false });
const Price = dynamic(() => import("../components/Price"), { ssr: false });

// TabButton component to optimize rendering
const TabButton = React.memo(({ tabName, activeTab, onClick }: { tabName: string; activeTab: string | null; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`text-center py-3 rounded-lg shadow-md transition ${activeTab === tabName ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
  >
    {tabName}
  </button>
));

export default function CoinLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const coinId = params.coinId as string;
  const tab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'chart' | 'price' | null>(null);

  useEffect(() => {
    if (tab === "chart") {
      setActiveTab('chart');
    } else if (tab === "price") {
      setActiveTab('price');
    } else {
      setActiveTab(null);
    }
  }, [tab]);

  const handleTabClick = (tab: 'chart' | 'price') => {
    router.push(`/${coinId}?tab=${tab}`, { scroll: false });
    setActiveTab(tab);
  };

  return (
    <div className="max-w-screen-md mx-auto px-5">
      <header className="h-20 flex justify-center items-center relative">
        <h1 className="text-4xl text-blue-500">{coinId}</h1>
        <Link href="/" className="absolute left-0 text-blue-500 hover:text-blue-700 transition">
          &larr; Back
        </Link>
      </header>

      <div className="mt-5">
        {children}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <TabButton
          tabName="chart"
          activeTab={activeTab}
          onClick={() => handleTabClick('chart')}
        />
        <TabButton
          tabName="price"
          activeTab={activeTab}
          onClick={() => handleTabClick('price')}
        />
      </div>

      <div className="mt-5">
        {activeTab === 'chart' && <div> <Chart coinId={coinId} /> </div>}
        {activeTab === 'price' && <div> <Price coinId={coinId} /> </div>}
      </div>
    </div>
  );
}
