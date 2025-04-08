<script lang="ts">
	import '@chainlift/liftkit-css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
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
		margin: 0;
		padding: 0;
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
		padding-top: 2rem;
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
		background: var(--color-secondary);
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
</style>
