<script lang="ts">
  // Use Svelte 5 runes syntax for props
  const props = $props();

  // Extract and derive props
  let statement = $derived(props.statement || '');
  let pfp = $derived(props.pfp || '');
  let name = $derived(props.name || '');
  let company = $derived(props.company || '');
</script>

<article class="card">
  <p class="card__message max-ch-65">{@html statement}</p><!-- max-ch-65 applied to control text width -->
  <header class="card__header">
    <img class="card__pfp" src={pfp} alt={`${name} from ${company}`} />
    <h3 class="card__name">{name}</h3>
    <p class="card__company">{@html company}</p>
  </header>
</article>

<style lang="scss">
  /* Card component styling */
  .card {
    /* Layout */
    display: flex;
    aspect-ratio: 3 / 2;
    flex: 0 0 auto; /* Keep this: essential for marquee */
    flex-direction: column;
    justify-content: space-between;
    padding: size('md');
    border-radius:1rem;
    inline-size: $PAGE_MAX_INLINE / 4; /* Example: Adjust based on your design */

    box-shadow: var(--shadow-elevation-medium);

    background: linear-gradient(
      in oklch 145deg,
      /* 0%: brightest highlight with slightly increased chroma */
        oklch(0.97 0.008 15deg) 0%,
      /* 40%: transition into neutral midtone */ oklch(0.93 0.006 5deg) 40%,
      /* 75%: deeper shadow with a cool hue shift */ oklch(0.88 0.005 -20deg)
        75%,
      /* 100%: darkest shadow hint at the edge */ oklch(0.85 0.004 -20deg) 100%
    );
    block-size: 100%; /* Use height: auto or manage height carefully if content varies a lot */
    @extend %image-hover;
    /* --- RESPONSIVE WIDTH --- */

    /* Mobile First: Define a base width that works on small screens */

    /* Elements */
    &__message {
      @extend %u_paragraph;
      @extend %typography--secondary;

      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: block-axis;
      -webkit-line-clamp: 4; /* Good for controlling height */
      margin-block-end: size('md');

      text-overflow: ellipsis;
    }

    &__header {
      display: grid;
      grid-column-gap: .5rem;
      grid-template-areas:
        'pfp name'
        'pfp company';
      grid-template-columns: auto 1fr;

      /* Layout */
      inline-size: 100%;
      margin-block-start: auto; /* Push header to the bottom */
      padding-block-start: size('xs');
    }

    &__pfp {
      $size: size('xl');
      grid-area: pfp;
      aspect-ratio: 1;
      block-size: $size;
      inline-size: $size;
      border-radius: 50%;
      object-fit: cover;

      box-shadow: inset 0 2px 2px hsl(0deg 0% 0% / 84.9%);
    }

    &__name {
      align-self: end;
      grid-area: name;
      @extend %u_heading;
      @extend %typography--primary;
    }

    &__company {
      grid-area: company;

      @extend %u_subheading;
      color: var(--brute-primary);
    }
  }

  /* Accessibility: Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .card {
      transition-duration: 0.01ms !important;
    }
  }
</style>
