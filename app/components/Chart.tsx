import { useCoinHistory } from "../hooks/useCoinData";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart({ coinId }: { coinId: string }) {
  const { data, isLoading, error } = useCoinHistory(coinId);

  const processedData = useMemo(() => {
    return data ? data.map((entry) => ({
      x: new Date(entry[0]),
      y: entry[4],
    })) : [];
  }, [data]);

  if (isLoading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5">Error loading coin history: {error.message}</p>;
  

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: processedData,
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: { show: true },
              type: "datetime",
              categories: data?.map((price) => price[0]),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </div>
  );
}