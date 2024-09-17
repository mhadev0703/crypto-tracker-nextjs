// Interface for the data returned by fetchCoinsInfo()
export interface Coins {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  image: string;
  description: { en: string };
  market_data: {
      current_price: {
          usd: number;
      };
      max_supply: number;
      total_supply: number;
      circulating_supply: number;
  };
}

// Interface for the data returned by fetchCoinPrice()
export interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  description: { en: string };
  market_data: {
    current_price: {
        usd: number;
    };
    max_supply: number;
    total_supply: number;
    circulating_supply: number;
    price_change_percentage_1h_in_currency: {
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
  };
}

