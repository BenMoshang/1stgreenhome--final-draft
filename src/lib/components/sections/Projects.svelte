<script lang="ts">
	// Import dependencies
	import { fadeInUpTransition } from '$lib/utils/animations.js';

	// Header data using Svelte 5 Runes
	const header = $state({
		label: 'EXPLORE OUR BENEFITS',
		title1: 'Stay Connected',
		title2: ' With Our Journey Ahead',
		description:
			'Join us as we evolve. Be the first to know about our latest innovations and breakthroughs. Together, we can create a brighter, more sustainable future.'
	});

	// Project sections data using Svelte 5 Runes
	const sections = $state([
		{
			title: 'Northwestern High School: Pioneering Energy Efficiency',
			description:
				'With over 7,000 LED fixtures upgraded, Northwestern High School has saved an impressive 800,000+ KWH, setting a new benchmark for energy sustainability in educational institutions.',
			icon: '/assets/landing-page/projects-school-icon.svg',
			image: '/assets/landing-page/news/theater.jpg'
		},
		{
			title: "McMullen Building: Maryland's Bold Step Towards Sustainability",
			description: `The McMullen Building exemplifies Maryland's dedication to sustainability, retrofitting 1,500+ LED fixtures and saving more than 100,000 KWH. A powerful commitment to a greener future.`,
			icon: '/assets/landing-page/building-columns-solid.svg',
			image: '/assets/landing-page/news/office.jpg'
		},
		{
			title: 'Delmarva Community Center: Lighting the Way Forward',
			description: `With 2,500+ LED fixtures upgraded, the Delmarva Community Center has reduced energy use by over 230,000 KWH, highlighting the impact of community-focused energy solutions.`,
			icon: '/assets/landing-page/projects-people-icon.svg',
			image: '/assets/landing-page/news/warehouse.png'
		}
	]);

	// Animation delays for staggered animations
	const animationDelays = {
		label: 0,
		title: 200,
		description: 400,
		icons: 400,
		sections: {
			start: 450,
			increment: 50 // Increment delay for each subsequent section
		}
	};
</script>

<section id="projects" class="projects-section">
	<header class="projects-section__header">
		<p class="projects-section__label" in:fadeInUpTransition={{ delay: animationDelays.label }}>
			{header.label}
		</p>
		<h2 class="projects-section__title" in:fadeInUpTransition={{ delay: animationDelays.title }}>
			<span class="projects-section__title-gradient">{header.title1}</span>
			{header.title2}
		</h2>
		<p
			class="projects-section__description"
			in:fadeInUpTransition={{ delay: animationDelays.description }}
		>
			{header.description}
		</p>
	</header>

	{#each sections as section, i}
		<article
			class="project-article"
			in:fadeInUpTransition={{
				delay: animationDelays.sections.start + i * animationDelays.sections.increment
			}}
		>
			<figcaption class="project-article__caption">
				<img
					class="project-article__icon"
					src={section.icon}
					alt="Project icon"
					in:fadeInUpTransition={{ delay: animationDelays.icons }}
				/>
				<h3 class="project-article__title">
					{section.title}
				</h3>
				<p class="project-article__description">
					{section.description}
				</p>
			</figcaption>
			<figure class="project-article__image-container">
				<img
					class="project-article__image"
					src={section.image}
					alt="Project image"
					loading="lazy"
					width="700"
					height="700"
				/>
			</figure>
		</article>
	{/each}
</section>

<style lang="scss">
	/* Reset */
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		z-index: 3;
	}

	/* Projects Section */
	.projects-section {
		width: 100%;
		height: 100%;
		max-width: 90rem;
		overflow: hidden;
		margin-inline: auto;
		padding-top: 2rem;
		display: grid;
		place-content: center;
		gap: 2.5rem;
		background: var(--convex-light);
		padding: var(--padding-section);
	}

	/* Header Section */
	.projects-section__header {
		@extend %flex-col-center;
		gap: 0.9375rem;
		text-wrap: balance;
		text-align: center;

		.projects-section__label {
			@extend %text-label--primary;
			margin-bottom: 1rem;
		}

		.projects-section__title {
			@extend %h2;
			max-width: 20ch;
			font-weight: 600;
		}

		.projects-section__title-gradient {
			color: transparent;
			text-align: center;
			font-family: var(--font-family-bold);
			overflow-wrap: unset;
			background: var(--gradient-text);
			background-size: 200% 200%;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			animation: gradient-loop 5s ease-in-out infinite;
			filter: drop-shadow(0rem 0.0625rem 0.125rem rgba(143, 255, 103, 0.5));
		}

		.projects-section__description {
			@extend %p;
			max-width: 50ch;
			text-wrap: pretty;
		}
	}

	/* Project Article */
	.project-article {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;

		& > * {
			flex: 1;
		}

		/* Project Sections */
		&__caption {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		&__icon {
			margin-bottom: 0.5rem;
			height: 3rem;
			width: 3rem;
			border: 1px solid var(--color-secondary);
			border-radius: 4rem;
			background: var(--convex-light);
			box-shadow: var(--shadow-low--light);
		}

		&__title {
			@extend %h3;
			max-width: 40ch;
			font-weight: 500;
			margin-bottom: 0.25rem;
			text-wrap: balance;
		}

		&__description {
			@extend %p;
			max-width: 65ch;
			line-height: 1.6;
			text-wrap: pretty;
		}

		&__image-container {
			box-shadow: var(--shadow-medium--secondary);
			border-radius: var(--border-radius);
			max-width: 80ch;
			max-height: 50ch;
			overflow: hidden;

			& img {
				filter: brightness(120%) contrast(110%) saturate(110%);
				display: inline-block;
				height: 100%;
				width: 100%;
				object-fit: cover;
				border-radius: var(--border-radius);
				transition: transform 0.3s ease-in-out;
				z-index: 3;

				&:hover {
					transform: scale(1.1);
				}
			}
		}
	}

	/* Media Queries */
	@media (min-width: 50.625rem) {
		.project-article__caption {
			text-align: center;
			align-items: center;
		}
	}

	@media (min-width: 75rem) {
		.project-article {
			display: flex;
			flex-direction: row;
			gap: 2.5rem;
			align-items: unset;

			&:nth-child(odd) {
				flex-direction: row-reverse;
			}

			&__caption {
				gap: 2.5rem;
				text-align: left;
				align-items: unset;
			}

			&__image-container {
				aspect-ratio: 3 / 2;
			}
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
