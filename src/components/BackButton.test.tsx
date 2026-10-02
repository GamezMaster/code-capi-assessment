import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import BackButton from './BackButton';

// Mock Next.js useRouter
const mockBack = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

test('Call router.back() when clicking the button', () => {
  render(<BackButton />);
  
  const button = screen.getByRole('button', { name: /terug naar overzicht/i });
  expect(button).toBeDefined();

  fireEvent.click(button);
  expect(mockBack).toHaveBeenCalledTimes(1);
});