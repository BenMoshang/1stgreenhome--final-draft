import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Enable preprocessing for TypeScript, PostCSS, etc.
	preprocess: vitePreprocess({
		// Add source maps for better debugging
		sourceMap: true,
		// Enable PostCSS processing
		postcss: true
	}),

	// Add compiler options to enable runes
	compilerOptions: {
		runes: true
	},

	kit: {
		adapter: adapter(),
		// Add recommended security headers
		csrf: {
			checkOrigin: true
		},
		// Enable service worker for PWA support
		serviceWorker: {
			register: true
		},
		// Add alias for better imports
		alias: {
			$lib: 'src/lib',
			$components: 'src/lib/components'
		}
	}
};

export default config;
