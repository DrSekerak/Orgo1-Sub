import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Set VITE_BASE=/repository-name/ for a project site; '/' works for a user site and local dev.
export default defineConfig({ base: process.env.VITE_BASE ?? '/', plugins: [react()], test: { environment: 'jsdom', globals: true } });
