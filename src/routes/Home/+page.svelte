<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	// These would be imports for other sections once migrated
	// import Stepper from '$lib/components/sections/Stepper.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
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
	<div class="gradient-background-container">
		<Services />
		<Testimonials />
		<div class="gradient-background"></div>
	</div>
	<Projects />
</main>

<style lang="scss">
	.page-container {
		/* Positioning */
		z-index: 1;
		position: relative;
		/* Dislay & Box Model */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-inline-size: $PAGE_MAX_WIDTH;
		gap: clamp(2.5rem, 2.251rem + 1.06vw, 3rem);
		padding-inline: 1rem;
		inline-size: 100%;
		block-size: 100%;
		margin-inline: auto;
		& > * {
			flex: 1;
		}
	}

	.gradient-background-container {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(2.5rem, 2.251rem + 1.06vw, 3rem);
	}

	.gradient-background {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: -10;
		width: 100vw; /* Full viewport width */
		height: 100%; /* Full height of the container */
		background: url('/assets/landing-page/gradient-background.svg') no-repeat;
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		filter: saturate(0.7);
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			background-image: url('/assets/landing-page/leaves.svg');
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			background-attachment: fixed;
			opacity: 0.2;
			z-index: -1;
		}
	}
</style>
