<script lang="ts">
  // Import dependencies

  // Header data using Svelte 5 Runes
  const header = $state({
    label: 'EXPLORE OUR BENEFITS',
    title1: 'Stay Connected',
    title2: ' With Our Journey Ahead',
    description:
      'Join us as we evolve. Be the first to know about our latest innovations and breakthroughs. Together, we can create a brighter, more sustainable future.',
  });

  // Project sections data using Svelte 5 Runes
  const sections = $state([
    {
      title: 'Northwestern High School: Pioneering Energy Efficiency',
      description:
        'With over 7,000 LED fixtures upgraded, Northwestern High School has saved an impressive 800,000+ KWH, setting a new benchmark for energy sustainability in educational institutions.',
      // TODO: Replace placeholder with actual SVG code for school icon
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="project-article__image-container--icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>',
      image: '/assets/landing-page/news/theater.webp',
    },
    {
      title: "McMullen Building: Maryland's Bold Step Towards Sustainability",
      description: `The McMullen Building exemplifies Maryland's dedication to sustainability, retrofitting 1,500+ LED fixtures and saving more than 100,000 KWH. A powerful commitment to a greener future.`,
      // TODO: Replace placeholder with actual SVG code for building icon
      icon: '<svg class="project-article__image-container--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>',
      image: '/assets/landing-page/news/office.webp',
    },
    {
      title: 'Delmarva Community Center: Lighting the Way Forward',
      description: `With 2,500+ LED fixtures upgraded, the Delmarva Community Center has reduced energy use by over 230,000 KWH, highlighting the impact of community-focused energy solutions.`,
      // TODO: Replace placeholder with actual SVG code for people icon
      icon: '<svg class=xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
      image: '/assets/landing-page/news/warehouse.webp',
    },
  ]);
</script>

<section id="projects" class="projects-section u_p-inline__md u_p-block__xl">
  <div class="projects-section__container u_container__sm">
    <header class="projects-section__header u_m-bottom__xl">
      <small class="projects-section__header--label brute__label">
        {header.label}
      </small>
      <h2
        class="projects-section__header-title u_m-bottom__sm u_display-1--bold typography--primary max-ch-20"
      >
        <span class="projects-section__header-title--gradient"
          >{header.title1}</span
        >
        {header.title2}
      </h2>
      <p
        class="projects-section__header--description max-ch-45 u_paragraph typography--tertiary"
      >
        {header.description}
      </p>
    </header>

    {#each sections as section, i}
      <article id={`project-article-${i}`} class="project-article">
        <figure class="project-article__image-container">
          <!-- Use {@html} to render the SVG string -->
          <div class="project-article__image-container--icon">
            {@html section.icon}
          </div>
          <img
            class="project-article__image-container--image"
            src={section.image}
            alt="Project image"
            loading="lazy"
            width="700"
            height="700"
          />
        </figure>
        <figcaption class="project-article__caption">
          <h3 class="project-article__caption--title">
            {section.title}
          </h3>
          <p class="project-article__caption--description">
            {section.description}
          </p>
        </figcaption>
      </article>
    {/each}
  </div>
</section>

<style lang="scss">
  @mixin only-green {
    // Fallback for very old browsers
    // CSS-only approach (better browser support)
    // SVG filter with improved green isolation
    filter: hue-rotate(315deg) saturate(170%) brightness(1.2)
      url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImciPjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwLjMzIDAuMzMgMC4zMyAwIDAgMCAxLjAgMCAwIDAgMC4zMyAwLjMzIDAuMzMgMCAwIDAgMCAwIDEgMCIvPjwvZmlsdGVyPjwvc3ZnPg==#g');
  }
  .projects-section {
    inline-size: 100%;
    block-size: fit-content;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: size('2xl');

      /* Projects Section */
    }
    &__header {
      @extend %flex-col-center;
      text-align: center;

      &-title {
        &--gradient {
          @include gradient-text-animated(3s);
        }
      }
    }
  }

  /* Project Article */
  .project-article {
    inline-size: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    gap: size('xl');

    & > * {
      flex: 1;
    }
    /* Projects Section */
    @include respond-to('tablet-start') {
      flex-direction: row;
      &:nth-child(odd) {
        flex-direction: row-reverse;
      }
    }
    /* Project Sections */
    &__caption {
      grid-area: caption;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &--title {
        @extend %u_title-a--bold;
        @extend %typography--secondary;
        max-inline-size: 30ch;
        margin-right: auto;
        margin-block-end: var(--margin-sm);
      }

      &--description {
        margin-right: auto;
        max-inline-size: 50ch;
        @extend %u_paragraph;
        @extend %typography--tertiary;
      }
    }

    &__image-container {
      $border-custom: 40% 7% 7% 7% / 40% 7% 7% 7%;
      grid-area: image;
      border-radius: 0% 7% 7% 7% / 0% 7% 7% 7%;
      position: relative;
      overflow: clip;
      // border-radius: 90% 10% 91% 9% / 11% 85% 15% 89%;
      $image-container-size: 100%;
      block-size: $image-container-size;
      filter: $shadow-drop;
      inline-size: $image-container-size;
      max-inline-size: $PAGE_MAX_INLINE / 2;
      max-block-size: $PAGE_MAX_INLINE / 2;
      aspect-ratio: 4 / 3;

      @include respond-to('tablet-start') {
        aspect-ratio: 16 / 9;
      }

      z-index: 1;
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        inline-size: 100%;
        block-size: 100%;
        border-radius: $border-custom;
        overflow: hidden;
        @extend %image-hover;
        background: radial-gradient(
          circle at center,
          transparent 50%,
          rgba(0, 0, 0, 0.5) 100%
        );
        pointer-events: none;
        z-index: 2;
      }
      &--image {
        @extend %image-hover;

        position: absolute;
        inset: 0;
        margin: auto;
        aspect-ratio: inherit;
        border-radius: $border-custom;
        overflow: hidden;
        block-size: 100%;
        inline-size: 100%;
        z-index: 1;

        @include only-green;
        object-fit: cover;
      }
      &--icon {
        $position: size('xs');
        $icon-size: size('lg');
        place-self: start;

        position: absolute;
        margin-top: $position;
        margin-left: $position;
        object-fit: contain;
        block-size: $icon-size;
        inline-size: $icon-size;
        z-index: 3;
        color: var(--brute-primary);
      }
    }
  }
</style>
