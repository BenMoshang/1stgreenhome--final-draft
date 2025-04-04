<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	// These would be imports for other sections once migrated
	// import Stepper from '$lib/components/sections/Stepper.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
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
	<Services />
	<Testimonials />
</main>

<style lang="scss">
	.page-container {
		/* Positioning */
		z-index: 1;

		/* Dislay & Box Model */
		@extend %flex-col-center;
		gap: clamp(2.5rem, 2.251rem + 1.06vw, 3rem);
		padding-inline: 1rem;
		inline-size: 100%;
		block-size: 100%;
		margin: 0 auto;
	}
</style>
