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
        class="service-card__description u_paragraph typography--secondary-rev"
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
    position: sticky;
    top: size('2xl');
    inline-size: 100%;
    block-size: 100%;
    max-inline-size: clamp(15.625rem, 100%, 28.125rem);
z-index:5 !important;
    border-radius: $br;
    overflow: clip;
    @extend %image-hover;
    @include respond-to('tablet-start') {
      position: static;
      top: unset;
    }
    @include respond-to('tablet-end') {
      position: sticky;
      top: size('2xl');
    }

    /* ----- Media ----- */
    &__media {
      display: grid;
      position: relative;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0) 40%
        );
        pointer-events: none;
      }
    }

    &__image {
      $image-size: 100%;
      position: absolute;
      place-self: center;
      width: $image-size;
      height: $image-size;
      transform-origin: center;
      transform: scale(1) translateZ(0);
      filter: saturate(1.2) contrast(0.85);

      transition:
        filter 200ms linear,
        transform 200ms linear;
      // object-fit: cover;
    }

    /* ----- Tags strip ----- */
    &__tags {
      $pad: size('sm');
      position: absolute;
      top: $pad;
      left: $pad;
      display: flex;
      gap: 8px;
      z-index: $text-z;
    }
    &__tag {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 624.9375rem;
      color: $brand;
      background: rgba($brand, 0.15);
      backdrop-filter: blur(.25rem);
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
      text-shadow: .125rem .125rem 1.25rem rgba(0, 0, 0, 0.2);
    }
    &__description {
      max-inline-size: 35ch;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
