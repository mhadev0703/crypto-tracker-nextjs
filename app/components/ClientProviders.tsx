'use client';

import React from 'react';
import { FavoritesProvider } from '@/app/context/FavoritesContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  );
}
