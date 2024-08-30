const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchWithCredentials(url: string) {
  const response = await fetch(url, {
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

// Fetch a list of coins with their market data
export async function fetchCoins() {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`;
  return fetchWithCredentials(url);
}

// Fetch data for an OHLC chart of a specific coin
export async function fetchCoinHistory(coinId: string) {
  const url = `${BASE_URL}/coins/${coinId}/ohlc?vs_currency=usd&days=14`;
  return fetchWithCredentials(url);
}

// Fetch detailed information about a specific coin
export async function fetchCoinInfo(coinId: string) {
  const url = `${BASE_URL}/coins/${coinId}?localization=false`;
  return fetchWithCredentials(url);
}

