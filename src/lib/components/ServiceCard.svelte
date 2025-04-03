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
<article id="step-card-{id}" class="service-card" aria-labelledby="step-title-{id}">
	<div class="service-card__image-wrapper">
		<img
			class="service-card__image"
			src={image}
			alt={imageAlt}
			width="400"
			height="300"
			loading="lazy"
			fetchpriority="low"
		/>
	</div>
	<div class="service-card__content">
		<div class="service-card__glass-overlay">
			<h3 id="step-title-{id}" class="service-card__title">{title}</h3>
			<p class="service-card__description">{description}</p>
		</div>
	</div>
</article>

<style lang="scss">
	// --- Component Variables ---
	$card-border-radius: 1rem;
	$glass-opacity: 0.7;
	$transition-speed: 0.4s;

	// --- Service Card ---
	.service-card {
		position: relative;
		height: 100%;
		min-height: 25rem;
		width: 100%;
		border-radius: $card-border-radius;
		overflow: hidden;
		box-shadow: var(--shadow-medium--secondary);
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		// Card elevation on hover
		transition:
			transform $transition-speed,
			box-shadow $transition-speed;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

			.service-card__image {
				transform: scale(1.05);
			}
		}

		@media (min-width: 48rem) {
			width: $container-width-3;
		}
	}

	// --- Image Styles ---
	.service-card__image-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		margin-inline: auto;
		width: 100%;
		height: 100%;
		z-index: 1;
		aspect-ratio: 4 / 3;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(
				to top,
				rgba(0, 0, 0, 0.7) 0%,
				rgba(0, 0, 0, 0.3) 40%,
				rgba(0, 0, 0, 0.1) 60%,
				rgba(0, 0, 0, 0) 100%
			);
			z-index: 2;
		}
	}

	.service-card__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform $transition-speed cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	// --- Content Styles ---
	.service-card__content {
		flex: 1;

		position: absolute;
		bottom: 0;
		left: 0;
		margin-inline: auto;
		width: 100%;
		z-index: 3;
		border-radius: 1rem;
	}

	.service-card__glass-overlay {
		padding: 1.125rem;
		background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, $glass-opacity) 100%);
	}

	.service-card__title {
		@extend %h3;
		color: $light-1;
		margin-bottom: spacing(semi-related);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.service-card__description {
		@extend %p;
		color: $light-2;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	/* --- Accessibility: Reduced Motion --- */
	@media (prefers-reduced-motion: reduce) {
		.service-card,
		.service-card__image {
			transition-duration: 0.01ms !important;
			transition-delay: 0ms !important;
		}
	}
</style>
