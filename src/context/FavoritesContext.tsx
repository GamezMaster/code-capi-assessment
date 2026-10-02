'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Character } from '@/lib/graphql';

interface FavoritesContextType {
  favorites: Character[];
  toggleFavorite: (character: Character) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [mounted, setMounted] = useState(false);

  // 1. Laad opgeslagen favorieten uit localStorage op de client
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('rm_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Fout bij laden favorieten uit localStorage:', e);
      }
    }
  }, []);

  // 2. Werk localStorage bij als favorieten veranderen
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('rm_favorites', JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const toggleFavorite = (character: Character) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.id === character.id);
      return exists ? prev.filter((c) => c.id !== character.id) : [...prev, character];
    });
  };

  const isFavorite = (id: string) => favorites.some((c) => c.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites moet binnen een FavoritesProvider gebruikt worden');
  }
  return context;
}