import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This repository is deployed as the drsekerak.github.io/Orgo1-Sub-Elim project site.
// A trailing slash is required so Vite prefixes every JS, CSS, and WASM asset correctly.
export default defineConfig({
  base: '/Orgo1-Sub-Elim/',
  plugins: [react()],
  // Ketcher core uses EventEmitter; map that Node built-in to its browser implementation.
  resolve: { alias: { events: 'events/' } },
  define: { global: 'globalThis' },
  build: { commonjsOptions: { transformMixedEsModules: true } },
  test: { environment: 'jsdom', globals: true },
});
