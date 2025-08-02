
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // or 'build' if that's what you prefer
  },
  base: './', // VERY IMPORTANT to avoid MIME errors
})
