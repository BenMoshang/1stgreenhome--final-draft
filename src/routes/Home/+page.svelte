<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	// These would be imports for other sections once migrated
	// import Stepper from '$lib/components/sections/Stepper.svelte';
	// import Testimonials from '$lib/components/sections/Testimonials.svelte';
	// import Projects from '$lib/components/sections/Projects.svelte';
	// import Partners from '$lib/components/sections/Partners.svelte';
	// import Faqs from '$lib/components/sections/Faqs.svelte';
	// import Cta from '$lib/components/sections/Cta.svelte';

	// For handling fragment navigation (similar to Angular's fragment handling)
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// Function to handle fragment navigation
	function jumpToFragment(fragment: string) {
		const element = document.getElementById(fragment);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	// Check for fragment in URL on mount
	onMount(() => {
		// Get fragment from URL
		const hash = window.location.hash.substring(1);
		if (hash) {
			jumpToFragment(hash);
		}

		// Listen for hash changes
		const handleHashChange = () => {
			const newHash = window.location.hash.substring(1);
			if (newHash) {
				jumpToFragment(newHash);
			}
		};

		window.addEventListener('hashchange', handleHashChange);

		// Cleanup event listener
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	});
</script>

<main class="page-container">
	<Hero />
</main>
<svg
	style="position: absolute;
 width: 0; height: 0;"
>
	<filter id="noiseFilter2">
		<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
		<feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
	</filter>
</svg>

<style lang="scss">
	.page-container {
		/* Positioning */
		z-index: 1;

		/* Dislay & Box Model */
		@extend %flex-col-center;
		gap: clamp(2.5rem, 2.157rem + 1.15vw, 3rem);
		padding-inline: 1rem;
		inline-size: 100%;
		block-size: 100%;
		margin: 0 auto;
		overflow-x: clip;
		position: relative;
		/* Misc */
		scroll-behavior: smooth;

		&::after {
			/* Content */
			content: '';

			/* Positioning */
			position: fixed;
			inset: 0;
			z-index: -2;
			margin: auto;

			/* Display & Box Model */
			inline-size: 100%;
			block-size: 100%;
			/* Visual */
			filter: url('#noiseFilter2') contrast(300%) brightness(120%) opacity(1);
			opacity: 0.05;
			transform: translateZ(0);

			/* Performance */
			will-change: filter;

			/* Misc */
			pointer-events: none;
		}

		& > * {
			outline: 1px solid red;
		}
	}
</style>
