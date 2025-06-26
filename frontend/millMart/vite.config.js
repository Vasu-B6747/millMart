import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 👈 critical for correct path resolution
  plugins: [react()],
});
