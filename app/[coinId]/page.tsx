"use client";

import { useParams } from "next/navigation";
import { useCoinInfo } from "@/app/hooks/useCoinData";
import { useMemo } from 'react';

export default function CoinPage() {
  const params = useParams();
  const coinId = params.coinId as string;
  const { data, isLoading, error } = useCoinInfo(coinId);

  const description = useMemo(() => {
    if (!data?.description.en) return 'No description available';
    const tempElement = document.createElement("div");
    tempElement.innerHTML = data.description.en;
    return tempElement.textContent || tempElement.innerText || "";
  }, [data]);

  if (isLoading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5">Error loading coin details: {error.message}</p>;

  return (
    <div>
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
    </div>
  );
}
