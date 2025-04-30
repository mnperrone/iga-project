import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  publicDir: 'public',
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
});