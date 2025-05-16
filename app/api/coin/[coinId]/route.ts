import { NextRequest, NextResponse } from 'next/server';

const cache: Record<string, { data: any; time: number }> = {};
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes (ms unit)

export async function GET(req: NextRequest, { params }: { params: { coinId: string } }) {
  const { coinId } = params;
  const now = Date.now();

  // If the cache is valid, return the cached data
  if (cache[coinId] && now - cache[coinId].time < CACHE_DURATION) {
    return NextResponse.json(cache[coinId].data);
  }

  // If the cache is not valid, fetch the data from the external API
  console.log(`[API] Fetching coin info for coin: ${coinId} from Coingecko`);
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`);
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch coin info' }, { status: 500 });
  }
  const data = await res.json();

  // Update the cache
  cache[coinId] = { data, time: now };
  return NextResponse.json(data);
}
