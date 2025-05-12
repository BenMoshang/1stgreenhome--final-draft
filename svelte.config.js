import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: [
    sveltePreprocess({
      scss: {
        prependData: `@use 'src/lib/styles/main.scss' as *;`, // Auto-import global SCSS

        includePaths: ['src/lib/styles'], // Add if @use needs specific paths
      },
    }),
    vitePreprocess({
      sourceMap: true, 
    }),
  ],

  compilerOptions: {
    runes: true,
  },

  kit: {
    adapter: adapter({
      // default options are generally suitable for GitHub Pages
      // See https://kit.svelte.dev/docs/adapter-static#options
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Use index.html as fallback for SPA behavior
      precompress: false,
      strict: true // Ensures all pages are prerenderable
    }),
    csrf: {
      checkOrigin: true,
    },
    serviceWorker: {
      register: true,
    },
    alias: {
      $lib: 'src/lib',
      $components: 'src/lib/components',
    },
    paths: {
      // Set base path for GitHub Pages deployment
      // Replace '1stgreenhome--final-draft' with your actual repo name if different
      base: process.env.NODE_ENV === 'production' ? '/1stgreenhome--final-draft' : '',
    },
  },
};

export default config;