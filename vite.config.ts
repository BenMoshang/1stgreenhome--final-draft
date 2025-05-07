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
          vendor: ['@sveltejs/kit', 'lenis', 'motion', 'split-type'],
        },
      },
    },
  },

  server: {
    host: '192.168.0.167',
    port: 3000,
    fs: {
      strict: true,
    },
  },
});