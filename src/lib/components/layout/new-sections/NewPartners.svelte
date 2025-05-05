<script lang="ts">
  import { animate, inView } from 'motion';
  import { onMount } from 'svelte';

  let container: HTMLElement;
  let labelEl: HTMLElement;
  let titleEl: HTMLElement;
  let descEl: HTMLElement;
  let forwardEls: HTMLElement[] = [];
  let reverseEls: HTMLElement[] = [];

  const header = {
    label: 'POWERED BY OUR PARTNERS',
    title: 'Partnered with Leading Energy Providers',
    description:
      'Partnering with top energy providers, we deliver reliable, eco-friendly solutions that drive a greener, more sustainable future.',
  };

  const partners = [
    { imageSrc: '/assets/landing-page/partners/logo-pepco.svg' },
    { imageSrc: '/assets/landing-page/partners/logo-bge.svg' },
    { imageSrc: '/assets/landing-page/partners/logo-delmarva.svg' },
    { imageSrc: '/assets/landing-page/partners/logo-pmed.png' },
  ];

  const partnersReverse = [
    { imageSrc: '/assets/landing-page/partners/logo-empower.webp' },
    { imageSrc: '/assets/landing-page/partners/logo-energy-star.svg' },
    {
      imageSrc:
        '/assets/landing-page/partners/logo-SouthernMarylandElectricCooperative.svg',
    },
    { imageSrc: '/assets/landing-page/partners/logo-bpi.webp' },
  ];

  onMount(() => {
    inView(labelEl, (element, entry) => {
      if (entry.isIntersecting) {
        animate(
          entry.target as HTMLElement,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.6 }
        );
      }
    });
    inView(titleEl, (element, entry) => {
      if (entry.isIntersecting) {
        animate(
          entry.target as HTMLElement,
          { opacity: [0, 1], y: [20, 0] },
          { delay: 0.2, duration: 0.6 }
        );
      }
    });
    inView(descEl, (element, entry) => {
      if (entry.isIntersecting) {
        animate(
          entry.target as HTMLElement,
          { opacity: [0, 1], y: [20, 0] },
          { delay: 0.4, duration: 0.6 }
        );
      }
    });

    // Animate logos when container scrolls into view
    inView(
      container,
      () => {
        const allLogos = [...forwardEls, ...reverseEls];
        const staggerDelay = 0.15; // Base delay between animations

        allLogos.forEach((logo, index) => {
          // Explicitly type keyframes object
          const keyframes: Record<string, any> = {
            opacity: [0, 1],
            transform: [
              'translateY(20px) scale(0.8)',
              'translateY(0px) scale(1)',
            ],
          };

          animate(
            logo, // Animate individual logo
            keyframes, // Pass typed keyframes
            {
              // Options
              duration: 0.8,
              delay: index * staggerDelay, // Manual stagger calculation
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Modern cubic bezier
            }
          );
        });
      },
      { amount: 0.1 }
    ); // Trigger when 10% of the container is visible
  });
</script>

<section
  id="partners"
  class="partners u_p-inline__md u_p-block__xl"
>
  <div class="partners__container u_container__sm">
    <header class="partners__header u_m-bottom__xl">
      <small
        class="partners__header-label brute__label-rev"
      >
        {header.label}
      </small>
      <h2
        class=" partners__header-heading max-ch-20 u_display-2--bold typography--primary-rev u_m-bottom__sm"
      >
        {header.title}
      </h2>
      <p
        class="partners__header-body m u_paragraph typography--secondary-rev"
      >
        {header.description}
      </p>
    </header>

    <div class="partners__logos-container">
      {#each partners as p, i}
        <div
          class="partners__logo-container-item"
          id={'forward' + i}
          bind:this={forwardEls[i]}
        >
          <img
            class="partners__logo-container-item--image"
            src={p.imageSrc}
            alt="partner logo"
            loading="lazy"
          />
        </div>
      {/each}

      {#each partnersReverse as p, i}
        <div
          class="partners__logo--container-item"
          id={'reverse' + i}
          bind:this={reverseEls[i]}
        >
          <img
            class="partners__logo-container-item--image"
            src={p.imageSrc}
            alt="partner logo"
          />
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .partners {
    inline-size: 100%;
    &__header {
      @extend %flex-col-center;
      text-align: center;
      margin-inline: auto;

      &-body {
        max-inline-size: 50ch;
      }
    }
    &__logos-container {
      inline-size: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
      gap: size('lg');
      place-items: center;
      max-inline-size: calc(4 * 10rem + 3 * var(--size-lg));
      margin-inline: auto;

      &-item {
        box-shadow: var(--shadow-elevation-medium);
        display: flex;
        justify-content: center;
        align-items: center;
        inline-size: size('md');
        block-size: size('sm');
        padding: size('xs');
        border-radius: $border-radius;
        &:hover {
          transform: scale(1.05);
        }
        &--image {
          object-fit: contain;
          aspect-ratio: 16 / 9;
          inline-size: 100%;
          block-size: 100%;
        }
      }
    }
  }

  #reverse1 {
    mix-blend-mode: multiply;
  }
</style>
