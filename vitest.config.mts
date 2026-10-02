import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      // Wijs '@' naar de 'src' map in plaats van de root
      '@': path.resolve(__dirname, './src'),
    },
  },
});