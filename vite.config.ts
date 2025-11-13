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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['motion'],
        },
      },
    },
  },

  ssr: {
    noExternal: ['motion'],
  },

  server: {
    host: 'localhost',
    port: 3000,
    fs: {
      strict: true,
    },
  },
});
