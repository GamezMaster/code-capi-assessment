'use client';

import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition">
          Rick & Morty characters
        </Link>
        <Link
          href="/favorites"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          <span>❤️ Favorieten</span>
          {favorites.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}