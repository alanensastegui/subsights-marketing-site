import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  resolve: { alias: { 'server-only': new URL('./node_modules/next/dist/compiled/server-only/empty.js', import.meta.url).pathname } },
  plugins: [tsconfigPaths(), react()],
  test: {
    // Bound concurrent DOM workers on release hosts.
    fileParallelism: false,
    environment: 'node',
    environmentMatchGlobs: [
      ['**/*.dom.test.ts', 'jsdom'],
      ['**/*.dom.test.tsx', 'jsdom'],
    ],
  },
})
