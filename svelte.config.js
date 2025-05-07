import adapter from '@sveltejs/adapter-vercel';
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
    adapter: adapter(),
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
  },
};

export default config;