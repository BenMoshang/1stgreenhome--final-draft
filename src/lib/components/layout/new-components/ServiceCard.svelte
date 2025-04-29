<script lang="ts" runes>
  /** ----------------------------------------------------------------
   *  service-card (Svelte 5, runes mode)
   *  ----------------------------------------------------------------
   *  Props:
   *    - title        (string)
   *    - description  (string)
   *    - image        (string | static import)
   *    - tags         ({ label: string }[])
   * ----------------------------------------------------------------*/
  interface Service {
    title: string;
    description: string;
    image: string;
    tags: { label: string }[];
  }

  let { service } = $props<{ service: Service }>();
</script>

<article class="service-card">
  <figure class="service-card__media">
    <img
      class="service-card__image"
      src={service.image}
      alt={service.title}
      loading="lazy"
      width="600"
      height="600"
    />

    <!-- Frosted-glass tag strip -->
    <header class="service-card__tags">
      {#each service.tags as tag}
        <span class="service-card__tag">{tag.label}</span>
      {/each}
    </header>

    <figcaption class="service-card__caption">
      <h3
        class="service-card__title u_title-a--bold typography--primary-rev u_m-bottom__xs max-ch-25"
      >
        {service.title}
      </h3>

      <p
        class="service-card__description u_paragraph typography--secondary-rev max-ch-45"
      >
        {service.description}
      </p>
    </figcaption>
  </figure>
</article>

<style lang="scss">
  /* ===============================================================
   service-card
   =============================================================== */
  $brand: var(--brand, #00c248); // fallback to your bulb-green
  $text-z: 2;
  $br: $border-radius;

  .service-card {
    position: relative;
    inline-size: 100%;
    max-inline-size: 22rem; // feel free to override via parent
    border-radius: $br;
    overflow: clip;
    background: #fff;
    box-shadow: 0 0.75rem 1.5rem rgba(#000, 0.12);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-0.25rem);
      box-shadow: 0 1.25rem 2rem rgba(#000, 0.15);
    }

    /* ----- Media ----- */
    &__media {
      position: relative;
      aspect-ratio: 1 / 1; // square on mobile
    }

    @media (min-width: 40rem) {
      // ≥640 px
      &__media {
        aspect-ratio: 4 / 3;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.9) saturate(1.05);
    }

    /* Brand glow + darken bottom for legibility */
    &__media::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        120% 70% at 50% 80%,
        rgba($brand, 0.3) 0%,
        transparent 70%
      );
      pointer-events: none;
    }
    &__media::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(#000, 0) 40%,
        rgba(#000, 0.75) 100%
      );
      pointer-events: none;
    }

    /* ----- Tags strip ----- */
    &__tags {
      $pad: size('sm');
      position: absolute;
      top: $pad;
      left: $pad;
      display: flex;
      gap: 0.5rem;
      z-index: $text-z;
    }
    &__tag {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      color: $brand;
      background: rgba($brand, 0.15);
      backdrop-filter: blur(4px);
      white-space: nowrap;
    }

    /* ----- Caption ----- */
    &__caption {
      $pad: size('md');
      position: absolute;
      inset-inline: $pad;
      bottom: $pad;
      z-index: $text-z;
    }
    &__title {
      color: #fff;
    }
    &__description {
      color: rgba(#fff, 0.85);
    }
  }
</style>
