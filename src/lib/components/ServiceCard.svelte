<!-- Svelte 5 Component with Runes -->
<script lang="ts">
	// With Svelte 5 Runes mode, using $props()
	const props = $props();

	// Service card props
	let id = $derived(props.id ?? 0);
	let title = $derived(props.title ?? '');
	let description = $derived(props.description ?? '');
	let image = $derived(props.image ?? '');
	let imageAlt = $derived(props.imageAlt ?? '');
</script>

<!-- Service card component -->
<figure id="stepper__card-{id}" class="service-card" aria-labelledby="step-title-{id}">
	<img
		class="service-card__image"
		src={image}
		alt={imageAlt}
		width="400"
		height="300"
		loading="lazy"
		fetchpriority="low"
	/>
	<figcaption class="service-card__content">
		<h3 id="step-title-{id}" class="service-card__title">{title}</h3>
		<p class="service-card__description">{description}</p>
	</figcaption>
</figure>

<style lang="scss">
	// --- Component Variables ---
	$card-border-radius: 1rem;
	$transition-speed: 0.4s;

	// --- Service Card ---
	.service-card {
		height: 100%;
		position: relative;
		width: 100%;
		// max-inline-size: min(100%, $container-width-3);
		border-radius: $card-border-radius;
		overflow: hidden;
		box-shadow: var(--shadow-medium--secondary);

		@extend %flex-col-center;
		// Card elevation on hover
		transition: transform $transition-speed;

		&:hover {
			transform: translateY(calc(-0.5% - 0.25rem));

			.service-card__image {
				transform: scale(1.05);
			}
		}

		&__image {
			display: block;
			position: relative;
			width: 100%;
			height: 100%;
			object-fit: cover;
			// aspect-ratio: 4/3;
			z-index: 1;
			transition: transform $transition-speed cubic-bezier(0.25, 0.8, 0.25, 1);

			&::before {
				content: '';
				position: absolute;
				isolation: isolate;
				inset: 0;
				background: linear-gradient(
					to top,
					rgba(0, 0, 0, 0.8) 0%,
					rgba(0, 0, 0, 0.4) 40%,
					rgba(0, 0, 0, 0.2) 60%,
					rgba(0, 0, 0, 0) 100%
				);
				z-index: 2;
			}
		}

		&__content {
			position: absolute;
			bottom: 0;
			left: 0;
			margin-inline: auto;
			inline-size: 100%;
			z-index: 3;
			padding: 1.25rem;
			background: linear-gradient(to bottom, transparent 0%, hsl(157, 67%, 0%) 100%);
		}

		&__title {
			@extend %h3;
			color: $light-1;
			margin-bottom: spacing(close-related);
			text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
			font-size: clamp(1.25rem, 4vw, 1.75rem);
		}

		&__description {
			@extend %p;
			color: $light-2;
			max-width: 42ch;
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			line-clamp: 3;
			-webkit-line-clamp: 3;
			text-overflow: ellipsis;
		}
	}
</style>
