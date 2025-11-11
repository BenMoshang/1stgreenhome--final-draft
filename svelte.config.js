import staticAdapter from '@sveltejs/adapter-static';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

const isVercel = Boolean(process.env.VERCEL);

const staticAdapterOptions = {
  // default options are generally suitable for GitHub Pages
  // See https://kit.svelte.dev/docs/adapter-static#options
  pages: 'build',
  assets: 'build',
  fallback: 'index.html', // Use index.html as fallback for SPA behavior
  precompress: false,
  strict: true, // Ensures all pages are prerenderable
};

const basePath =
  isVercel || process.env.NODE_ENV !== 'production'
    ? ''
    : '/1stgreenhome--final-draft';

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
    adapter: isVercel ? vercelAdapter() : staticAdapter(staticAdapterOptions),
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
<<<<<<< HEAD
      // Replace '1stgreenhome--final-draft' with your actual repo name if different
      base: basePath,
=======
>>>>>>> 6139af2eede45837e7602487ce62a39d1fea730f
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
