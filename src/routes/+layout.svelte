<script lang="ts">
	import Lenis from 'lenis';

	import { browser } from '$app/environment';
	import Header from '$lib/components/layout/Header.svelte';
	import { initScrollAnimations } from '$lib/utils/scrollUtils';
	import { onDestroy, onMount } from 'svelte';

	let { children } = $props();

	let lenis: any;
	let prefersReducedMotion = false;
	let scrollAnimationCleanup: { cleanup: () => void } | undefined;

	onMount(() => {
		// Check if user prefers reduced motion
		if (browser) {
			prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}

		// Initialize Lenis for smooth scrolling with motion design principles
		lenis = new Lenis({
			duration: prefersReducedMotion ? 0 : 1.6, // Slightly longer for more elegant motion
			easing: (t: number) => {
				// Improved easing curve - cubic bezier approximation for more natural feel
				return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // Exponential ease out
			},
			orientation: 'vertical',
			smoothWheel: true,
			smoothTouch: false, // Better experience on touch devices with no smoothing
			touchMultiplier: 2, // More responsive touch
			infinite: false,
			gestureOrientation: 'vertical',
			wheelMultiplier: 1.2, // Slightly faster wheel response for better control
			lerp: 0.1 // Linear interpolation factor - smooths between frames
		});

		// Make lenis accessible for other components
		if (browser) {
			(window as any).lenis = lenis;
		}

		// Create the RAF loop for Lenis
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		// Start the loop
		requestAnimationFrame(raf);

		// Add scroll-linked events
		lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
			// This event provides scroll data that can be used to trigger animations
			// You can dispatch a custom event to allow components to react to scroll
			if (browser) {
				window.dispatchEvent(
					new CustomEvent('lenisScroll', {
						detail: { scroll, limit, velocity, direction, progress }
					})
				);
			}
		});

		// Listen for reduced motion preference changes
		if (browser) {
			const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
			const updateMotionPreference = (event: MediaQueryListEvent) => {
				prefersReducedMotion = event.matches;
				// Update Lenis config based on preference
				if (lenis) {
					lenis.options.duration = prefersReducedMotion ? 0 : 1.6;
				}
			};

			motionMediaQuery.addEventListener('change', updateMotionPreference);
		}

		// Initialize scroll animations
		scrollAnimationCleanup = initScrollAnimations();
	});

	onDestroy(() => {
		// Clean up Lenis when component is destroyed
		if (lenis) {
			lenis.destroy();
		}

		// Clean up scroll animations
		if (scrollAnimationCleanup) {
			scrollAnimationCleanup.cleanup();
		}

		// Remove event listeners
		if (browser) {
			const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
			motionMediaQuery.removeEventListener('change', () => {});
		}
	});
</script>

<svelte:head>
	<title>1st Green Home - Free Energy Audits, LED Retrofits, and Sustainable Solutions</title>
</svelte:head>
<Header />
{@render children()}

<!-- <Footer /> -->
<filter id="noiseFilter2">
	<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
	<feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
</filter>

<!-- SVG filter for noise effect -->

<style lang="scss" global>
	
html {
  &::before {
    /* Positioning */
    position: absolute;
    z-index: -2;
    margin: auto;
    block-size: 100%;

    /* Content */
    content: '';

    /* Visual */
    filter: url('#noiseFilter2') contrast(300%) brightness(120%) opacity(1);

    /* Display & Box Model */
    inline-size: 100%;
    inset: 0;
    opacity: 0.05;

    /* Misc */
    pointer-events: none;
    transform: translateZ(0);

    /* Performance */
    will-change: filter;
  }

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
    inline-size: 100%;
    inset: 0;
    opacity: 0.05;
  }
}

/* Lenis smooth scrolling styles */
html.lenis {
  block-size: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

/* Enhanced scroll-linked animation utility classes */
:global([data-scroll]) {
  transition:
    transform 1s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  will-change: transform, opacity;
}

:global([data-scroll='fade-up']) {
  opacity: 0;
  transform: translateY(50px);
}

:global([data-scroll='fade-up'].is-inview) {
  opacity: 1;
  transform: translateY(0);
}

:global([data-scroll='fade-in']) {
  opacity: 0;
}

:global([data-scroll='fade-in'].is-inview) {
  opacity: 1;
}

/* Motion reduction styles */
@media (prefers-reduced-motion: reduce) {
  /*
   * Accessibility Exception: The following !important rules are required to override animation and transition
   * styles for users who prefer reduced motion. This ensures compliance with accessibility guidelines.
   * If the design system introduces semantic utility classes for motion reduction, replace these with those utilities.
   */
  :global(*) {
    animation-duration: 0.01ms !important; // ACCESSIBILITY EXCEPTION
    animation-iteration-count: 1 !important; // ACCESSIBILITY EXCEPTION
    scroll-behavior: auto !important; // ACCESSIBILITY EXCEPTION
    transition-duration: 0.01ms !important; // ACCESSIBILITY EXCEPTION
  }

  :global([data-scroll]) {
    opacity: 1 !important; // ACCESSIBILITY EXCEPTION
    transform: none !important; // ACCESSIBILITY EXCEPTION
    transition: none !important; // ACCESSIBILITY EXCEPTION
  }
}
</style>
