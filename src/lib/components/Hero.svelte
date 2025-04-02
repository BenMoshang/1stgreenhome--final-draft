<script lang="ts">
	// Import required modules
	import { onMount } from 'svelte';
	import { fadeInUpTransition } from '$lib/utils/animations';

	// Assuming design system types/interfaces might be needed later
	// import type { /* ... */ } from '$lib/types'; // Example import

	// Data model for hero content
	interface HeroData {
		label: string;
		title0: string;
		title: string;
		title2: string;
		subtitle: string;
		subtitle2: string;
		// benefits seem unused in the template, remove if not needed elsewhere
		benefit1: string;
		benefit2: string;
		benefit3: string;
		button: string;
	}

	// Links - currently unused in the template
	// const links = [{ link: '/home', fragment: 'cta' }]; // Remove if not needed

	// Initialize hero data array
	const heroData: HeroData[] = [
		{
			label: `SIMPLIFY ENERGY SAVINGS`,
			title0: ``,
			title: ` Empower Your Business For`,
			title2: `A Greener Tomorrow`,
			subtitle: `Save money, cut energy use, and protect the planet.`,
			subtitle2: `Start with our free energy audit to start your sustainable journey!`,
			benefit1: `kWh Savings`, // Unused
			benefit2: `Overall Client Savings`, // Unused
			benefit3: `Commercial Projects`, // Unused
			button: `GET STARTED`
		}
	];

	// Reactive state for hero data
	let hero = $state<HeroData | null>(null);

	// Initialize hero data on component mount
	onMount(() => {
		hero = heroData[0];
	});

	// Function to handle button click (smooth scroll)
	function handleButtonClick() {
		const targetElement = document.getElementById('cta'); // Assumes 'cta' element exists elsewhere
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	}

	// REMOVE Animation classes - dynamically added
	// const animationClasses = {
	// 	label: 'animate-fade-in-up animate-delay-0',
	// 	title: 'animate-fade-in-up animate-delay-200',
	// 	subtitle: 'animate-fade-in-up animate-delay-400',
	// 	button: 'animate-fade-in-up animate-delay-600',
	// 	image: 'animate-fade-in-up animate-delay-1000'
	// };
</script>

