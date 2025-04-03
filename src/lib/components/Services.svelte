<script lang="ts">
	// Import Svelte utilities and custom transitions
	// Assuming animations.js is in the correct path, otherwise this would need to be updated
	import { fadeInUpTransition } from '../utils/animations.js';
	// Import the new ServiceCard component (use proper import for module)
	import ServiceCard from './ServiceCard.svelte';
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
			icon: '/assets/landing-page/lightbulb-solid.svg', // Icon associated with this step
			iconAlt: 'Energy audit icon',
			title: 'Free Energy Audits',
			description:
				'Quickly find and fix energy waste in your home or business. Expert audits for fast savings.', // Main point: fast, expert audits for savings
			image: '/assets/landing-page/stepper/card-01.jpeg',
			imageAlt: 'Technician performing an energy audit with equipment.' // More descriptive alt text
		},
		{
			id: 2,
			icon: '/assets/landing-page/dollar.svg',
			iconAlt: 'Cost savings icon',
			title: 'Tailored Consulting',
			description:
				'Custom eco-strategies to save energy and resources. Achieve your sustainability goals faster.', // Main point: custom strategies for faster sustainability
			image: '/assets/landing-page/news/lights.png',
			imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.' // More descriptive alt text
		},
		{
			id: 3,
			icon: '/assets/landing-page/list-check-solid.svg',
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

<section id="services" class="stepper-section" aria-labelledby="services-title">
	<div class="stepper">
		<header
			class="stepper__header"
			in:fadeInUpTransition={{
				delay: animationConfig.headerDelay,
				duration: animationConfig.duration
			}}
		>
			<p class="stepper__label">{header.label}</p>
			<h2 id="services-title" class="stepper__title">{header.title}</h2>
			<p class="stepper__description">{header.description}</p>
		</header>

		<div
			class="stepper__timeline-container"
			in:fadeInUpTransition={{
				delay: animationConfig.stepperDelay,
				duration: animationConfig.duration
			}}
		>
			<div class="stepper__line" aria-hidden="true"></div>

			<div
				class="stepper__circle stepper__circle--arrow"
				aria-hidden="true"
				in:fadeInUpTransition={{
					delay: animationConfig.circleBaseDelay,
					duration: animationConfig.duration
				}}
			>
				↓
			</div>

			{#each steps as step, i}
				<div
					class="stepper__circle"
					role="img"
					aria-label={`Step ${step.id}: ${step.iconAlt || step.title}`}
					in:fadeInUpTransition={{
						delay: animationConfig.circleBaseDelay + animationConfig.circleIncrement * (i + 1),
						duration: animationConfig.duration
					}}
				>
					{#if step.icon}
						<img
							class="circle__icon"
							src={step.icon}
							alt=""
							width="20"
							height="20"
							loading="lazy"
						/>
					{:else}
						<span class="circle__label">{String(step.id).padStart(2, '0')}</span>
					{/if}
				</div>
			{/each}
		</div>

		{#each steps as step, i}
			<!-- Wrap ServiceCard in a div and apply transition here -->
			<div
				in:fadeInUpTransition={{
					delay: animationConfig.cardBaseDelay + animationConfig.circleIncrement * i,
					duration: animationConfig.duration
				}}
			>
				<ServiceCard {...step} />
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	*,
	*::before,
	*::after,
	*::backdrop {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	/* --- Component SCSS Variables --- */
	// Define variables specific to this component, potentially derived from global tokens if needed
	$stepper-circle-size: 3rem; // 48px
	$stepper-line-width: 0.125rem;
	// $card-max-width: 65ch; // Moved to ServiceCard.svelte
	$icon-size: 1.25rem; // 20px

	/* Apply box-sizing globally if not already done */
	// :global(*, *::before, *::after) { // Consider if this is necessary or handled globally
	// 	box-sizing: border-box;
	// }

	/* --- Stepper Section --- */
	.stepper-section {
		inline-size: 100%;
		height: 100%;
		max-inline-size: $PAGE_MAX_WIDTH;
		overflow: hidden;
	}

	/* --- Main Stepper Layout --- */
	.stepper {
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--page-inline-padding); // Use global variable
		position: relative;
		z-index: 1;

		display: grid;
		grid-template-areas:
			'header header'
			'timeline card-1'
			'timeline card-2'
			'timeline card-3';
		grid-template-columns: auto 1fr;
		// Use spacing variables where possible, keep custom values if necessary
		gap: spacing(not-related);

		&__header {
			grid-area: header;
			text-align: center;
			text-wrap: balance;
			margin-bottom: spacing(not-related);
		}

		&__label {
			@extend %text-label--secondary;
			margin-bottom: spacing(semi-related);
		}

		&__title {
			@extend %h2;
			max-inline-size: 20ch;
			margin-bottom: spacing(semi-related);
		}

		&__description {
			@extend %p;
			max-inline-size: 50ch;
		}

		// --- Timeline Container (Line and Circles) ---
		&__timeline-container {
			grid-area: timeline;
			position: relative;
			@extend %flex-col-center;
			gap: spacing(not-related);
			padding-block: spacing(md);

			// Sticky positioning
			position: sticky;
			top: 2rem; // = primitive-spacing(xl)
			align-self: start;
			height: fit-content;
		}

		// --- Timeline Line ---
		&__line {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			// Adjust top/bottom to align with edges of first/last *numbered* circles
			top: 5.5rem; // Was: calc($stepper-circle-size / 2) -> Calculated as padding-top (1rem) + arrow-height (3rem) + gap (1.5rem)
			bottom: 1rem; // Was: calc($stepper-circle-size / 2) -> Calculated as padding-bottom (1rem)
			width: $stepper-line-width; // Use local SCSS variable
			background-color: var(--color-secondary-900);
			z-index: 1;
			border-radius: 1px; // Keep slight rounding
		}

		// --- Stepper Circles ---
		&__circle {
			width: $stepper-circle-size; // Use local SCSS variable
			height: $stepper-circle-size; // Use local SCSS variable
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			border: 2px solid var(--color-light);
			// Combine custom shadow with global variable
			box-shadow:
				0 2px 8px rgba(0, 0, 0, 0.15),
				var(--shadow-medium--secondary);
			z-index: 2;
			position: relative;
			// Keep custom transition duration
			transition:
				transform 0.2s ease-out,
				filter 0.2s ease-out;
			cursor: default;

			&:hover {
				transform: scale(1.1); // Keep custom scale
				filter: brightness(1.1);
			}

			// Style for the initial arrow circle
			&--arrow {
				background: var(--color-neutral);
				color: var(--color-light);
				font-size: 1.5rem; // Keep custom size
				font-weight: bold;
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Keep simpler custom shadow
				border-color: transparent;
			}

			.circle__icon {
				width: $icon-size; // Use local SCSS variable
				height: $icon-size; // Use local SCSS variable
				object-fit: contain;
				filter: invert(1) drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3)); // Keep custom filter
			}

			.circle__label {
				color: var(--color-light);
				font-size: var(--p); // Use global p size (1rem)
				font-weight: 600;
				filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3)); // Keep custom filter
			}
		}
	}

	/* --- Responsive Layout (Tablet/Desktop) --- */
	@media (min-width: 768px) {
		.stepper {
			grid-template-areas:
				'header   header   header'
				'.        timeline .     '
				'card-1   timeline .     ' // Grid areas defined here
				'.        timeline card-2'
				'card-3   timeline .     '; // Grid areas defined here
			grid-template-columns: 1fr auto 1fr;
			grid-template-rows: auto auto 1fr 1fr 1fr;
			align-items: start;
			// Keep custom gaps
			gap: 4rem 3rem;

			&__timeline-container {
				grid-column: 2;
				position: sticky;
				top: 5rem; // Keep custom sticky offset
				height: calc(100vh - 10rem); // Keep custom height calculation
				padding-block: 2rem; // = primitive-spacing(xl)
				gap: 5rem; // Keep custom gap
			}

			&__line {
				// Adjust top/bottom based on new padding/gap/size if needed, using calc with SCSS var
				// top: calc($stepper-circle-size / 2 + 2rem); // Example adjustment based on padding
				// bottom: calc($stepper-circle-size / 2 + 2rem); // Example adjustment based on padding
				// --- START MEDIA QUERY OVERRIDE ---
				top: 10rem; // Calculated as padding-top (2rem) + arrow-height (3rem) + gap (5rem)
				bottom: 2rem; // Calculated as padding-bottom (2rem)
				// --- END MEDIA QUERY OVERRIDE ---
			}

			// &__card { ... } // Responsive card styles moved to ServiceCard.svelte
		}
	}

	/* --- Accessibility: Reduced Motion --- */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			transition-delay: 0ms !important;
			scroll-behavior: auto !important;
		}
	}
</style>
