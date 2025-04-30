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
      icon: '/assets/landing-page/projects-school-icon.svg',
      image: '/assets/landing-page/news/theater.webp',
    },
    {
      title: "McMullen Building: Maryland's Bold Step Towards Sustainability",
      description: `The McMullen Building exemplifies Maryland's dedication to sustainability, retrofitting 1,500+ LED fixtures and saving more than 100,000 KWH. A powerful commitment to a greener future.`,
      icon: '/assets/landing-page/building-columns-solid.svg',
      image: '/assets/landing-page/news/office.webp',
    },
    {
      title: 'Delmarva Community Center: Lighting the Way Forward',
      description: `With 2,500+ LED fixtures upgraded, the Delmarva Community Center has reduced energy use by over 230,000 KWH, highlighting the impact of community-focused energy solutions.`,
      icon: '/assets/landing-page/projects-people-icon.svg',
      image: '/assets/landing-page/news/warehouse.webp',
    },
  ]);
</script>

<section id="projects" class="projects-section u_p-inline__md u_p-block__x">
  <div class="projects-section__container u_container__sm">
    <header class="projects-section__header">
      <small class="projects-section__header--label brute__label">
        {header.label}
      </small>
      <h2
        class="projects-section__header-title u_m-bottom__sm u_display-2--bold typography--primarymax-ch-20"
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
          <img
            class="project-article__image-container--image"
            src={section.image}
            alt="Project image"
            loading="lazy"
            width="700"
            height="700"
          />
          <img
            class="project-article__image-container--icon"
            src={section.icon}
            alt="Project icon"
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
  /* Projects Section */
  .projects-section {
    inline-size: 100%;
    block-size: fit-content;

    &__container {
      display: grid;
      place-content: center;
      place-items: center;
      grid-template-areas:
        'header'
        'article-0'
        'article-1'
        'article-2';
      grid-template-columns: 1fr;
      gap: size('xl');
      #project-article-0 {
        grid-area: article-0;
      }
      #project-article-1 {
        grid-area: article-1;
      }
      #project-article-2 {
        grid-area: article-2;
      }
    }
    &__header {
      @extend %flex-col-center;
      text-align: center;
      margin-bottom: size('xl');

      &-title {
        &--gradient {
          @include gradient-text-animated(3s);
        }
      }
    }
  }

  /* Project Article */
  .project-article {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    gap: size('xl');

    & > * {
      flex-basis: 33%;
    }

    /* Project Sections */
    &__caption {
      justify-self: start;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: size('md');
      &--title {
        @extend %u_title-a--bold;
        @extend %typography--secondary;
        max-inline-size: 30ch;
        margin-block-end: var(--margin-sm);
      }

      &--description {
        max-inline-size: 60ch;
        @extend %u_paragraph;
        @extend %typography--tertiary;
      }
    }

    &__image-container {
      $image-container-size: 100%;
      max-inline-size: $PAGE_MAX_INLINE / 2;
      overflow: clip;
      border-radius: $border-radius;
      box-shadow: var(--shadow-elevation-medium);
      block-size: $image-container-size;
      inline-size: $image-container-size;
      aspect-ratio: 4 / 3;
      @extend %image-hover;

      &--image {
        display: inline-block;
        border-radius: inherit;
        block-size: inherit;
        inline-size: inherit;

        filter: brightness(120%) contrast(110%) saturate(110%);
        object-fit: cover;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at center,
            transparent 50%,
            rgba(0, 0, 0, 0.25) 100%
          );
          pointer-events: none;
        }

        &--icon {
          $icon-size: size('sm');
          padding: size('xs');
          border: 1px solid var(--brute-typography);
          border-radius: 50%;
          background: oklch(90% 0 0);
          block-size: $icon-size;
          box-shadow: var(--shadow-low--light);
          inline-size: $icon-size;
          margin-block-end: var(--margin-sm);
          object-fit: cover;
        }
      }
    }
  }

  @include respond-to('tablet-start') {
    .projects-section {
      grid-template-areas:
        'header header'
        'article-0 article-0'
        'article-1 article-1'
        'article-2 article-2';
      grid-template-columns: 1fr 1fr;
    }

    .project-article {
      display: flex;
      flex-direction: row;
      & > * {
        flex-basis: 100%;
      }
      &:nth-child(odd) {
        flex-direction: row-reverse;
        align-items: center;
      }
    }
  }
</style>
