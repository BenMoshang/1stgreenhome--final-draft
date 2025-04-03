<script lang="ts">
	// Import Svelte utilities and custom transitions
	import { fadeInUpTransition } from '$lib/utils/animations.js';

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
				'Identify and eliminate energy waste in your home or business. Our expert audits provide actionable insights to reduce costs and enhance sustainability.',
			image: '/assets/landing-page/stepper/card-01.jpeg',
			imageAlt: 'Technician performing an energy audit with equipment.' // More descriptive alt text
		},
		{
			id: 2,
			icon: '/assets/landing-page/dollar.svg',
			iconAlt: 'Cost savings icon',
			title: 'Tailored Consulting',
			description:
				'Implement eco-friendly practices with our customized strategies. We help you save energy and resources while achieving your sustainability goals.',
			image: '/assets/landing-page/news/lights.png',
			imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.' // More descriptive alt text
		},
		{
			id: 3,
			icon: '/assets/landing-page/list-check-solid.svg',
			iconAlt: 'Project management icon',
			title: 'End-to-End Management',
			description:
				'Let us handle your energy projects from start to finish. Our comprehensive management ensures smooth, timely, and cost-effective energy upgrades.',
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
			<article
				id={`step-card-${step.id}`}
				class="stepper__card"
				aria-labelledby={`step-title-${step.id}`}
				in:fadeInUpTransition={{
					delay: animationConfig.cardBaseDelay + animationConfig.circleIncrement * i, // Stagger card animation
					duration: animationConfig.duration
				}}
			>
				<figure class="card__image-container">
					<img
						class="card__image"
						src={step.image}
						alt={step.imageAlt}
						width="400"
						height="300"
						loading="lazy"
						fetchpriority="low"
					/>
				</figure>

				<div class="card__content">
					<h3 id={`step-title-${step.id}`} class="card__title">{step.title}</h3>
					<p class="card__description">{step.description}</p>
				</div>
			</article>
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
	$stepper-line-width: 2px;
	$card-max-width: 65ch; // Specific max-width for service cards
	$icon-size: 1.25rem; // 20px

	/* Apply box-sizing globally if not already done */
	// :global(*, *::before, *::after) { // Consider if this is necessary or handled globally
	// 	box-sizing: border-box;
	// }

	/* --- Stepper Section --- */
	.stepper-section {
		inline-size: 100%;
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
			'header'
			'timeline'
			'card-1'
			'card-2'
			'card-3';
		grid-template-columns: 1fr;
		// Use spacing variables where possible, keep custom values if necessary
		gap: 3rem 1.5rem; // 3rem doesn't map directly, 1.5rem = primitive-spacing(lg) / var(--spacing-lg) if defined

		// --- Header ---
		&__header {
			grid-area: header;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem; // = primitive-spacing(md) / var(--spacing-md)
			text-align: center;
			text-wrap: balance;
			margin-bottom: 2rem; // = primitive-spacing(xl) / var(--spacing-xl)
		}

		&__label {
			display: inline-block;
			// Use spacing variables
			padding: 0.5rem 1.5rem; // = primitive-spacing(xs) primitive-spacing(lg)
			font-family: var(--font-family-bold);
			font-size: var(--label-p);
			line-height: var(--label-line-height, 1.5); // Use global var, fallback if not defined in root
			color: var(--color-secondary);
			background-color: var(--color-light);
			border-radius: var(--rounded-border-radius); // Use global pill radius
			box-shadow: var(--shadow-medium--secondary);
			border: 1px solid var(--color-secondary-900);
		}

		&__title {
			color: var(--color-dark);
			max-width: var(--max-width-title); // Use global title max-width
			font-size: var(--h2); // Use global H2 size
			// Inherits font-family, weight, etc from %heading via .text-h2 if class is applied, or set manually
			font-family: var(--font-family-bold);
			font-weight: 600; // Match %h2 weight
			line-height: 1.1; // Match %heading line-height
			letter-spacing: -0.03em; // Match %heading
			text-wrap: balance; // Match %heading
		}

		&__description {
			color: var(--color-p);
			max-width: var(--max-width-description); // Use global description max-width
			font-size: var(--p); // Use global paragraph size
			line-height: var(--line-height-p, 1.6); // Use global p line-height, fallback
			// Inherits font-family from body or set explicitly
			font-family: var(--font-family-regular); // Assuming regular for descriptions
			text-wrap: pretty;
		}

		// --- Timeline Container (Line and Circles) ---
		&__timeline-container {
			grid-area: timeline;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 3rem; // Keep custom gap
			padding-block: 1rem; // = primitive-spacing(md)

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
			// Use local SCSS variable for circle size calculation
			top: calc($stepper-circle-size / 2);
			bottom: calc($stepper-circle-size / 2);
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

		// --- Stepper Cards ---
		&__card {
			grid-area: var(--card-area);
			background-color: var(--color-light);
			border-radius: var(--border-radius); // Use global border radius
			box-shadow: var(--shadow-medium--secondary);
			overflow: hidden;
			display: flex;
			flex-direction: column;
			max-width: $card-max-width; // Use local SCSS variable
			width: 100%;
			justify-self: center;
			position: sticky;
			top: 2rem; // = primitive-spacing(xl)
			z-index: 3;

			&:nth-of-type(1) {
				--card-area: card-1;
			}
			&:nth-of-type(2) {
				--card-area: card-2;
			}
			&:nth-of-type(3) {
				--card-area: card-3;
			}
		}

		// --- Card Content ---
		.card {
			&__image-container {
				width: 100%;
				aspect-ratio: 16 / 10;
				overflow: hidden;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					inset: 0;
					background: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 50%);
					pointer-events: none;
				}
			}

			&__image {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
			}

			&__content {
				// Use spacing variables where possible
				padding: 1.5rem clamp(1rem, 5vw, 2rem); // 1.5rem = primitive-spacing(lg), keep clamp part
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				gap: 0.75rem; // = primitive-spacing(sm)
			}

			&__title {
				font-size: var(--h3); // Use global H3 size
				color: var(--color-dark);
				font-weight: 600; // Keep component-specific weight (global %h3 is 500)
				line-height: 1.3; // Keep component-specific line-height (global %heading is 1.1)
				text-wrap: pretty;
				font-family: var(--font-family-bold); // Use bold font like other headings
				letter-spacing: -0.03em; // Match %heading
			}

			&__description {
				font-size: var(--p); // Use global p size
				color: var(--color-p);
				line-height: var(--line-height-p, 1.6); // Use global p line-height
				flex-grow: 1;
				font-family: var(--font-family-regular); // Use regular font
				text-wrap: pretty; // Match global %p
			}
		}
	}

	/* --- Decorative Background --- */
	// .stepper__leaves { // Example - this class wasn't in the original HTML provided
	// 	position: absolute;
	// 	inset: 0;
	// 	background-image: url(/assets/landing-page/leaves.svg);
	// 	background-size: cover;
	// 	background-position: center;
	// 	opacity: 0.05;
	// 	filter: invert(1);
	// 	z-index: 0;
	// 	pointer-events: none;
	// }

	/* --- Responsive Layout (Tablet/Desktop) --- */
	@media (min-width: 768px) {
		.stepper {
			grid-template-areas:
				'header   header   header'
				'.        timeline .     '
				'card-1   timeline .     '
				'.        timeline card-2'
				'card-3   timeline .     ';
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
				top: calc($stepper-circle-size / 2 + 2rem); // Example adjustment based on padding
				bottom: calc($stepper-circle-size / 2 + 2rem); // Example adjustment based on padding
			}

			&__card {
				position: sticky;
				top: 5rem; // Match timeline sticky offset
				align-self: start;
				min-height: 300px;

				&:nth-of-type(odd) {
					justify-self: end;
					margin-right: 3rem; // Keep custom margin
				}
				&:nth-of-type(even) {
					justify-self: start;
					margin-left: 3rem; // Keep custom margin
				}
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
</style>
