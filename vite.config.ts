import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use '$lib/scss/app.scss' as *;`
			}
		},
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
		host: '192.168.0.85',
		fs: {
			strict: true
		}
	}
});
