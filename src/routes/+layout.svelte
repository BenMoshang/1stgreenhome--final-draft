<script lang="ts">
	import '@chainlift/liftkit-css';
	import Lenis from 'lenis';

	import { browser } from '$app/environment';
	import Footer from '$lib/components/layout/Footer.svelte';
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

<Footer />
<filter id="noiseFilter2">
	<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
	<feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
</filter>

<!-- SVG filter for noise effect -->

<style lang="scss" global>
	/* ==================================================
	   LAYOUT-SPECIFIC STYLES (.page-container & Noise Filter)
	   ================================================== */

	/* ==================================================
	   GLOBAL STYLES & RESETS
	   ================================================== */

	/* --- Box Sizing Reset --- */
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	/* --- Base HTML & Body --- */
	:global(html) {
		/* Display & Box Model */
		inline-size: 100vw;
		min-block-size: 100svh;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		margin-inline: auto;
		/* Visual */
		background: var(--color-light);
		scrollbar-color: var(--color-primary) hsl(0 0% 90%);
		scrollbar-width: thin;
	}

	:global(body) {
		/* Display & Box Model */
		inline-size: 100%;
		block-size: 100%;
		overflow-x: clip;
		margin-inline: auto;
		padding-top: 7rem;
		/* Typography */
		font-family: var(--font-family-regular, system-ui);
		font-smooth: always;
		-webkit-font-smoothing: subpixel-antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: geometricprecision;
		position: relative;
		/* Misc */
		scroll-behavior: smooth;
		&::before {
			/* Content */
			content: '';

			/* Positioning */
			position: absolute;
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

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			background-image: url('/assets/landing-page/leaves.svg');
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			background-attachment: fixed;
			opacity: 0.05;
			z-index: -1;
		}
	}

	/* --- Global Selection Style --- */
	:global(::selection) {
		color: white;
		background: var(--color-secondary-900);
		text-shadow: none;
	}
	:root {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-smooth: never;
	}
	/* --- Base Typography Resets --- */
	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		/* Box Model */
		overflow-wrap: break-word;

		/* Typography */
	}

	:global(label),
	:global(input),
	:global(textarea),
	:global(select),
	:global(ol),
	:global(ul),
	:global(li) {
		/* Box Model */
		text-overflow: ellipsis;

		list-style: none;
		text-wrap: pretty;
	}

	/* --- Interactive Elements Reset --- */
	:global(button),
	:global([role='button']),
	:global(select) {
		cursor: pointer;
		touch-action: manipulation;
	}

	/* --- Form Elements Reset --- */
	:global(input),
	:global(button),
	:global(textarea),
	:global(select) {
		font: inherit;
	}
	:global(a) {
		color: inherit;
		text-decoration: none;
	}
	:global(textarea, input) {
		letter-spacing: inherit;
		word-spacing: inherit;
	}

	/* --- Media Reset --- */
	:global(img),
	:global(picture),
	:global(video),
	:global(canvas),
	:global(svg) {
		/* Display & Box Model */
		display: block; /* Common practice for media */
		max-inline-size: 100%;
		block-size: auto;
		vertical-align: middle; /* Reset default inline alignment */

		/* Typography */
		font-style: italic;

		/* Visual */
		background-repeat: no-repeat;
		background-size: cover;
		shape-margin: 1rem;
	}

	/* --- Table Reset --- */
	:global(table) {
		border-collapse: collapse;
		border-spacing: 0;
	}

	/* --- Blockquote Reset --- */
	:global(blockquote),
	:global(q) {
		quotes: none;

		&::before,
		&::after {
			content: '';
		}
	}

	/* Lenis smooth scrolling styles */
	html.lenis {
		height: auto;
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
		transform: translateY(50px);
		opacity: 0;
	}

	:global([data-scroll='fade-up'].is-inview) {
		transform: translateY(0);
		opacity: 1;
	}

	:global([data-scroll='fade-in']) {
		opacity: 0;
	}

	:global([data-scroll='fade-in'].is-inview) {
		opacity: 1;
	}

	/* Motion reduction styles */
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}

		:global([data-scroll]) {
			transition: none !important;
			transform: none !important;
			opacity: 1 !important;
		}
	}
</style>
