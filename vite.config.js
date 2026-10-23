import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Las rutas se generan como HTML en scripts/prerender.mjs; nginx resuelve
// cada directorio y devuelve 404 para las direcciones que no existen.
export default defineConfig({ plugins: [react()], base: '/' });
