import Link from 'next/link';
import BackButton from '@/components/BackButton';
import StatusBadge from '@/components/StatusBadge';
import { fetchGraphQL, Character, RateLimitError } from '@/lib/graphql';

const GET_CHARACTER = `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin { name }
      location { name }
    }
  }
`;

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  let char: Character | null = null;
  let rateLimitMessage: string | null = null;
  
  try {
    const data = await fetchGraphQL<{ character: Character }>(GET_CHARACTER, { id });
    char = data.character;
  } catch (e: unknown) {
    if (e instanceof RateLimitError || (e as Error)?.name === 'RateLimitError') {
      rateLimitMessage = (e as Error).message;
    }
  }

  if (rateLimitMessage) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <BackButton />
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-semibold">Te veel verzoeken verstuurd</p>
            <p className="text-sm mt-0.5">{rateLimitMessage}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!char) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p>Karakter niet gevonden.</p>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">Terug naar overzicht</Link>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <BackButton />
      <div className="border rounded-xl p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row gap-6">
        <img src={char.image} alt={char.name} className="w-48 h-48 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{char.name}</h1>
          <StatusBadge status={char.status} />

          <dl className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-1">
              <dt className="font-semibold pr-1">Soort:</dt>
              <dd>{char.species}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-1">
              <dt className="font-semibold pr-1">Geslacht:</dt>
              <dd>{char.gender}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-1">
              <dt className="font-semibold pr-1">Herkomst:</dt>
              <dd>{char.origin.name}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-1">
              <dt className="font-semibold pr-1">Huidige locatie:</dt>
              <dd>{char.location.name}</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}