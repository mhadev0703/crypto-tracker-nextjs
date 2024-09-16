import { useCoinInfo } from "../hooks/useCoinData";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";

const getTrendIcon = (value: number) => {
  return value < 0 ? (
    <ArrowTrendingDownIcon className="w-14 h-14 text-red-500" />
  ) : (
    <ArrowTrendingUpIcon className="w-14 h-14 text-green-500" />
  );
};

const renderTrendBox = (period: string, value: number) => {
  const isDecreasing = value < 0;
  return (
    <div key={period} className="flex justify-between items-end p-4 border border-gray-300 rounded-lg shadow-md">
      {getTrendIcon(value)}
      <div className="flex flex-col text-right">
        <span className="text-sm text-gray-700">{period}</span>
        <span className={`text-2xl font-semibold ${isDecreasing ? "text-red-500" : "text-green-500"}`}>
          {value.toFixed(3)}%
        </span>
      </div>
    </div>
  );
};

export default function Price({ coinId }: { coinId: string }) {
  const { data, isLoading, error } = useCoinInfo(coinId);

  if (isLoading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5">Error loading price trend: {error.message}</p>;
  if (!data) return <p className="text-center py-5">No data available</p>;

  const {
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h,
    price_change_percentage_7d,
    price_change_percentage_14d,
    price_change_percentage_30d,
    price_change_percentage_1y,
  } = data.market_data;

  const trendData = [
    { period: "1 hour", value: price_change_percentage_1h_in_currency?.usd },
    { period: "24 hours", value: price_change_percentage_24h },
    { period: "7 days", value: price_change_percentage_7d },
    { period: "14 days", value: price_change_percentage_14d },
    { period: "30 days", value: price_change_percentage_30d },
    { period: "1 year", value: price_change_percentage_1y },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {trendData.map(({ period, value }) => {
        return value !== undefined ? renderTrendBox(period, value) : null;
      })}
    </div>
  );
}