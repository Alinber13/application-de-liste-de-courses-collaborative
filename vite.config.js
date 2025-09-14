import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  server: {
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion'],
          state: ['zustand', '@supabase/supabase-js']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
})
