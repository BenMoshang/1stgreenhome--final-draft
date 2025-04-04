<script lang="ts">
	import { fadeInUpTransition } from '$lib/utils/animations.js';
	import TestimonialCard from '../TestimonialCard.svelte';

	// Header data
	const header = $state({
		title0: 'Over',
		title1: ' 351k+ ',
		title2: 'homes and businesses empowered by our Renewable Energy Solutions.'
	});

	// Testimonials data
	const testimonials = $state([
		{
			pfp: `/assets/landing-page/testimonial/headshot1.jpg`,
			name: `Jack Amoruso`,
			company: `Lumber and Things`,
			statement: `"I couldn't believe the difference retrofit lighting made in our office! Not only did it brighten up the space, but our energy bills have significantly decreased. The installation was quick and easy too. Highly recommend 1st Green Home to any business!"`
		},
		{
			pfp: `/assets/landing-page/testimonial/headshot5.jpg`,
			name: `Rick Schmidt`,
			company: `84 Lumber`,
			statement: `"As a business owner, I was hesitant to switch to retrofit lighting at first, but after seeing the results, I'm so glad I did. Not only does it make my store look more modern, but I've noticed a difference in the quality of light. It's much brighter and more energy efficient. 1st Green Home has made the process super easy and explained the program in great detail to put my mind at ease during the whole process."`
		},
		{
			name: `Lenny Kline`,
			company: `Queen City Flea Market`,
			statement: `"We recently upgraded our warehouse lighting to retrofit LED fixtures through 1st Green Home, and the difference is incredible. Our employees feel safer and more productive with the improved lighting, and we're saving money on our energy bills. It's a win-win!"`,
			pfp: `/assets/landing-page/testimonial/headshot3.jpg`
		},
		{
			pfp: `/assets/landing-page/testimonial/headshot4.jpg`,
			name: `David Shin`,
			company: `Commercial Laundry`,
			statement: `"I've been using retrofit lighting in my store for a few months now, and I'm amazed at the positive feedback from customers. The ambiance is so much better, and I've noticed a decrease in maintenance costs too. Definitely worth the investment."`
		},
		{
			pfp: `/assets/landing-page/testimonial/headshot2.jpg`,
			name: `Oddy Okojie`,
			company: `M&amp;M Bedding`,
			statement: `"I was skeptical about retrofitting my outdoor lighting, but after seeing how much brighter and more inviting my business looks at night, I'm thrilled with the decision. Plus, the added security benefits give me peace of mind."`
		}
	]);

	// Animation delays config
	const animationDelays = {
		title: 200,
		standout: 0,
		marquee: 1000
	};

	// Control for marquee pausing
	let isPaused = $state(false);

	function pauseMarquee() {
		isPaused = true;
	}

	function resumeMarquee() {
		isPaused = false;
	}
</script>

<section id="testimonials" class="testimonials-section">
	<header class="testimonials-section__header">
		<h2
			class="testimonials-section__title"
			in:fadeInUpTransition={{ delay: animationDelays.title }}
		>
			{header.title0}
			<span
				class="testimonials-section__title-standout"
				in:fadeInUpTransition={{ delay: animationDelays.standout }}
			>
				{header.title1}
			</span>
			{header.title2}
		</h2>
	</header>
	<section
		aria-label="Customer testimonials"
		class="testimonials-section__marquee"
		in:fadeInUpTransition={{ delay: animationDelays.marquee }}
		onmouseenter={pauseMarquee}
		onmouseleave={resumeMarquee}
		onfocusin={pauseMarquee}
		onfocusout={resumeMarquee}
	>
		<div
			class="testimonials-section__track"
			class:paused={isPaused}
			role="region"
			aria-label="Customer testimonials"
		>
			{#each testimonials as testimonial, i}
				<TestimonialCard
					pfp={testimonial.pfp}
					name={testimonial.name}
					company={testimonial.company}
					statement={testimonial.statement}
				/>
			{/each}
			{#each testimonials as testimonial, i}
				<TestimonialCard
					pfp={testimonial.pfp}
					name={testimonial.name}
					company={testimonial.company}
					statement={testimonial.statement}
					aria-hidden="true"
				/>
			{/each}
		</div>
	</section>
</section>

<style lang="scss">
	/* --------------------------------------------------
   Testimonials Section Block
-------------------------------------------------- */
	.testimonials-section {
		// Block styles
		padding-block: 5rem;
		inline-size: 100%;
		height: 100%; // Be cautious with fixed height: 100% unless the parent has a defined height.
		display: flex;
		flex-direction: column;
		gap: 2rem;
		overflow-x: hidden; // Prevents horizontal scrollbars from the marquee animation
		max-inline-size: $PAGE_MAX_WIDTH; // Assumes variable is defined
		margin-inline: auto;
		position: relative; // Add position relative
		z-index: 1; // Higher than the background but lower than potential overlays

		// Element: Header
		&__header {
			width: 100%; // Often redundant if parent is block/flex and takes full width
		}

		// Element: Title (within Header, but styled directly)
		&__title {
			@extend %h4; // Assumes placeholder is defined
			color: $light-1;
			text-align: center;
			// Element: Title Standout (nested within Title)
			&-standout {
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
		}

		&__marquee {
			--gap: spacing(not-related); // Local scope for gap if only used here
			display: flex;
			gap: var(--gap);
			align-items: stretch; // Good for ensuring cards have same height if content varies
			width: 100%;
			padding-block: 1.25rem; // Adds vertical space around the track
		}

		// Element: Track (within Marquee)
		&__track {
			overflow-x: hidden; // Prevents horizontal scrollbars from the marquee animation

			display: flex;
			gap: 2rem; // Space between individual testimonial cards
			border-radius: var(--border-radius); // Assumes CSS variable is defined
			animation: scroll 20s linear infinite;
			justify-content: flex-start; // Start items from the left
			// The track needs to contain *two* sets of testimonials side-by-side
			// Width is implicitly determined by its content (flex items)

			// Modifier: Paused state (using class)
			&.paused {
				animation-play-state: paused;
			}
		}

		/* Note: The TestimonialCard component itself would have its own BEM structure,
	   e.g., .testimonial-card, .testimonial-card__pfp, .testimonial-card__name etc.
	   Those styles belong in the TestimonialCard.svelte file's style block. */
	}

	/* --------------------------------------------------
   Media Queries
-------------------------------------------------- */

	/* Accessibility: Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		// Target specific animations within the block
		.testimonials-section {
			&__title-standout {
				animation: none; // Stop gradient animation
			}
			&__track {
				animation: none; // Stop scrolling animation
			}
		}

		// Global reduction (keep separate)
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}

	/* --------------------------------------------------
   Keyframes (Keep outside the component block)
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

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
