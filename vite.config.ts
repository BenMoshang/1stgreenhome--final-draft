import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		// Remove the problematic preprocessorOptions for now
		// Use absolute path for better reliability
		postcss: new URL('./postcss.config.js', import.meta.url).pathname
	},
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
		// host: '192.168.0.85',
		// host: '192.168.0.167',
		fs: {
			strict: true
		}
	}
});
