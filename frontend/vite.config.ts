import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Treat <spline-viewer> and similar as custom elements, not React components.
    }),
  ],
  server: {
    // Fixed port: other projects on this machine also default to 5173+, and a
    // silently shifted port meant loading the wrong app. Fail loudly instead.
    port: 5180,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        // When the backend isn't running, the frontend uses bundled fallback
        // data - so swallow proxy errors instead of spamming the terminal.
        configure: (proxy) => {
          proxy.on('error', () => {
            /* backend offline: frontend falls back, no need to log */
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    // Sourcemaps disabled in production: they are the main memory hog and not
    // needed for a deployed portfolio (avoids "heap out of memory" on build).
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split big vendors into their own chunks for lighter, faster builds.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth'],
          charts: ['chart.js'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
});
