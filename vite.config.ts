import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    // Remove the problematic preprocessorOptions for now
    // Use absolute path for better reliability

    postcss: new URL('./postcss.config.js', import.meta.url).pathname,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunk
          vendor: ['@sveltejs/kit'],
        },
      },
    },
  },
  // Enable caching for better performance
  /**
   * Vite server configuration.
   *
   * @property {string} host - IP address to bind the server to.
   * @property {number} port - Port number to listen on.
   * @property {object} fs - File system options.
   * @property {boolean} fs.strict - Whether to enable strict file system watching.
   */
  server: {
    host: '192.168.0.167',
    port: 3000,

    fs: {
      strict: true,
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
