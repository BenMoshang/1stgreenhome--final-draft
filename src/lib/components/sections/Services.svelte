<script lang="ts">
	// Import Svelte utilities and custom transitions
	import { fadeInUpTransition } from '../../utils/animations.js';
	// Import the ServiceCard component
	import ServiceCard from '../ServiceCard.svelte';

	// --- Type Definitions ---
	// Consolidate step data into a single interface for better cohesion
	interface StepperStep {
		id: number; // Unique identifier for the step
		icon?: string; // Optional: Path to the icon SVG for the circle
		iconAlt?: string; // Optional: Alt text for the icon
		title: string; // Title for the card
		description: string; // Description for the card
		image: string; // Image path for the card
		imageAlt: string; // Alt text for the card image
	}

	// Interface for the header section
	interface StepperHeader {
		label: string;
		title: string;
		description: string;
	}

	// --- Component State ---
	// Header data remains separate as it serves a different purpose
	const header = $state<StepperHeader>({
		label: 'EXPLORE WHAT WE OFFER',
		title: 'Discover Our Range of Services',
		description:
			'We provide a range of services designed to help you cut costs, lower energy consumption, and promote environmental sustainability.'
	});

	// Combine circle and card data into a single array of steps
	// This makes the relationship between steps explicit and simplifies the template
	const steps = $state<StepperStep[]>([
		{
			id: 1,
			icon: '/assets/new-icons/lightning.svg', // Icon associated with this step
			iconAlt: 'Energy audit icon',
			title: 'Free Energy Audits',
			description:
				'Quickly find and fix energy waste in your home or business. Expert audits for fast savings.', // Main point: fast, expert audits for savings
			image: '/assets/landing-page/stepper/card-01.jpeg',
			imageAlt: 'Technician performing an energy audit with equipment.' // More descriptive alt text
		},
		{
			id: 2,
			icon: '/assets/new-icons/light-bulb.svg',
			iconAlt: 'Cost savings icon',
			title: 'Tailored Consulting',
			description:
				'Custom eco-strategies to save energy and resources. Achieve your sustainability goals faster.', // Main point: custom strategies for faster sustainability
			image: '/assets/lights.webp',
			imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.' // More descriptive alt text
		},
		{
			id: 3,
			icon: '/assets/new-icons/briefcase.svg',
			iconAlt: 'Project management icon',
			title: 'End-to-End Management',
			description:
				'We handle your energy projects from start to finish. Smooth, timely, and cost-effective upgrades.', // Main point: complete, smooth, cost-effective project management
			image: '/assets/landing-page/stepper/card-03.jpeg',
			imageAlt: 'Team collaborating on an energy project plan.' // More descriptive alt text
		}
	]);

	// Define transition delays for staggering animations
	const animationConfig = {
		headerDelay: 0,
		stepperDelay: 300, // Start stepper animation slightly after header
		circleBaseDelay: 400, // Base delay for the first circle
		circleIncrement: 100, // Increment delay for subsequent circles
		cardBaseDelay: 600, // Base delay for the first card
		duration: 500 // Standard duration for animations
	};
</script>

<section class="stepper-section">
	<header class="stepper-section__header">
		<small class="stepper-section__header--label">{header.label}</small>
		<h2 class="stepper-section__header--title">{header.title}</h2>
		<p class="stepper-section__header--description">{header.description}</p>
	</header>
	<div class="stepper-section__line"></div>

	<img
		id="stepper__icon-1"
		class="stepper__icon"
		src={steps[0].icon}
		alt=""
		width="20"
		height="20"
		loading="lazy"
	/>

	<ServiceCard {...steps[0]} />

	<img
		id="stepper__icon-2"
		class="stepper__icon"
		src={steps[1].icon}
		alt=""
		width="20"
		height="20"
		loading="lazy"
	/>

	<ServiceCard {...steps[1]} />

	<img
		id="stepper__icon-3"
		class="stepper__icon"
		src={steps[2].icon}
		alt=""
		width="20"
		height="20"
		loading="lazy"
	/>

	<ServiceCard {...steps[2]} />
</section>

<style lang="scss">
	/* Section container */
	.stepper-section {
		/* Variables */
		--icon-size: 2rem;

		inline-size: 100%;
		padding-block: 2rem;
		display: grid;
		place-content: center;

		/* Mobile layout (default) */
		grid-template-areas:
			'header header'
			'icon1 card1'
			'icon2 card2'
			'icon3 card3';
		grid-column-gap: 2rem;
		grid-row-gap: clamp(2rem, 1.818rem + 0.91vw, 2.5rem);
		justify-items: start;
		align-items: start;
		grid-template-columns: 2rem 1fr;
		grid-template-rows: auto auto auto auto;
		position: relative;

		/* Assign grid areas to children */
		& #stepper__icon-1 {
			grid-area: icon1;
		}
		& #stepper__icon-2 {
			grid-area: icon2;
		}
		& #stepper__icon-3 {
			grid-area: icon3;
		}
		/* Make cards take full width */
		:global(#stepper__card-1) {
			grid-area: card1;
			justify-self: center;
		}
		:global(#stepper__card-2) {
			grid-area: card2;
			justify-self: center;
		}
		:global(#stepper__card-3) {
			grid-area: card3;
			justify-self: center;
		}

		&__header {
			grid-area: header;
		}

		&__line {
			grid-column: 1 / 1;
			grid-row: 2 / 4;
			--icon-size: 2rem;
			position: absolute;
			width: 0.25rem;
			background-color: var(--accent-color);
			z-index: -2;

			/* Mobile: Vertical line connecting icons */
			left: calc(var(--icon-size) / 2);
			top: calc(var(--icon-size) + var(--icon-size) + 2rem); /* Start below icon1 */
			height: calc(100% - var(--icon-size) * 3 - 4rem); /* Connect down to icon3 */
			transform: translateX(-50%);
		}

		/* Header elements */
		&__header {
			@extend %flex-col-center;
			max-width: 65ch;
			margin-inline: auto;
			text-align: center;
			margin-bottom: 2rem;
			&--label {
				@extend %text-label--secondary;
				margin-bottom: 1.5rem;
			}
			&--title {
				@extend %h2;
				max-width: 20ch;
				color: $light-1;
				margin-bottom: spacing(semi-related);
			}

			&--description {
				@extend %p;
				color: $light-2;
				max-width: 50ch;
			}
		}

		/* Desktop layout (48rem and up) */
		@media (min-width: 48rem) {
			grid-template-areas:
				'header header header'
				'.      icon1  card1'
				'card2  icon2  .'
				'.      icon3  card3';

			grid-template-columns: 1fr 2rem 1fr;
			grid-template-rows: auto auto auto auto;

			&__line {
				/* Desktop: Vertical line centered in middle column */
				left: 50%;
				top: calc(var(--icon-size) * 1.5 + 4rem); /* Start below first icon */
				height: calc(100% - var(--icon-size) * 3 - 6rem); /* End at last icon */
			}
		}
	}

	/* Icon styling */
	.stepper__icon {
		position: sticky;
		top: 2rem;
		width: 2rem;
		height: 2rem;
		padding: 0.5rem;
		object-fit: cover;
		border-radius: 50%;

		box-shadow: var(--shadow-medium--secondary);
		background: #e7ece9;
		z-index: 1; /* Ensure icons appear above the line */
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		* {
			transition-duration: 0.01ms !important;
		}
	}
</style>
