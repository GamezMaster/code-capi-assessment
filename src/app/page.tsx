import Link from 'next/link';
import { fetchGraphQL, Character, RateLimitError } from '@/lib/graphql';
import StatusBadge from '@/components/StatusBadge';
import FavoriteButton from '@/components/FavoriteButton';

const GET_CHARACTERS = `
  query GetCharacters($name: String, $status: String) {
    characters(filter: { name: $name, status: $status }) {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

interface HomePageProps {
  searchParams: Promise<{ name?: string; status?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { name, status } = await searchParams;

  let characters: Character[] = [];
  let rateLimitMessage: string | null = null;
  let hasGeneralError = false;

  try {
    const data = await fetchGraphQL<{ characters: { results: Character[] } }>(
      GET_CHARACTERS,
      { name: name || '', status: status || '' }
    );
    characters = data.characters?.results || [];
  } catch (e: unknown) {
    if (e instanceof RateLimitError || (e as Error)?.name === 'RateLimitError') {
      rateLimitMessage = (e as Error).message;
    } else {
      hasGeneralError = true;
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <form 
        method="GET" 
        className="flex flex-col sm:flex-row gap-4 mb-8 p-4 rounded-lg border bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      >
        <input
          type="text"
          name="name"
          defaultValue={name || ''}
          placeholder="Zoek op naam..."
          className="border p-2 rounded flex-1 min-w-[200px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" 
        />
        <div className="grid w-full sm:w-[150px]"> 
          <select 
            name="status"
            defaultValue={status || ''}
            className="col-start-1 row-start-1 appearance-none border p-2 pr-8 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
          >
            <option value="">Alle statussen</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          
          <div className="pointer-events-none col-start-1 row-start-1 flex items-center justify-end pr-3 text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Zoeken
        </button>
      </form>

      {rateLimitMessage && (
        <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-semibold">API Rate Limit Bereikt</p>
            <p className="text-sm mt-0.5">{rateLimitMessage}</p>
          </div>
        </div>
      )}

      {hasGeneralError ? (
        <p className="text-gray-500 dark:text-gray-400">
          Er is een fout opgetreden bij het ophalen van de gegevens.
        </p>
      ) : !rateLimitMessage && characters.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Geen karakters gevonden die voldoen aan de zoekcriteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <Link
              key={char.id}
              href={`/character/${char.id}`}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 group relative"
            >
              <div className="absolute top-1 right-1 z-10">
                <FavoriteButton character={char} />
              </div>
              <img src={char.image} alt={char.name} className="w-full h-48 object-cover group-hover:scale-105 transition" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{char.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{char.species}</p>
                <StatusBadge status={char.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}