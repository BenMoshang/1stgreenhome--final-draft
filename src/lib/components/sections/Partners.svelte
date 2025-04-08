<script lang="ts">
	// Import dependencies
	import { fadeInUpTransition } from '$lib/utils/animations.js';

	// Header data using Svelte 5 Runes
	const header = $state({
		label: 'POWERED BY OUR PARTNERS',
		title: 'Partnered with Leading Energy Providers',
		description:
			'Partnering with top energy providers, we deliver reliable, eco-friendly solutions that drive a greener, more sustainable future.'
	});

	// Partners data using Svelte 5 Runes
	const partners = $state([
		{ imageSrc: `/assets/landing-page/partners/logo-pepco.svg` },
		{ imageSrc: `/assets/landing-page/partners/logo-bge.svg` },
		{ imageSrc: `/assets/landing-page/partners/lgo.svg` },
		{ imageSrc: `/assets/landing-page/partners/logo-pmed.png` }
	]);

	const partnersReverse = $state([
		{ imageSrc: `/assets/landing-page/partners/EmPOWER_Color.png` },
		{ imageSrc: `/assets/landing-page/partners/logo-energy-star.png` },
		{ imageSrc: `/assets/landing-page/partners/logo-SouthernMarylandElectricCooperative.svg` },
		{ imageSrc: `/assets/landing-page/partners/logo-bpi.png` }
	]);

	// Animation delays for staggered animations
	const animationDelays = {
		label: 0,
		title: 200,
		description: 400,
		partners: 600
	};
</script>

<section id="partners" class="partners-section">
	<header class="partners-section__header">
		<p class="partners-section__label" in:fadeInUpTransition={{ delay: animationDelays.label }}>
			{header.label}
		</p>
		<h2 class="partners-section__title" in:fadeInUpTransition={{ delay: animationDelays.title }}>
			{header.title}
		</h2>
		<p
			class="partners-section__description"
			in:fadeInUpTransition={{ delay: animationDelays.description }}
		>
			{header.description}
		</p>
	</header>

	<!-- Partners Container Forward -->
	<div
		class="partners-section__container"
		in:fadeInUpTransition={{ delay: animationDelays.partners }}
	>
		{#each partners as partner, i}
			<div class="partner-item" id="forward{i}">
				<img
					class="partner-item__logo"
					src={partner.imageSrc}
					alt="Partner logo"
					loading="lazy"
					width="100"
					height="100"
				/>
			</div>
		{/each}
	</div>

	<!-- Partners Container Reverse -->
	<div
		class="partners-section__container"
		in:fadeInUpTransition={{ delay: animationDelays.partners }}
	>
		{#each partnersReverse as partner, i}
			<div class="partner-item" id="reverse{i}">
				<img
					class="partner-item__logo"
					src={partner.imageSrc}
					alt="Partner logo"
					loading="lazy"
					width="100"
					height="100"
				/>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	/* General styles */
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		z-index: 3;
	}

	/* Partners section */
	.partners-section {
		width: 100%;
		height: 100%;
		max-inline-size: $PAGE_MAX_WIDTH;
		margin-inline: auto;
		padding: var(--padding-section);
		display: flex;
		flex-direction: column;
		gap: clamp(1.125rem, 0.201rem + 3.94vw, 3.75rem);
	}

	/* Header section */
	.partners-section__header {
		@extend %flex-col-center;
		text-align: center;
		gap: 0.9375rem;

		.partners-section__label {
			@extend %text-label--secondary;
			margin-bottom: 1rem;
		}

		.partners-section__title {
			@extend %h2;
			color: $light-1;
			max-width: 20ch;
		}

		.partners-section__description {
			@extend %p;
			color: $light-2;
			max-width: var(--max-width-description);
		}
	}

	/* Partners container */
	.partners-section__container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
		padding-block: 0.9375rem;
	}

	/* Partner item */
	.partner-item {
		flex: 1 1 45%;
		@extend %flex-center;
		padding: 1rem;
		border-radius: var(--border-radius);
		background: var(--convex-light);
		box-shadow: var(--shadow-medium--secondary);
		outline: 0.0625rem solid var(--color-light);
		max-width: 100%;
		transition: transform 0.3s ease-in-out;

		&:hover {
			transform: scale(1.05);
		}
	}

	/* Partner logo */
	.partner-item__logo {
		object-fit: contain;
		width: 100%;
		height: 8rem;
		max-width: 12.6875rem;
		filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
	}

	/* Individual styles for partners */
	#forward0,
	#forward1,
	#forward2 {
		background: linear-gradient(145deg, #eee4fa, #77618f);
	}

	#forward3 {
		background: linear-gradient(145deg, #f0ffff, #69c1da);
	}

	#reverse1,
	#reverse0 {
		background: linear-gradient(145deg, #f0ffff, #69c1da);
	}

	#reverse3 {
		background: linear-gradient(145deg, #e3fdf2, #faffc9);
	}

	#reverse2 {
		background: linear-gradient(145deg, #e3fdf2, #faffc9);
	}

	/* Responsive design */
	@media (min-width: 50.625rem) {
		.partner-item {
			flex: 1 1 22%;
		}
	}

	@media (min-width: 75rem) {
		.partners-section__container {
			gap: 2rem;
		}
	}

	/* Reduced Motion Preferences */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}
</style>
