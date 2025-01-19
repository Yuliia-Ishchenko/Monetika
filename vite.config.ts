import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: process.env.PORT || 3000, // Use Render's PORT environment variable or fallback to 3000
    host: '0.0.0.0', // Ensure that the app is accessible externally on Render
  },
  build: {
    outDir: 'dist', // Directory for production files
    chunkSizeWarningLimit: 500, // This is to handle any chunk size warnings, adjust as necessary
  },
})
