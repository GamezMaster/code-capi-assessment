'use client';

import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { useFavorites } from '@/context/FavoritesContext';
import StatusBadge from '@/components/StatusBadge';
import FavoriteButton from '@/components/FavoriteButton';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="max-w-5xl mx-auto p-6 flex-1 w-full">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Mijn Favorieten ({favorites.length})
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/20">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            Je hebt nog geen favorieten opgeslagen.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition inline-block"
          >
            Karakters zoeken
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((char) => (
            <Link
              key={char.id}
              href={`/character/${char.id}`}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 group relative flex flex-col"
            >
              <div className="absolute top-3 right-3 z-10">
                <FavoriteButton character={char} />
              </div>
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-200"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {char.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {char.species}
                  </p>
                </div>
                <div>
                  <StatusBadge status={char.status} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}