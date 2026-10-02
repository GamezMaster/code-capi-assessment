import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import StatusBadge from './StatusBadge';

test('render "Alive" with green styling', () => {
  render(<StatusBadge status="Alive" />);
  const badge = screen.getByText('Alive');
  expect(badge).toBeDefined();
  expect(badge.className).toContain('text-green-800');
});

test('render "Dead" with red styling', () => {
  render(<StatusBadge status="Dead" />);
  const badge = screen.getByText('Dead');
  expect(badge).toBeDefined();
  expect(badge.className).toContain('text-red-800');
});

test('render "Unknown" with gray styling', () => {
  render(<StatusBadge status="unknown" />);
  const badge = screen.getByText('unknown');
  expect(badge).toBeDefined();
  expect(badge.className).toContain('text-gray-800');
});