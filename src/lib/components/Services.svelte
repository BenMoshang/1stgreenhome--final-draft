<script lang="ts">
	// Import Svelte utilities and custom transitions
	import { fadeInUpTransition } from '../utils/animations.js';
	// Import the ServiceCard component
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

<section id="services" class="stepper-section" aria-labelledby="services-title">
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

	<div class="stepper">
		<div class="stepper__line" aria-hidden="true"></div>

		<!-- Arrow circle - positioned separately for clarity -->
		<div
			class="arrow stepper__circle stepper__circle--arrow"
			aria-hidden="true"
			in:fadeInUpTransition={{
				delay: animationConfig.circleBaseDelay,
				duration: animationConfig.duration
			}}
		>
			↓
		</div>

		<!-- Service 1 Circle -->
		<div
			class="stepper__circle stepper__circle--1"
			role="img"
			aria-label={`Step ${steps[0].id}: ${steps[0].iconAlt || steps[0].title}`}
			in:fadeInUpTransition={{
				delay: animationConfig.circleBaseDelay + animationConfig.circleIncrement,
				duration: animationConfig.duration
			}}
		>
			<img
				class="stepper__circle-icon"
				src={steps[0].icon}
				alt=""
				width="20"
				height="20"
				loading="lazy"
			/>
		</div>

		<!-- Service 1 Card -->
		<div
			class="stepper__card stepper__card--1"
			in:fadeInUpTransition={{
				delay: animationConfig.cardBaseDelay,
				duration: animationConfig.duration
			}}
		>
			<ServiceCard {...steps[0]} />
		</div>

		<!-- Service 2 Circle -->
		<div
			class="stepper__circle stepper__circle--2"
			role="img"
			aria-label={`Step ${steps[1].id}: ${steps[1].iconAlt || steps[1].title}`}
			in:fadeInUpTransition={{
				delay: animationConfig.circleBaseDelay + animationConfig.circleIncrement * 2,
				duration: animationConfig.duration
			}}
		>
			<img
				class="stepper__circle-icon"
				src={steps[1].icon}
				alt=""
				width="20"
				height="20"
				loading="lazy"
			/>
		</div>

		<!-- Service 2 Card -->
		<div
			class="stepper__card stepper__card--2"
			in:fadeInUpTransition={{
				delay: animationConfig.cardBaseDelay + animationConfig.circleIncrement,
				duration: animationConfig.duration
			}}
		>
			<ServiceCard {...steps[1]} />
		</div>

		<!-- Service 3 Circle -->
		<div
			class="stepper__circle stepper__circle--3"
			role="img"
			aria-label={`Step ${steps[2].id}: ${steps[2].iconAlt || steps[2].title}`}
			in:fadeInUpTransition={{
				delay: animationConfig.circleBaseDelay + animationConfig.circleIncrement * 3,
				duration: animationConfig.duration
			}}
		>
			<img
				class="stepper__circle-icon"
				src={steps[2].icon}
				alt=""
				width="20"
				height="20"
				loading="lazy"
			/>
		</div>

		<!-- Service 3 Card -->
		<div
			class="stepper__card stepper__card--3"
			in:fadeInUpTransition={{
				delay: animationConfig.cardBaseDelay + animationConfig.circleIncrement * 2,
				duration: animationConfig.duration
			}}
		>
			<ServiceCard {...steps[2]} />
		</div>
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
	$stepper-circle-size: 2.5rem; // 48px - Keep size for now
	$stepper-line-width: 0.25rem; // 4px - Slightly thicker line for visibility
	$icon-size: 1.25rem; // 20px

	/* --- Stepper Section --- */
	.stepper-section {
		padding-block: 5rem;
		inline-size: 100%;
		height: 100%;
		// Removed fixed height, let content determine height
		position: relative;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 50%; // Center horizontally relative to the section
			transform: translateX(-50%); // Shift back by half its own width to center in viewport
			inline-size: 100vw;
			block-size: 100%;

			background: url('/assets/landing-page/gradient-background.svg');
			background-size: cover;
			background-repeat: no-repeat;
			z-index: -11;
		}
	}

	/* --- Main Stepper Layout --- */
	.stepper {
		width: 100%;
		margin-inline: auto;
		position: relative;
		z-index: 1;

		// MOBILE GRID LAYOUT - Simplified vertical flow
		display: grid;
		grid-template-areas:
			'header  header'
			'arrow   .'
			'circle1 card1'
			'circle2 card2'
			'circle3 card3';
		grid-template-columns: auto 1fr; // Circle takes auto width, card takes rest
		grid-column-gap: spacing(not-related);
		grid-row-gap: clamp(2rem, 1.751rem + 1.06vw, 2.5rem);

		// Position the connecting line (Timeline Axis)
		&__line {
			grid-column: 1 / 1;
			grid-row: 2 / 5;
			inline-size: 100%;
			block-size: calc(100% + 3rem);
			place-self: center;
			position: absolute;
			// Start slightly below first circle, end slightly above last circle bottom edge on mobile
			top: 1rem;
			left: 1.125rem;
			margin: auto;
			// Adjust left positioning to center the line based on its own width and circle size
			width: $stepper-line-width; // Use variable for width
			background-color: #98d1b9; // Use a specific color or token
			z-index: -1000; // Behind circles
			border-radius: $stepper-line-width / 2; // Make ends rounded
		}

		// Header styles
		&__header {
			grid-area: header; // Explicitly assign header to its area
			@extend %flex-col-center;
			text-align: center;
			text-wrap: balance;
			margin-bottom: spacing(not-related); // Use design system spacing
		}

		&__label {
			@extend %text-label--secondary;
			margin-bottom: spacing(semi-related); // Adjusted spacing
		}

		&__title {
			@extend %h2;
			color: $light-1;
			max-inline-size: map-get($layout, max-width-title); // Use map-get for SCSS map access
			margin-bottom: spacing(semi-related); // Adjusted spacing
		}

		&__description {
			@extend %p;
			color: $light-2;
			max-inline-size: 50ch;
		}

		// Grid area assignments remain the same
		&__circle--1 {
			grid-area: circle1;
			justify-self: start; // Align circle to the start (left) on mobile
		}
		&__circle--2 {
			grid-area: circle2;
			justify-self: start;
		}
		&__circle--3 {
			grid-area: circle3;
			justify-self: start;
		}
		&__card--1 {
			grid-area: card1;
			position: sticky;
			top: 1rem;
		}
		&__card--2 {
			grid-area: card2;
			position: sticky;
			top: 1rem;
		}
		&__card--3 {
			grid-area: card3;
			position: sticky;
			top: 1rem;
		}

		// --- Stepper Circles common styles (Timeline Markers) ---
		&__circle {
			position: sticky;
			top: 1rem;
			width: $stepper-circle-size;
			height: $stepper-circle-size;
			padding: 0.75rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%; // Keep circular
			// Use a primary color border for better visibility
			background-color: var(
				--color-secondary-900
			); // Light background for contrast with icon and line
			// Subtle shadow for depth
			box-shadow: var(--shadow-low--secondary);
			border: 1px solid var(--color-accent);
			z-index: 10; // Above the line
			transition: // Keep transitions
				transform map-get($transitions, standard) ease-out,
				box-shadow map-get($transitions, standard) ease-out;
			cursor: default; // Not interactive

			&:hover {
				transform: scale(1.08); // Slightly less pronounced hover scale
				box-shadow:
					0 5px 10px rgba(var(--color-dark-rgb), 0.15),
					0 2px 4px rgba(var(--color-dark-rgb), 0.1); // Enhanced shadow on hover
			}

			&-icon {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
	}

	/* --- Responsive Layout (Tablet/Desktop - Modern Timeline) --- */
	@media (min-width: 768px) {
		.stepper {
			// DESKTOP GRID LAYOUT - Alternating timeline
			grid-template-areas:
				'header header header' // Header spans all columns
				'.        arrow             .'
				'.      circle1 card1' // Step 1: Circle center, Card right
				'card2  circle2 .' // Step 2: Card left, Circle center
				'.      circle3 card3'; // Step 3: Circle center, Card right
			// Define columns: Left card area, Center axis (auto width), Right card area
			grid-template-columns: 1fr auto 1fr;
			// Remove arrow row and adjust others
			grid-template-rows: auto auto auto auto;
			align-items: center; // Vertically center items in their row for better alignment
			// Use design system gaps - larger gap between rows, standard between columns
			&__line {
				grid-column: 2 / 2;
				grid-row: 2 / 5;
			}
			// Center the circles on the timeline axis
			&__circle {
				align-self: start;
			}

			// Ensure cards align correctly to their side
			&__card--1 {
				grid-column: 3 / 4; // Ensure card 1 is in the right column
				justify-self: start;
				align-self: center; // Vertically center card
			}
			&__card--2 {
				grid-column: 1 / 2; // Ensure card 2 is in the left column
				justify-self: end;
				align-self: center; // Vertically center card
			}
			&__card--3 {
				grid-column: 3 / 4; // Ensure card 3 is in the right column
				justify-self: start;
				align-self: center; // Vertically center card
			}
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
	.arrow {
		position: sticky;
		top: 1rem;
		grid-area: arrow;
		color: var(--color-light);
		font-size: 1.125rem;
		font-weight: 600;
		position: relative;
		text-transform: uppercase;
		text-wrap: nowrap;
	}
</style>
