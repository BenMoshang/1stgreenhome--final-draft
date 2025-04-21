import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Enable preprocessing for TypeScript, PostCSS, and SCSS
	preprocess: [
		sveltePreprocess({
			scss: {
				prependData: `@use 'src/lib/styles/main.scss' as *;` // auto-import your design system
			},
			postcss: true
		}),
		vitePreprocess({
			sourceMap: true,
			postcss: true
		})
	],

	compilerOptions: {
		runes: true
	},

	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: true
		},
		serviceWorker: {
			register: true
		},
		alias: {
			$lib: 'src/lib',
			$components: 'src/lib/components'
		}
	}
};

export default config;
