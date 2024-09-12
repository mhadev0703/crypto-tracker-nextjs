"use client";

import Chart from "../../components/Chart";
import { useParams } from "next/navigation";

export default function ChartPage() {
  const params = useParams();
  const coinId = params.coinId as string;

  return <Chart coinId={coinId} />;
}
