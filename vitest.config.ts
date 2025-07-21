import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/__tests__/**', '**/*.d.ts'],
      lines: 85,
      statements: 85,
      functions: 85,
      branches: 85,
    },
  },
});
