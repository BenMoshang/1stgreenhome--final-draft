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
    position: relative;
    overflow: hidden;

    // max-inline-size: min(100%, $container-width-3);
    border-radius: $card-border-radius;
    block-size: 100%;
    box-shadow: var(--shadow-medium--secondary);
    inline-size: 100%;

    // Card elevation on hover
    transition: transform $transition-speed;

    @extend %flex-col-center;

    &:hover {
      transform: translateY(calc(-0.5% - 0.25rem));

      .service-card__image {
        transform: scale(1.05);
      }
    }

    &__image {
      position: relative;

      // aspect-ratio: 4/3;
      z-index: 1;
      display: block;
      block-size: 100%;
      inline-size: 100%;
      object-fit: cover;
      transition: transform $transition-speed cubic-bezier(0.25, 0.8, 0.25, 1);

      &::before {
        position: absolute;
        z-index: 2;
        background: linear-gradient(to top,
        rgb(0 0 0 / 80%) 0%,
        rgb(0 0 0 / 40%) 40%,
        rgb(0 0 0 / 20%) 60%,
        rgb(0 0 0 / 0%) 100%);
        content: '';
        inset: 0;
        isolation: isolate;
      }
    }

    &__content {
      position: absolute;
      z-index: 3;
      padding: 1.25rem;
      background: linear-gradient(to bottom, transparent 0%, hsl(157deg 67% 0%) 100%);
      inline-size: 100%;
      inset-block-end: 0;
      inset-inline-start: 0;
      margin-inline: auto;
    }

    &__title {
      @extend %h3;

      color: $light-1;
      font-size: clamp(1.25rem, 4vw, 1.75rem);
      margin-block-end: spacing(close-related);
      text-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    }

    &__description {
      @extend %p;

      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: block-axis;
      color: $light-2;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      max-inline-size: 42ch;
      text-overflow: ellipsis;
    }
  }
</style>
