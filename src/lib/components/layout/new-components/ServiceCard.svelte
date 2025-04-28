<script lang="ts" runes>
  interface Service {
    title: string;
    description: string;
    icon?: string;
    graphic: string;
    link: string;
  }
  // Use $props() for declaring props in Svelte 5
  let { service } = $props<{ service: Service }>();
</script>

<article class="service-card">
  {#if service.icon}
    <img
      class="service-card__icon"
      src={service.icon}
      alt=""
      width="24"
      height="24"
      loading="lazy"
    />
  {/if}

  <img
    class="service-card__graphic"
    src={service.graphic}
    alt={service.title}
    width="24"
    height="24"
    loading="lazy"
  />
  <header class="service-card__header">
    <h3 class="service-card__header-title">{service.title}</h3>
    <a class="service-card__header-link" href={service.link}>{service.link}</a>
  </header>
</article>

<style lang="scss">
  .service-card {
    // Padding and border-radius based on scale factor
    padding: calc(
        var(--card-scale-factor, #{$default-scale}) / #{round-to($MAJOR-HALF)}
      )
      var(--card-scale-factor, #{$default-scale});
    border-radius: calc(
      var(--card-scale-factor, #{$default-scale}) / #{round-to($MAJOR-HALF)}
    );

    $max-card-size: 45ch;
    position: sticky;
    inline-size: 100%;
    block-size: 100%;
    max-inline-size: $max-card-size;
    &__icon {
      $size: size('sm');

      position: absolute;
      top: 0;
      left: 0;

      inline-size: $size;
      block-size: $size;
    }
    &__graphic {
      $size: 100%;

      position: absolute;
      inset: 0;
      margin: auto;

      inline-size: $size;
      block-size: $size;
    }
    &__header {
      &-title {
        @extend %u_heading--bold;
        @extend %typography--primary;
      }
      &-description {
        @extend %u_paragraph;
        @extend %typography--secondary;
      }
      &-link {
        @extend %u_callout;
        @extend %typography--tertiary;
      }
    }
  }
</style>
