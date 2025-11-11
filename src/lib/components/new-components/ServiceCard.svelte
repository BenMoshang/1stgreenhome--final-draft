<script lang="ts">
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
    imageAlt?: string;
    tags: { label: string }[];
  }

  let { service } = $props<{ service: Service }>();
</script>

<article class="service-card">
  <figure class="service-card__media">
    <img
      class="service-card__image"
      src={service.image}
      alt={service.imageAlt || service.title}
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
