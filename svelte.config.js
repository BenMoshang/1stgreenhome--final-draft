import adapter from '@sveltejs/adapter-static';
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
    adapter: adapter({
      // GitHub Pages specific configuration
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Enable SPA fallback for client-side routing
      precompress: false,
      strict: true
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
      // Base path for GitHub Pages deployment
      // Will be set by GitHub Actions based on repository name
      base: process.env.BASE_PATH || '',
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