{#if hero}
	<section id="hero" class="main">
		<section class="hero">
			<div class="hero__image-container" in:fadeInUpTransition={{ delay: 1000, duration: 500 }}>
				<img
					src="/assets/landing-page/hero/hero__light.webp"
					width="500"
					height="500"
					alt="Energy efficient light bulb illustration"
					class="hero__image"
					loading="eager"
					decoding="sync"
				/>
			</div>

			<header class="hero__text">
				<p class="hero__label text-label" in:fadeInUpTransition={{ delay: 0, duration: 500 }}>
					{hero.label}
				</p>
				<h1 class="hero__title text-h1" in:fadeInUpTransition={{ delay: 200, duration: 500 }}>
					{hero.title0 + hero.title}
					<span class="hero__title-gradient">{hero.title2}</span>
				</h1>
				<p class="hero__subtitle text-p" in:fadeInUpTransition={{ delay: 400, duration: 500 }}>
					{hero.subtitle + hero.subtitle2}
				</p>

				<button
					class="hero__button text-label"
					on:click={handleButtonClick}
					aria-label="Get started with a free energy audit"
					in:fadeInUpTransition={{ delay: 600, duration: 500 }}
				>
					{hero.button}
					<img
						src="/assets/landing-page/envelope-regular.svg"
						width="16 // Apply animation with delay"
						height="16"
						alt=""
						aria-hidden="true"
						class="icon"
					/>
				</button>
			</header>
		</section>
	</section>
{/if}

<style lang="scss">
	// No global imports needed here; rely on gloally available CSS custom properties from app.scss

	/* --------------------------------------------------
     Main Container
   -------------------------------------------------- */
	.main {
		--main-padding: clamp(1rem, 0.824rem + 0.75vw, 1.5rem);
		--grid-gap-size: 2rem;
		--icon-dimension: 2rem;
		--button-hover-scale: 1.05;
		--button-active-scale: 0.95;
		--rounded-border-radius: 62.4375rem;
		--full-border-radius: 624.9375rem;
		--small-box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
		--hover-box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.15);
		--overlay-background-gradient: radial-gradient(
			circle,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.2) 50%,
			rgba(0, 0, 0, 0.527) 100%
		);
		--benefit-border-style: var(--color-primary) 0.0625rem dotted;
		--text-margin-top-size: 0.9375rem;
		--text-margin-bottom-size: -0.625rem;
		--text-shadow-effect: drop-shadow(0.0625rem 0.0625rem 0.0625rem rgba(255, 255, 255, 0.969));
		@extend %flex-center;

		width: 100%;
	}
	.main-text-container__button {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		// A11Y Contrast Check: Ensure var(--convex-secondary) background and var(--color-light) text meet WCAG AA.
		background: var(--convex-secondary);
		border: 0.0625rem solid var(--color-accent);
		border-radius: var(--rounded-border-radius);
		box-shadow:
			var(--small-box-shadow),
			inset 0 0.0625rem 0 rgba(255, 255, 255, 0.5);
		color: var(--color-light);
		font-size: var(--label-p);
		line-height: var(--button-line-height);
		padding: 0.5rem 1.5rem;
		text-wrap: nowrap;
		text-decoration: none;
		transition:
			transform 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out,
			filter 0.2s ease-in-out;
		gap: 0.75rem;
		cursor: pointer;

		/* A11Y: Add a distinct outline for keyboard focus */
		outline: 0.125rem solid transparent; /* Make space for the outline */
		outline-offset: 0.125rem; /* Offset to avoid overlapping the element */
		transition:
			transform 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out,
			filter 0.2s ease-in-out,
			outline-color 0.1s ease-in-out; /* Added transition for outline */
	}

	.main-text-container__button:hover {
		filter: brightness(1.1);
		transform: scale(var(--button-hover-scale));
		box-shadow: var(--hover-box-shadow);
	}

	/* A11Y: Use :focus-visible for keyboard-only focus styles */
	.main-text-container__button:focus-visible {
		// A11Y Contrast Check: Ensure this outline color has sufficient contrast against the surrounding background.
		// Consider using a variable like --color-focus-ring or a high-contrast color.
		outline-color: var(--color-accent, blue); /* Use accent or a fallback */
		filter: brightness(1.1); /* Optional: Keep hover brightness */
		box-shadow: var(--hover-box-shadow); /* Optional: Keep hover shadow */
	}

	.main-text-container__button:active {
		transform: scale(var(--button-active-scale));
	}

	/* --------------------------------------------------
     Button Styles
   -------------------------------------------------- */

	/* --------------------------------------------------
     Hero Container
   -------------------------------------------------- */
	.hero {
		display: grid;
		grid-template-areas: 'main-text' 'visuals'; // Mobile first
		grid-template-columns: 1fr;
		gap: 2rem; // primitive-spacing(xl)
		width: 100%;
		// border-radius: var(--border-radius); // Apply if needed (radius-md)

		/* --------------------------------------------------
		 Hero Text Container (Element)
	   -------------------------------------------------- */
		&__text {
			grid-area: main-text;
			place-self: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			padding: 1rem; // primitive-spacing(md)
			gap: 1rem; // spacing(less-related)
			text-align: center;
		}

		/* --------------------------------------------------
		 Hero Elements within Text Container
	   -------------------------------------------------- */
		&__label {
			// Inherits typography from .text-label class (assumed global)
			text-wrap: nowrap;
			// A11Y Contrast Check: Ensure var(--color-light) text has sufficient contrast against var(--convex-secondary) background.
			color: var(--color-light);
			background: var(--convex-secondary); // Use gradient CSS var
			font-weight: 500; // Keep specific weight
			padding-inline: 1rem;
			padding-block: 0.25rem;
			opacity: 0.9;
			border-radius: var(--rounded-border-radius); // Use CSS var for pill radius
			margin-bottom: 1rem; // spacing(less-related)
			// Use shadow CSS var if appropriate, otherwise define using color vars
			box-shadow: 0.1875rem 0.1875rem 0.5rem hsla(var(--shadow-color, 151deg 25% 61%) / 0.2);
		}

		&__title {
			max-width: 20ch; // $layout(max-width-title)
		}

		&__title-gradient {
			// Inherits font styles from parent H1
			color: transparent;
			// A11Y Contrast Check: Gradient text can be tricky. Ensure sufficient contrast exists *throughout* the gradient's transition against the background. Test thoroughly.
			background: var(--gradient-text); // Use text gradient CSS var
			background-size: 200% 200%;
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			animation: gradient-loop 5s ease-in-out infinite;
			filter: drop-shadow(0rem 0.0625rem 0.125rem hsla(var(--shadow-color, 151deg 25% 61%) / 0.5));
		}

		&__subtitle {
			max-width: 50ch; // $layout(max-width-description)
			text-wrap: pretty;
			// A11Y Contrast Check: Ensure var(--color-p) text has sufficient contrast against the background.
			color: var(--color-p); // Use CSS var for paragraph color
		}

		&__button {
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			// A11Y Contrast Check: Ensure var(--convex-secondary) background and var(--color-light) text meet WCAG AA.
			background: var(--convex-secondary);
			border: 0.0625rem solid var(--color-accent);
			border-radius: var(--rounded-border-radius);
			box-shadow:
				var(--small-box-shadow),
				inset 0 0.0625rem 0 rgba(255, 255, 255, 0.5);
			color: var(--color-light);
			font-size: var(--label-p);
			line-height: var(--button-line-height);
			padding: 0.5rem 1.5rem;
			text-wrap: nowrap;
			text-decoration: none;
			transition:
				transform 0.2s ease-in-out,
				box-shadow 0.2s ease-in-out,
				filter 0.2s ease-in-out;
			gap: 0.75rem;

			/* A11Y: Add a distinct outline for keyboard focus */
			outline: 0.125rem solid transparent; /* Make space for the outline */
			outline-offset: 0.125rem; /* Offset to avoid overlapping the element */
			transition:
				transform 0.2s ease-in-out,
				box-shadow 0.2s ease-in-out,
				filter 0.2s ease-in-out,
				outline-color 0.1s ease-in-out; /* Added transition for outline */

			&:hover {
				filter: brightness(1.1);
				transform: scale(var(--button-hover-scale));
				box-shadow: var(--hover-box-shadow);
			}

			/* A11Y: Use :focus-visible for keyboard-only focus styles */
			&:focus-visible {
				// A11Y Contrast Check: Ensure this outline color has sufficient contrast against the surrounding background.
				// Consider using a variable like --color-focus-ring or a high-contrast color.
				outline-color: var(--color-accent, blue); /* Use accent or a fallback */
				filter: brightness(1.1); /* Optional: Keep hover brightness */
				box-shadow: var(--hover-box-shadow); /* Optional: Keep hover shadow */
			}

			&:active {
				transform: scale(var(--button-active-scale));
			}

			.icon {
				// Styles specific to the icon inside the button, if any
				// e.g., vertical-align: middle;
			}
		}

		/* --------------------------------------------------
		 Image Container (Element)
	   -------------------------------------------------- */
		&__image-container {
			grid-area: visuals;
			place-self: center;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			width: 100%;
			max-width: 43.75rem; // Keep max-width on smaller screens
			padding: 1rem; // primitive-spacing(md)

			// Variables for pseudo-element positioning/sizing
			--background-dimensions: 70%;
			--background-abs-pos: 14%;

			&::before,
			&::after {
				content: '';
				position: absolute;
				top: var(--background-abs-pos);
				left: var(--background-abs-pos);
				width: var(--background-dimensions);
				height: var(--background-dimensions);
				border-radius: 0% 100% 0% 100% / 17% 77% 23% 83%; // Keep unique shape
				transform: translateX(0.5rem) scaleX(-1); // primitive-spacing(xs)
				padding: 1rem; // primitive-spacing(md)
			}

			&::before {
				// Assumes abstract.webp is findable at this path relative to public dir
				background-image: url(/assets/landing-page/abstract.webp);
				background-size: cover;
				mix-blend-mode: screen;
				filter: brightness(1.5);
				background-position: 0% 100%;
				z-index: -1;
			}

			&::after {
				background: var(--convex-secondary); // Use gradient CSS var
				box-shadow: var(--shadow-high--light, none); // Use shadow var with fallback
				background-size: contain;
				background-repeat: no-repeat;
				filter: brightness(0.7) saturate(0.6);
				background-position: center;
				z-index: -2;
			}
		}

		/* --------------------------------------------------
		 Hero Image (Element)
	   -------------------------------------------------- */
		&__image {
			display: block; // Prevent extra space below image
			max-width: 100%;
			height: auto;
			object-fit: cover;
			transition: transform 0.3s ease-in-out;
			filter: saturate(0.9)
				drop-shadow(0.3125rem 0.3125rem 0.5rem hsla(var(--shadow-color, 151deg 25% 61%) / 0.46));

			&:hover {
				transform: scale(1.05); // Use direct value for $layout(button-hover-scale)
			}
		}

		/* --------------------------------------------------
		 Media Queries (Laptop View Adjustments)
	   -------------------------------------------------- */
		// 75rem = 1200px. Use em for accessibility (1200/16 = 75em)
		@media (min-width: 75em) {
			// Adjustments for the .hero block itself
			grid-template-areas: 'main-text visuals';
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem 2rem; // row / column
			align-items: center;

			// Adjustments for elements within .hero
			&__text {
				text-align: left;
				align-items: flex-start;
				padding: 2rem; // primitive-spacing(xl)
			}

			&__label {
				// No specific alignment needed now due to flex-start on parent
			}

			&__image-container {
				max-width: none;
				width: 100%; // Allow grid to size
				height: 100%;
				justify-self: center; // Center visually within its column

				// Optionally adjust pseudo-element variables for larger view
				// --background-dimensions: 65%;
				// --background-abs-pos: 16%;
			}
		}
	}

	/* --------------------------------------------------
	 Gradient Animation Keyframes
   -------------------------------------------------- */
	@keyframes gradient-loop {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	/* --------------------------------------------------
	 Animations Keyframes (fadeInUp) - REMOVE
   -------------------------------------------------- */
	/* @keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	} */

	// Base animation class (keep global for utility) - REMOVE
	/* .animate-fade-in-up {
		opacity: 0; // Start invisible
		will-change: opacity, transform;
		// Use direct value for fade-in transition duration (0.5s)
		animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0, 1) forwards;
	} */

	// Delay utility classes (keep global for utility) - REMOVE
	/* .animate-delay-0 {
		animation-delay: 0ms;
	}
	.animate-delay-200 {
		animation-delay: 200ms;
	}
	.animate-delay-400 {
		animation-delay: 400ms;
	}
	.animate-delay-600 {
		animation-delay: 600ms;
	}
	.animate-delay-1000 {
		animation-delay: 1000ms;
	} */

	/* --------------------------------------------------
	 Reduced Motion Preferences
   -------------------------------------------------- */
	@media (prefers-reduced-motion: reduce) {
		/* .animate-fade-in-up {
			animation: none;
			opacity: 1;
			transform: none;
		} */

		// Optionally keep the global transition disable from best practices
		*, /* Apply to all elements for broad coverage */
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}
</style>
