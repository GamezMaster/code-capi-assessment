'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { Character } from '@/lib/graphql';

export default function FavoriteButton({ character }: { character: Character }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault(); // Voorkom dat de Link op het kaartje geopend wordt
        e.stopPropagation();
        toggleFavorite(character);
      }}
      aria-label={favorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
      className="w-[35px] h-[35px] pt-[3px] rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur hover:scale-110 transition cursor-pointer shadow-md border border-gray-200 dark:border-gray-700"
    >
      <span className="text-lg leading-none">{favorite ? '❤️' : '🤍'}</span>
    </button>
  );
}