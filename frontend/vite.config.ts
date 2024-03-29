import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  preview: {
    host: true,
    port: 80
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  resolve: {
    extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.json'],
  }
  
})