"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchCoins, fetchCoinHistory, fetchCoinInfo } from '../lib/api';
import { REFRESH_INTERVAL } from '../lib/constants';
import { Coins, CoinInfo } from '../types/coin';

// Hook for fetching the list of coins
export function useCoins() {
  return useQuery<Coins[]>({
    queryKey: ['allcoins'],
    queryFn: fetchCoins,
    select: (data) => data.slice(0, 50),
    refetchInterval: REFRESH_INTERVAL, 
  });
}

// Hook for fetching historical data for a specific coin
export function useCoinHistory(coinId: string) {
  return useQuery<number[][]>({
    queryKey: ['ohlcv', coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: REFRESH_INTERVAL, 
  });
}

// Hook for fetching detailed information about a specific coin
export function useCoinInfo(coinId: string) {
  return useQuery<CoinInfo>({
    queryKey: ['coinInfo', coinId],
    queryFn: () => fetchCoinInfo(coinId),
    refetchInterval: REFRESH_INTERVAL, 
  });
}

