'use client';

import { useFavorites } from '@/app/context/FavoritesContext';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStar } from '@heroicons/react/24/outline';

export default function FavoriteButton({ coinId }: { coinId: string }) {
  const { favorites, addFavorite, removeFavorite, loading } = useFavorites();
  const isFavorite = favorites.includes(coinId);

  if (loading) return null;

  return (
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2"
      onClick={e => {
        e.preventDefault();
        isFavorite ? removeFavorite(coinId) : addFavorite(coinId);
      }}
    >
      {isFavorite ? (
        <SolidStar className="w-6 h-6 text-yellow-400" />
      ) : (
        <OutlineStar className="w-6 h-6 text-gray-400" />
      )}
    </button>
  );
} 