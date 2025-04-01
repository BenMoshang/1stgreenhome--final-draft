<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>1st Green Home - Free Energy Audits, LED Retrofits, and Sustainable Solutions</title>
</svelte:head>

<div class="app">
	<main class="page-container">
		{@render children()}
	</main>

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
</div>

<style lang="scss" global>
	/* ==================================================
	   LAYOUT-SPECIFIC STYLES
	   ================================================== */
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.page-container {
		z-index: 1;
		display: flex;
		flex: 1;
		flex-direction: column;
		inline-size: 100%;
		block-size: 100%;
		margin: 0 auto;
		overflow-x: clip;
		scroll-behavior: smooth;
		background: var(--convex-light);

		&::after {
			content: '';
			position: fixed;
			z-index: -2;
			inset: 0;
			inline-size: 100%;
			block-size: 100%;
			margin: auto;
			transform: translateZ(0);
			filter: url('#noiseFilter2') contrast(300%) brightness(120%) opacity(1);
			opacity: 0.05;
			pointer-events: none;
			will-change: filter;
		}
	}

	/* ==================================================
	   CSS CUSTOM PROPERTIES (VARIABLES)
	   ================================================== */
	:root {
		/* --------------------------------------------------
    PADDING / border-radius
    -------------------------------------------------- */
		--page-inline-padding: clamp(1.25rem, 0.431rem + 2.76vw, 2.5rem);
		--page-block-padding: clamp(2.5rem, 1.517rem + 3.31vw, 4rem);
		--padding-section: clamp(2.5rem, 1.517rem + 3.31vw, 4rem)
			clamp(1.25rem, 0.431rem + 2.76vw, 2.5rem);
		--border-radius: 1.25rem;

		/* --------------------------------------------------
    FONT SIZEs
    -------------------------------------------------- */
		--h1: clamp(2.25rem, 0.94rem + 4.41vw, 4.25rem);
		--h2: clamp(2.125rem, 1.142rem + 3.31vw, 3.625rem);
		--h3: clamp(1.75rem, 1.095rem + 2.21vw, 2.75rem);
		--h4: clamp(1.375rem, 0.884rem + 1.66vw, 2.125rem);
		--h5: clamp(1.25rem, 1.086rem + 0.55vw, 1.5rem);
		--h6: clamp(1.0625rem, 0.94rem + 0.41vw, 1.25rem);
		--p: clamp(1.0625rem, 1.022rem + 0.14vw, 1.125rem);
		--label-p: clamp(0.9375rem, 0.897rem + 0.14vw, 1rem);
		--label-line-height: 1.2em;
		--button-line-height: 1.6em;
		--line-height-p: clamp(1.5, 1.402rem + 0.33vw, 1.65);

		/* --------------------------------------------------
    BACKGROUNDS / GRADIENTS
    -------------------------------------------------- */
		--gradient-bg: url(/assets/images/gradient-bg.svg);
		/* CONVEX GRADIENTS */
		--convex-light: linear-gradient(145deg, hsl(0, 0%, 100%), hsl(150, 6%, 89%));
		--convex-neutral: linear-gradient(145deg, hsl(162, 21%, 78%), hsl(162, 8%, 65%));
		--convex-dark: linear-gradient(145deg, hsl(165, 11%, 8%), hsl(165, 11%, 7%));
		--convex-primary: linear-gradient(145deg, hsl(156, 47%, 54%), hsl(156, 40%, 45%));
		--convex-secondary: linear-gradient(145deg, hsl(162, 35%, 50%), hsl(162, 28%, 42%));
		--convex-accent: linear-gradient(145deg, hsl(156, 49%, 55%), hsl(156, 42%, 47%));
		--convex-secondary--reverse: linear-gradient(290deg, hsl(162, 35%, 50%), hsl(162, 28%, 42%));

		/* --------------------------------------------------
    MAIN COLORS
    -------------------------------------------------- */
		--color-light: hsl(165, 100%, 99%);
		--color-neutral: hsl(165, 100%, 88%);
		--color-dark: hsl(165, 11%, 8%);
		--color-transitional: hsl(180, 1%, 44%);
		--color-p: hsl(240, 2%, 20%);
		--color-primary: hsl(156, 40%, 50%);
		--color-secondary: hsl(162, 35%, 47%);
		--color-accent: hsl(156, 43%, 52%);
		--color-secondary-900: hsl(162, 50%, 30%);

		/* --------------------------------------------------
    FONTS
    -------------------------------------------------- */
		--font-family-regular: 'Manrope', system-ui;
		--font-family-bold: 'Poppins', system-ui;

		/* --------------------------------------------------
    SHADOWS (Light Background)
    -------------------------------------------------- */
		--shadow-color: 151deg 25% 61%;
		--shadow-low--light:
			0.3px 0.6px 0.8px hsl(var(--shadow-color) / 0.35),
			0.5px 1px 1.3px -1.2px hsl(var(--shadow-color) / 0.35),
			1.3px 2.4px 3.1px -2.5px hsl(var(--shadow-color) / 0.35);
		--shadow-medium--light:
			0.0187rem 0.0313rem 0.0375rem 0.3px 0.6px 0.8px hsl(var(--shadow-color) / 0.3),
			0.8px 1.6px 2px -0.6px hsl(var(--shadow-color) / 0.3),
			1.6px 3.1px 3.9px -1.2px hsl(var(--shadow-color) / 0.3),
			3.2px 6.3px 7.9px -1.9px hsl(var(--shadow-color) / 0.3),
			6.3px 12.2px 15.4px -2.5px hsl(var(--shadow-color) / 0.3);
		--shadow-high--light:
			0.3px 0.6px 0.8px hsl(var(--shadow-color) / 0.28),
			1.5px 3px 3.8px -0.3px hsl(var(--shadow-color) / 0.28),
			2.7px 5.3px 6.7px -0.6px hsl(var(--shadow-color) / 0.28),
			4.1px 8px 10.1px -0.8px hsl(var(--shadow-color) / 0.28),
			6px 11.7px 14.8px -1.1px hsl(var(--shadow-color) / 0.28),
			8.6px 16.8px 21.2px -1.4px hsl(var(--shadow-color) / 0.28),
			12.3px 23.9px 30.2px -1.7px hsl(var(--shadow-color) / 0.28),
			17.2px 33.5px 42.4px -1.9px hsl(var(--shadow-color) / 0.28),
			23.6px 46px 58.2px -2.2px hsl(var(--shadow-color) / 0.28),
			31.9px 62px 78.4px -2.5px hsl(var(--shadow-color) / 0.28);

		/* --------------------------------------------------
    DROP SHADOWS (Secondary Color)
    -------------------------------------------------- */
		--drop-shadow-high--secondary: drop-shadow(
				0.0187rem 0.0313rem 0.0375rem hsl(156deg 37% 27% / 0.54)
			)
			drop-shadow(0.0688rem 0.1437rem 0.1563rem -0.0375rem hsl(156deg 37% 27% / 0.49))
			drop-shadow(0.15rem 0.3rem 0.325rem -0.075rem hsl(156deg 37% 27% / 0.45))
			drop-shadow(0.2938rem 0.5938rem 0.6438rem -0.1062rem hsl(156deg 37% 27% / 0.4))
			drop-shadow(0.55rem 1.1rem 1.2rem -0.1437rem hsl(156deg 37% 27% / 0.36))
			drop-shadow(0.9563rem 1.9187rem 2.0875rem -0.1812rem hsl(156deg 37% 27% / 0.32))
			drop-shadow(1.5625rem 3.125rem 3.4063rem -0.2188rem hsl(156deg 37% 27% / 0.27));

		/* --------------------------------------------------
    SHADOWS (Secondary Background)
    -------------------------------------------------- */
		--shadow-low--secondary:
			0.0187rem 0.0313rem 0.0375rem hsl(156deg 37% 27% / 0.48),
			0.025rem 0.05rem 0.0563rem -0.1062rem hsl(156deg 37% 27% / 0.39),
			0.0625rem 0.125rem 0.1375rem -0.2188rem hsl(156deg 37% 27% / 0.3);
		--shadow-medium--secondary:
			0.0187rem 0.0313rem 0.0375rem hsl(156deg 37% 27% / 0.51),
			0.0437rem 0.0813rem 0.0875rem -0.075rem hsl(156deg 37% 27% / 0.43),
			0.1187rem 0.2375rem 0.2562rem -0.1437rem hsl(156deg 37% 27% / 0.36),
			0.3125rem 0.625rem 0.6813rem -0.2188rem hsl(156deg 37% 27% / 0.29);
		--shadow-high--secondary:
			0.0187rem 0.0313rem 0.0375rem hsl(156deg 37% 27% / 0.54),
			0.0688rem 0.1437rem 0.1563rem -0.0375rem hsl(156deg 37% 27% / 0.49),
			0.15rem 0.3rem 0.325rem -0.075rem hsl(156deg 37% 27% / 0.45),
			0.2938rem 0.5938rem 0.6438rem -0.1062rem hsl(156deg 37% 27% / 0.4),
			0.55rem 1.1rem 1.2rem -0.1437rem hsl(156deg 37% 27% / 0.36),
			0.9563rem 1.9187rem 2.0875rem -0.1812rem hsl(156deg 37% 27% / 0.32),
			1.5625rem 3.125rem 3.4063rem -0.2188rem hsl(156deg 37% 27% / 0.27);

		/* --------------------------------------------------
    POTENTIALLY OUTDATED VARIABLES (Please review)
    -------------------------------------------------- */
		--max-width-title: 20ch;
		--max-width-description: 50ch;
		--gradient-text: linear-gradient(
			145deg,
			#32a852 20%,
			#60d56b 40%,
			#6cff67 60%,
			#60d56b 80%,
			#32a852 100%
		);
	}
	/* ==================================================
	   GLOBAL STYLES & RESETS
	   ================================================== */

	/* --- Box Sizing Reset --- */
	:global(*),
	:global(*::before),
	:global(*::after) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* --- Base HTML & Body --- */
	:global(html) {
		inline-size: 100%;
		min-block-size: 100svh;
		scrollbar-color: var(--color-primary) hsl(0 0% 90%);
		scrollbar-width: thin;
		background: var(--convex-light); /* Ensure consistent background */
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		inline-size: 100%;
		block-size: 100%; /* Use block-size for consistency */
		font-smooth: always;
		-webkit-font-smoothing: subpixel-antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-x: clip;
		font-family: var(--font-family-regular); /* Use variable */
		scroll-behavior: smooth;
		text-rendering: geometricprecision;
		background: var(--convex-light); /* Ensure consistent background */
	}

	/* --- Selection Highlight --- */
	::selection {
		background: var(--color-primary);
		color: white;
	}

	/* --- Base Typography --- */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: var(--color-dark);
		text-wrap: balance;
		font-family: var(--font-family-bold);
		overflow-wrap: break-word; /* From Josh Reset */
		text-overflow: ellipsis; /* From Josh Reset */
	}

	label,
	input,
	textarea,
	select,
	ol,
	ul,
	li,
	p {
		font-family: var(--font-family-regular); /* Use variable */
		color: var(--color-p);
		font-size: var(--p);
		line-height: var(--line-height-p);
		text-wrap: pretty;
		font-style: normal;
		font-weight: 400;
		list-style: none;
		overflow-wrap: break-word; /* From Josh Reset */
		/* text-overflow: ellipsis; */ /* Ellipsis might be too aggressive for paragraphs/lists */
	}

	/* --- Typography Helper Classes --- */
	/* line heights | font-sizes */
	.typography--h1 {
		font-size: var(--h1);
		line-height: 1.6;
	}
	.typography--h2 {
		font-size: var(--h2);
		line-height: 1.2;
	}
	.typography--h3 {
		font-size: var(--h3);
		line-height: 1.3;
	}
	.typography--h4 {
		font-size: var(--h4);
		line-height: 1.4;
	}
	.typography--h5 {
		font-size: var(--h5);
		line-height: 1.5;
	}
	.typography--h6 {
		font-size: var(--h6);
		line-height: 1.6;
	}

	.typography--p {
		line-height: 1.6; /* Should match --line-height-p definition? */
	}

	/* --- Interactive Elements --- */
	:global(button),
	:global([role='button']),
	:global(select) {
		cursor: pointer;
		touch-action: manipulation;
	}

	/* --- Form Elements --- */
	:global(input),
	:global(button),
	:global(textarea),
	:global(select) {
		font: inherit;
	}

	:global(textarea, input) {
		/* font: inherit; */ /* Duplicated */
		letter-spacing: inherit;
		word-spacing: inherit;
	}

	/* --- Media Reset --- */
	:global(img),
	:global(picture),
	:global(video),
	:global(canvas),
	:global(svg) {
		max-inline-size: 100%;
		block-size: auto;
		background-repeat: no-repeat;
		background-size: cover;
		font-style: italic;
		shape-margin: 1rem;
		vertical-align: middle;
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
	}

	:global(blockquote::before),
	:global(blockquote::after),
	:global(q::before),
	:global(q::after) {
		content: '';
	}
</style>
