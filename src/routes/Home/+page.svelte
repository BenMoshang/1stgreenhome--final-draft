<script lang="ts">
	// These would be imports for other sections once migrated
	// import Stepper from '$lib/components/sections/Stepper.svelte';
	// import Partners from '$lib/components/sections/Partners.svelte';
	// import Faqs from '$lib/components/sections/Faqs.svelte';
	// import Cta from '$lib/components/sections/Cta.svelte';

	// For handling fragment navigation (similar to Angular's fragment handling)
	import { onMount } from 'svelte';
	
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
	<!-- <Hero /> -->
	<div class="gradient-background-container">
		<!-- <Services /> -->
		<!-- <Testimonials /> -->
		<div class="gradient-background"></div>
	</div>
	<!-- <Projects /> -->
</main>

<style lang="scss">
  .page-container {
    position: relative;

    /* Positioning */
    z-index: 1;

    /* Dislay & Box Model */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    block-size: 100%;

    // gap: clamp(2.5rem, 2.251rem + 1.06vw, 3rem);
    inline-size: 100%;
    margin-inline: auto;

    & > * {
      flex: 1;
    }
  }

  .gradient-background-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    inline-size: 100%;

    // gap: clamp(2.5rem, 2.251rem + 1.06vw, 3rem);
  }

  .gradient-background {
    position: absolute;
    z-index: -10;
    background: url('/assets/landing-page/gradient-background.svg') no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    block-size: 100%; /* Full height of the container */
    filter: brightness(0.75) saturate(1.5);
    inline-size: 100vw; /* Full viewport width */
    inset-block-start: 0;
    inset-inline-start: 50%;
    transform: translateX(-50%);

    &::after {
      position: absolute;
      z-index: -1;
      margin: auto;
      background-attachment: fixed;
      background-image: url('/assets/landing-page/leaves.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      block-size: 100%;
      content: '';
      filter: contrast(0.7) brightness(0.3);
      inline-size: 100%;
      inset: 0;
      opacity: 0.2;
    }
  }
</style>
