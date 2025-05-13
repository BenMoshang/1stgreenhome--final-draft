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
      sourceMap: false, 
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
      base: '/1stgreenhome--final-draft',
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // ignore missing files
        if (message.includes('does not begin with `base`')) {
          return;
        }
        // fail on other errors
        throw new Error(message);
      }
    }
  },
};

export default config;