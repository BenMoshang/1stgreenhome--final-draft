<script lang="ts">
  /** ----------------------------------------------------------------
   *  service-card (Svelte 5, runes mode)
   *  ----------------------------------------------------------------
   *  Props:
   *    - title        (string)
   *    - description  (string)
   *    - image        (string | static import)
   * ----------------------------------------------------------------*/
  interface Service {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
  }

  let { service } = $props<{ service: Service }>();
</script>

<article class="service-card">
  <figure
    class="service-card__media"
    style="background-image: url('{service.image}'); width: 100%; height: 100%;"
    aria-label={service.imageAlt || service.title}
  >
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
