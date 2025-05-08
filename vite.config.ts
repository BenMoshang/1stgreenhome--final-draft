import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],

  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true, 
      },
    },
  },

  build: {
    target: 'esnext',         
    minify: 'esbuild',        
    cssMinify: 'lightningcss',
    sourcemap: true,          
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@sveltejs/kit', 'motion', 'split-type'],
        },
      },
    },
  },

  server: {
    host: 'localhost',
    port: 3000,
    fs: {
      strict: true,
    },
  },
});