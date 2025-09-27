import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use relative URLs so index.html can live anywhere Netlify serves it
  base: './',
  build: {
    outDir: 'dist',      // or your custom folder
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})


