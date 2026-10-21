import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// La base absoluta permite servir rutas legales (/terminos, /privacidad, /cookies)
// reutilizadas por el fallback a index.html de nginx.
export default defineConfig({ plugins: [react()], base: '/' });
