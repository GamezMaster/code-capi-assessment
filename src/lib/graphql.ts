export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export class RateLimitError extends Error {
  constructor(message = 'Te veel verzoeken verstuurd. Wacht even en probeer het opnieuw.') {
    super(message);
    this.name = 'RateLimitError';
  }
}

export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  const res = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (res.status === 429) {
    throw new RateLimitError('Je hebt het maximale aantal verzoeken bereikt. Wacht een minuutje en probeer het opnieuw.');
  }

  if (!res.ok) {
    const errorText = await res.text();
    if (errorText.toLowerCase().includes('rate limit') || errorText.toLowerCase().includes('too many requests')) {
      throw new RateLimitError();
    }
    throw new Error(`API HTTP Fout [${res.status}]: ${errorText.slice(0, 100)}`);
  }

  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const htmlText = await res.text();
    if (htmlText.toLowerCase().includes('rate limit') || htmlText.includes('429')) {
      throw new RateLimitError('De API is tijdelijk geblokkeerd vanwege te veel verzoeken.');
    }
    throw new Error('Verwachte JSON, maar kreeg HTML terug.');
  }

  const { data, errors } = await res.json();
  if (errors) {
    throw new Error(errors[0]?.message || 'GraphQL Fetch Error');
  }
  return data;
}