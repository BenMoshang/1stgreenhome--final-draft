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
		<small
			class="projects-section__header--label"
			in:fadeInUpTransition={{ delay: animationDelays.label }}
		>
			{header.label}
		</small>
		<h2
			class="projects-section__header--title"
			in:fadeInUpTransition={{ delay: animationDelays.title }}
		>
			<span class="projects-section__header--title-gradient">{header.title1}</span>
			{header.title2}
		</h2>
		<p
			class="projects-section__header--description"
			in:fadeInUpTransition={{ delay: animationDelays.description }}
		>
			{header.description}
		</p>
	</header>

	{#each sections as section, i}
		<article
			id={`project-article-${i}`}
			class="project-article"
			style="grid-area: article-{i};"
			in:fadeInUpTransition={{
				delay: animationDelays.sections.start + i * animationDelays.sections.increment
			}}
		>
			<figure class="project-article__image-container">
				<img
					class="project-article__image-container--image"
					src={section.image}
					alt="Project image"
					loading="lazy"
					width="700"
					height="700"
				/>
			</figure>
			<figcaption class="project-article__caption">
				<img
					class="project-article__caption--icon"
					src={section.icon}
					alt="Project icon"
					in:fadeInUpTransition={{ delay: animationDelays.icons }}
				/>
				<h3 class="project-article__caption--title">
					{section.title}
				</h3>
				<p class="project-article__caption--description">
					{section.description}
				</p>
			</figcaption>
		</article>
	{/each}
</section>

<style lang="scss">
	/* Projects Section */
	.projects-section {
		@include section;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto auto;
		grid-template-areas:
			'header'
			'article-0'
			'article-1'
			'article-2';

		gap: clamp(2rem, 1.818rem + 0.91vw, 2.5rem);

		&__header {
			@extend %flex-col-center;
			text-wrap: balance;
			text-align: center;
			margin-bottom: spacing(not-related);

			&--label {
				@extend %text-label--primary;
				margin-bottom: spacing(semi-related);
			}

			&--title {
				@extend %h2;
				max-width: 20ch;
				margin-bottom: spacing(semi-related);
			}
			&--title-gradient {
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
			&--description {
				@extend %p;
				max-width: 50ch;
				text-wrap: pretty;
			}
		}
	}

	/* Project Article */
	.project-article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: clamp(2rem, 1.818rem + 0.91vw, 2.5rem);

		& > * {
			flex: 1;
		}

		/* Project Sections */
		&__caption {
			display: flex;
			flex-direction: column;

			&--icon {
				width: 2rem;
				height: 2rem;
				padding: 0.25rem;
				border: 1px solid var(--color-accent);
				border-radius: 50%;
				object-fit: cover;
				margin-bottom: spacing(not-related);

				background: var(--color-light);
				box-shadow: var(--shadow-low--light);
			}

			&--title {
				@extend %h3;
				max-width: 40ch;
				margin-bottom: spacing(semi-related);
				text-wrap: balance;
			}

			&--description {
				@extend %p;
			}
		}

		&__image-container {
			box-shadow: var(--shadow-medium--secondary);
			border-radius: var(--border-radius);
			max-width: $container-width-3;
			max-height: $container-width-3;
			height: 100%;
			width: 100%;
			overflow: hidden;

			&--image {
				filter: brightness(120%) contrast(110%) saturate(110%);
				display: inline-block;
				height: 100%;
				width: 100%;
				object-fit: cover;
				border-radius: var(--border-radius);
				transition: transform 0.3s ease-in-out;
				&:hover {
					transform: scale(1.1);
				}
			}
		}
	}

	/* Media Queries */
	// @media (min-width: 50.625rem) {
	// 	.project-article {
	// 		&__caption {
	// 			text-align: center;
	// 			align-items: center;
	// 		}
	// 	}
	// }

	@media (min-width: 75rem) {
		.projects-section {
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				'header header'
				'article-0 article-0'
				'article-1 article-1'
				'article-2 article-2';
		}

		.project-article {
			display: flex;
			flex-direction: row;
			align-items: unset;

			&:nth-child(odd) {
				flex-direction: row-reverse;
			}

			&__caption {
				text-align: left;
				align-items: unset;
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
