import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sassGlobImports from 'vite-plugin-sass-glob-import';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://api.currentsapi.services/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: '',
  plugins: [react(), sassGlobImports()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
      output: {
        assetFileNames: (name) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
  },
});
