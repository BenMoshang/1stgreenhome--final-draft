import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: [
    sveltePreprocess({
      scss: {

        includePaths: ['src/lib/styles'], // Add if @use needs specific paths
      },
    }),
    vitePreprocess({
      sourceMap: false,
    }),
  ],

  compilerOptions: {
    runes: true,
  },

  kit: {
    adapter: vercelAdapter({
      // Vercel adapter options
      // See https://kit.svelte.dev/docs/adapter-vercel#options
      runtime: 'nodejs20.x', // Explicitly specify Node.js 20 runtime
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
      // Base path is empty for Vercel deployment
      base: '',
    },
  },
};

export default config;
