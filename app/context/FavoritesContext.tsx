'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type FavoritesContextType = {
  favorites: string[];
  addFavorite: (coinId: string) => void;
  removeFavorite: (coinId: string) => void;
  loading: boolean;
};

// Create a context for the favorites
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  loading: true,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from the server
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    fetch('/api/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setFavorites(data.map((fav: any) => fav.coinId)))
      .finally(() => setLoading(false));
  }, []);

  // Add a favorite
  const addFavorite = async (coinId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login is required.');
      return;
    }
    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ coinId }),
    });
    setFavorites(favs => [...favs, coinId]);
  };

  // Remove a favorite  
  const removeFavorite = async (coinId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login is required.');
      return;
    }
    await fetch(`/api/favorites/${coinId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavorites(favs => favs.filter(id => id !== coinId));
  };

  // Provide the favorites context to the children
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to use the favorites context
export function useFavorites() {
  return useContext(FavoritesContext);
} 