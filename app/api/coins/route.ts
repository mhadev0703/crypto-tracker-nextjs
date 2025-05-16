import { NextResponse } from 'next/server';

let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes (ms unit)

export async function GET() {
  const now = Date.now();

  // If the cache is valid, return the cached data
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  // If the cache is not valid, fetch the data from the external API
  console.log('[API] Fetching coins list from Coingecko');
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1');
  const data = await res.json();

  // Update the cache
  cachedData = data;
  lastFetchTime = now;

  return NextResponse.json(data);
}
