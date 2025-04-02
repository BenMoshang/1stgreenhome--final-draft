<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>1st Green Home - Free Energy Audits, LED Retrofits, and Sustainable Solutions</title>
</svelte:head>

<Header />
<main class="page-container">
	{@render children()}
</main>
<Footer />
<!-- SVG filter for noise effect -->
<svg
	style="position: absolute;
 width: 0; height: 0;"
>
	<filter id="noiseFilter2">
		<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
		<feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
	</filter>
</svg>

<style lang="scss" global>
	/* ==================================================
	   LAYOUT-SPECIFIC STYLES (.page-container & Noise Filter)
	   ================================================== */

	.page-container {
		/* Positioning */
		z-index: 1;

		/* Display & Box Model */
		display: flex;
		flex: 1;
		flex-direction: column;
		inline-size: 100%;
		block-size: 100%;
		margin: 0 auto;
		overflow-x: clip;

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
			opacity: 0.08;
			transform: translateZ(0);

			/* Performance */
			will-change: filter;

			/* Misc */
			pointer-events: none;
		}
	}

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
		inline-size: 100%;
		min-block-size: 100svh;

		/* Visual */
		background: var(--color-light);
		scrollbar-color: var(--color-primary) hsl(0 0% 90%);
		scrollbar-width: thin;
	}

	:global(body) {
		/* Display & Box Model */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		inline-size: 100%;
		block-size: 100%;
		overflow-x: clip;
		max-inline-size: $PAGE_MAX_WIDTH;
		/* Typography */
		font-family: var(--font-family-regular, system-ui);
		font-smooth: always;
		-webkit-font-smoothing: subpixel-antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: geometricprecision;

		/* Misc */
		scroll-behavior: smooth;
	}

	/* --- Global Selection Style --- */
	:global(::selection) {
		color: white;
		background: var(--color-secondary-900);
		text-shadow: none;
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

		/* Typography */
		color: var(--color-p);
		font-family: var(--font-family-regular);
		font-size: var(--p);
		font-style: normal;
		// font-weight: 400;
		line-height: var(--line-height-p);
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
