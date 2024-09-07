"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import Link from 'next/link';
import { useCoinInfo } from "../hooks/useCoinData";
import { useMemo } from 'react';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Chart = dynamic(() => import("./chart/page"), { ssr: false });
//const Price = dynamic(() => import("./price/page"), { ssr: false });

export default function CoinPage() {
  const params = useParams();
  const router = useRouter();
  const coinId = params.coinId as string;
  const { data, isLoading, error } = useCoinInfo(coinId);

  const description = useMemo(() => {
    if (!data?.description.en) return 'No description available';
    const tempElement = document.createElement("div");
    tempElement.innerHTML = data.description.en;
    return tempElement.textContent || tempElement.innerText || "";
  }, [data]);

  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'chart' | 'price' | null>(null);

  // Update the active tab based on the current path
  useEffect(() => {
    if (pathname.endsWith("/chart")) {
      setActiveTab('chart');
    } else if (pathname.endsWith("/price")) {
      setActiveTab('price');
    }
  }, [pathname]);

  const handleTabClick = (tab: 'chart' | 'price') => {
    const newUrl = `/${coinId}/${tab}`;
    setActiveTab(tab);
    router.push(newUrl);
  };

  if (isLoading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5">Error loading coin details: {error.message}</p>;

  return (
    <div className="max-w-screen-md mx-auto px-5">
      <header className="h-20 flex justify-center items-center relative">
        <h1 className="text-4xl text-blue-500">
          {data?.name ?? "Loading..."}
        </h1>
        <Link href="/"
          className="absolute left-0 text-blue-500 hover:text-blue-700 transition">
          &larr; Back
        </Link>
      </header>

      {isLoading ? (
        <p className="text-center py-5">Loading...</p>
      ) : (
        <>
          <div className="flex justify-between bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">Rank:</span>
              <span>{data?.market_cap_rank}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">Symbol:</span>
              <span>${data?.symbol}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">Price:</span>
              <span>${data?.market_data.current_price.usd.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-5 bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
            <p className="text-sm text-justify leading-relaxed">{description}</p>
          </div>

          <div className="flex justify-between bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow-md mt-5">
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">Total Supply:</span>
              <span>{data?.market_data.total_supply ?? 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">Max Supply:</span>
              <span>{data?.market_data.max_supply ?? 'N/A'}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <button
              onClick={() => handleTabClick('chart')}
              className={`text-center py-3 rounded-lg shadow-md transition ${activeTab === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
            >
              Chart
            </button>
            <button
              onClick={() => handleTabClick('price')}
              className={`text-center py-3 rounded-lg shadow-md transition ${activeTab === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
            >
              Price
            </button>
          </div>

          <div className="mt-5">
            {activeTab === 'chart' && <Chart />}
            {/*{showPrice && <Price coinId={coinId} />}*/}
          </div>
        </>
      )}
    </div>
  );
}
