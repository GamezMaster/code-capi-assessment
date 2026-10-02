import { expect, test, vi, beforeEach } from 'vitest';
import { fetchGraphQL, RateLimitError } from './graphql';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('Show rate limit error on status 429', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    status: 429,
    ok: false,
  } as Response);

  await expect(
    fetchGraphQL('{ characters { results { id } } }')
  ).rejects.toThrow(RateLimitError);
});

test('return data on successful response', async () => {
  const mockData = { data: { characters: { results: [{ id: '1', name: 'Rick' }] } } };

  global.fetch = vi.fn().mockResolvedValue({
    status: 200,
    ok: true,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => mockData,
  } as Response);

  const result = await fetchGraphQL<{ characters: { results: Array<{ id: string; name: string }> } }>(
    '{ characters { results { id name } } }'
  );

  expect(result.characters.results[0].name).toBe('Rick');
});