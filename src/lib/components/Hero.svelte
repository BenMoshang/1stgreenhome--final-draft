<script lang="ts">
	// Import required modules
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import FolderButton from '$lib/components/buttons/FolderButton.svelte';

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
			subtitle: `Save money, cut energy use, and protect the planet. `,
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

	// Function to handle button click (email)
	function handleEmailClick() {
		// Create a temporary anchor element
		const mailtoLink = document.createElement('a');
		const emailAddress = 'info@1stgreenhome.com';
		mailtoLink.href = `mailto:${emailAddress}?subject=Get Started with 1st Green Home`;
		mailtoLink.target = '_self'; // Force same window/tab behavior
		mailtoLink.rel = 'noopener noreferrer';

		// Append to body, click it, then remove it
		document.body.appendChild(mailtoLink);
		mailtoLink.click();
		document.body.removeChild(mailtoLink);

		// Add this if you want to provide a fallback for users without email client configured
		setTimeout(() => {
			// If no client opened (check could happen here), offer to copy email to clipboard
			if (confirm('Would you like to copy our email address to your clipboard instead?')) {
				navigator.clipboard
					.writeText(emailAddress)
					.then(() => alert('Email address copied to clipboard!'))
					.catch((err) => console.error('Failed to copy: ', err));
			}
		}, 500);
	}

	// Svelte custom transition function for fade in up effect
	const fadeInUpTransition = (node: Element, { delay = 0, duration = 500, y = 30 } = {}) => {
		// Get computed style to avoid overriding existing transforms
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			delay,
			duration,
			easing: cubicOut, // Matches the original CSS animation's timing function more closely
			css: (t: number, u: number) => `
				opacity: ${t};
				transform: ${transform} translateY(${y * u}px);
			`
			// t ranges from 0 to 1 (start to end), u is 1 - t
		};
	};

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
	<section id="hero" class="section__default hero">
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
			<p class="hero__label" in:fadeInUpTransition={{ delay: 0, duration: 500 }}>
				{hero.label}
			</p>
			<h1 class="hero__title" in:fadeInUpTransition={{ delay: 200, duration: 500 }}>
				{hero.title0 + hero.title}
				<span class="hero__title-gradient">{hero.title2}</span>
			</h1>
			<p class="hero__subtitle" in:fadeInUpTransition={{ delay: 400, duration: 500 }}>
				{hero.subtitle + hero.subtitle2}
			</p>

			<div in:fadeInUpTransition={{ delay: 600, duration: 500 }}>
				<FolderButton text={hero.button} onClick={handleEmailClick} />
			</div>
		</header>
	</section>
{/if}

<style lang="scss">
	// No global imports needed here; rely on gloably available CSS custom properties from app.scss
	/* Apply box-sizing globally if not already done */
	*,
	*::before,
	*::after,
	*::backdrop {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	/* --------------------------------------------------
     Main Container -> Renamed to Hero Section
   -------------------------------------------------- */

	/* --------------------------------------------------
     Hero Container
   -------------------------------------------------- */
	.hero {
		display: grid;
		grid-template-areas: 'main-text' 'visuals'; // Mobile first
		grid-template-columns: 1fr;
		gap: clamp(2rem, 1.818rem + 0.91vw, 2.5rem);
		width: 100%;
		height: 100%;

		/* --------------------------------------------------
		 Hero Text Container (Element)
	   -------------------------------------------------- */
		&__text {
			grid-area: main-text;
			place-self: center;
			@extend %flex-col-center;
			width: 100%;
			text-align: center;
			max-width: 30rem;
		}

		/* --------------------------------------------------
		 Hero Elements within Text Container
	   -------------------------------------------------- */
		&__label {
			@extend %text-label--primary;
			margin-bottom: 1.5rem;
		}

		&__title {
			@extend %h1;

			margin-bottom: spacing(semi-related);
		}

		&__title-gradient {
			@extend %h1;

			// Inherits font styles from parent H1
			color: transparent;
			// A11Y Contrast Check: Gradient text can be tricky. Ensure sufficient contrast exists *throughout* the gradient's transition against the background. Test thoroughly.
			background: var(--gradient-text); // Use text gradient CSS var
			background-size: 200% 200%;
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			animation: gradient-loop 5s ease-in-out infinite;
		}

		&__subtitle {
			@extend %p;
			margin-bottom: spacing(not-related);
		}

		/* --------------------------------------------------
		 Image Container (Element)
	   -------------------------------------------------- */
		&__image-container {
			grid-area: visuals;
			place-self: center;
			@extend %flex-center;
			position: relative;
			width: 100%;
			max-width: 30rem; // Keep max-width on smaller screens

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
			}

			&::before {
				background-image: url(/assets/landing-page/abstract.webp);
				background-size: cover;
				mix-blend-mode: screen;
				filter: brightness(1.1);
				background-position: 0% 100%;
				z-index: 0;
			}

			&::after {
				background: hsl(157, 75%, 10%); // Use gradient CSS var
				box-shadow: var(--shadow-medium--light); // Use shadow var with fallback
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				z-index: -1;
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
			filter: saturate(1.2) drop-shadow(0.3125rem 0.3125rem 0.5rem hsla(151deg, 25%, 61%, 0.46));
		}

		/* --------------------------------------------------
		 Media Queries (Laptop View Adjustments)
	   -------------------------------------------------- */
		// 75rem = 1200px. Use em for accessibility (1200/16 = 75em)
		@media (min-width: 73em) {
			// Adjustments for the .hero block itself
			grid-template-areas: 'main-text visuals';
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem 2rem; // row / column
			align-items: center;

			// Adjustments for elements within .hero
			&__text {
				text-align: left;
				align-items: flex-start;
			}

			&__label {
			}

			&__image-container {
				max-width: none;
				width: 100%; // Allow grid to size
				height: 100%;
				justify-self: center; // Center visually within its column
			}
		}
	}

	/* --------------------------------------------------
	 Reduced Motion Preferences
   -------------------------------------------------- */
	@media (prefers-reduced-motion: reduce) {
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
