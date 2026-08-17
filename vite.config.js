import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true,
    proxy: {
      // Proxy to Mega Bull API to eliminate all browser CORS restrictions
      '/api/megabull': {
        target: 'https://api.megabull.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/megabull/, '')
      }
    }
  }
})
