import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    setupFiles: ['tests/setup.ts'],

    alias: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    }
  }
});