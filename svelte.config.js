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
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore 404 errors for missing assets during prerendering
        // This allows the build to continue even if some assets are missing
        const isAsset = path.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i);
        if (isAsset) {
          console.warn(`Skipping missing asset during prerender: ${path}${referrer ? ` (linked from ${referrer})` : ''}`);
          return 'ignore'; // Ignore missing asset files
        }
        // For non-asset 404 errors, fail the build
        return 'fail';
      },
    },
  },
};

export default config;
