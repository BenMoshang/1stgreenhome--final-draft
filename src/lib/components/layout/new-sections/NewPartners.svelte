<script lang="ts">
  import { onMount } from 'svelte';
  import { inView, animate, scroll, stagger } from 'motion';
  import { fade } from 'svelte/transition';

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
    { imageSrc: '/assets/landing-page/partners/lgo.svg' },
    { imageSrc: '/assets/landing-page/partners/logo-pmed.png' },
  ];

  const partnersReverse = [
    { imageSrc: '/assets/landing-page/partners/EmPOWER_Color.png' },
    { imageSrc: '/assets/landing-page/partners/logo-energy-star.png' },
    {
      imageSrc:
        '/assets/landing-page/partners/logo-SouthernMarylandElectricCooperative.svg',
    },
    { imageSrc: '/assets/landing-page/partners/logo-bpi.png' },
  ];

  onMount(() => {
    inView(labelEl, (element, entry) => {
      if (entry.isIntersecting) {
        animate(entry.target as HTMLElement, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6 });
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
    inView(container, () => {
      const allLogos = [...forwardEls, ...reverseEls];
      const staggerDelay = 0.15; // Base delay between animations

      allLogos.forEach((logo, index) => {
        // Explicitly type keyframes object
        const keyframes: Record<string, any> = {
          opacity: [0, 1],
          transform: [
            'translateY(20px) scale(0.8)',
            'translateY(0px) scale(1)'
          ]
        };

        animate(
          logo, // Animate individual logo
          keyframes, // Pass typed keyframes
          { // Options
            duration: 0.8,
            delay: index * staggerDelay, // Manual stagger calculation
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)' // Modern cubic bezier
          }
        );
      });
    }, { amount: 0.1 }); // Trigger when 10% of the container is visible

  });
</script>

<section
  id="partners"
  class="partners u_p-inline__md u_p-block__xl"
  bind:this={container}
>
  <div class="partners__container u_container__sm">
    <header class="partners__header">
      <small
        class="partners__header-label brute__label"
        bind:this={labelEl}
        transition:fade={{ duration: 0.6 }}
      >
        {header.label}
      </small>
      <h2
        class="max-ch-20 partners__header-heading u_display-2--bold typography--primary"
        bind:this={titleEl}
        transition:fade={{ delay: 200, duration: 0.6 }}
      >
        {header.title}
      </h2>
      <p
        class="partners__header-body max-ch-45 u_paragraph typography--secondary"
        bind:this={descEl}
        transition:fade={{ delay: 400, duration: 0.6 }}
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
    &__header {
      text-align: center;
    }

    &__logos-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      &-item {
        flex: 1 1 45%;
        box-shadow: var(--shadow-elevation-medium);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        margin-bottom: 1rem;

        border-radius: $border-radius;

        &:hover {
          transform: scale(1.05);
        }
        &--image {
          object-fit: contain;
          width: fit-content;
          height: auto;
          aspect-ratio: 1 / 1;
          filter: drop-shadow(0 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
        }
      }
    }
  }

  /* Gradients carried over from original CSS */
  #forward0,
  #forward1,
  #forward2 {
    background: linear-gradient(145deg, #eee4fa, #77618f);
  }
  #forward3 {
    background: linear-gradient(145deg, #f0ffff, #69c1da);
  }
  #reverse0,
  #reverse1 {
    background: linear-gradient(145deg, #f0ffff, #69c1da);
  }
  #reverse2,
  #reverse3 {
    background: linear-gradient(145deg, #e3fdf2, #faffc9);
  }

  @include respond-to('tablet-start') {
    .partners__logo-item {
      flex: 1 1 22%;
    }
  }
</style>
