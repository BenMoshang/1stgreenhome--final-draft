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
  <p class="card__message">{@html statement}</p>
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
    flex: 0 0 auto; /* Keep this: essential for marquee */
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem;
    border-radius: var(--border-radius);

    /* Or use viewport units carefully: width: clamp(250px, 80vw, 320px); */

    /* Avoid % width with flex: 0 0 auto in this marquee context */

    /* Visual */
    background: var(--convex-light);
    block-size: 100%; /* Use height: auto or manage height carefully if content varies a lot */
    box-shadow: var(--shadow-medium--secondary);

    /* --- RESPONSIVE WIDTH --- */

    /* Mobile First: Define a base width that works on small screens */
    inline-size: $PAGE_MAX_WIDTH / 4; /* Example: Adjust based on your design */

    /* Elements */
    &__message {
      @extend %p;

      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: block-axis;
      -webkit-line-clamp: 5; /* Good for controlling height */
      margin-block-end: spacing(semi-related);

      /* Consider setting a min-height if empty statements are possible */
      min-block-size: 6em; /* Example: Adjust based on font size and line height */
      text-overflow: ellipsis;
    }

    &__header {
      display: grid;
      grid-column-gap: 0.5rem;
      grid-template-areas:
        'pfp name'
        'pfp company';
      grid-template-columns: auto 1fr;

      /* Layout */
      inline-size: 100%;
      margin-block-start: auto; /* Push header to the bottom */
      padding-block-start: 0.25rem; /* Add padding-top instead of padding: 0.25rem to avoid affecting bottom */
    }

    &__pfp {
      border-radius: 50%;
      block-size: 2.5rem;
      box-shadow: inset 0 2px 2px hsl(0deg 0% 0% / 84.9%);
      grid-area: pfp;
      inline-size: 2.5rem;
      object-fit: cover;
    }

    &__name {
      align-self: end;
      font-weight: 600;
      grid-area: name;
      letter-spacing: 0.02em;

      @extend %h6;
    }

    &__company {
      @extend %p;

      color: var(--color-secondary-900);
      font-size: var(--label-p);
      font-weight: 300;
      grid-area: company;
      letter-spacing: 0.05em;
    }
  }

  /* Accessibility: Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .card {
      transition-duration: 0.01ms !important;
    }
  }
</style>
