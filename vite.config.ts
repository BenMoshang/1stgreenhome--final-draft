import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		// Use absolute path for better reliability
		postcss: new URL('./postcss.config.js', import.meta.url).pathname
	},
	// Add recommended optimizations
	build: {
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					// Split vendor code into separate chunk
					vendor: ['@sveltejs/kit']
				}
			}
		}
	},
	// Enable caching for better performance
	server: {
		fs: {
			strict: true
		}
	}
});
