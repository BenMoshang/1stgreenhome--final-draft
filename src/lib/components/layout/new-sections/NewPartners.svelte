<!-- src/lib/components/Partners.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { inView, animate, scroll } from 'motion';
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
    inView(labelEl, ({ target, isInView }) => {
      if (isInView)
        animate(target, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6 });
    });
    inView(titleEl, ({ target, isInView }) => {
      if (isInView)
        animate(
          target,
          { opacity: [0, 1], y: [20, 0] },
          { delay: 0.2, duration: 0.6 }
        );
    });
    inView(descEl, ({ target, isInView }) => {
      if (isInView)
        animate(
          target,
          { opacity: [0, 1], y: [20, 0] },
          { delay: 0.4, duration: 0.6 }
        );
    });

    scroll(
      forwardEls,
      {
        x: ['-750px', '0px'],
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [0, 360],
        skewX: [0, 5, 0],
        scale: [1, 1.1, 1],
      },
      {
        target: container,
        offset: ['start end', 'end start'],
        easing: 'ease-out',
      }
    );

    scroll(
      reverseEls,
      {
        x: ['750px', '0px'],
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [0, -360],
        skewX: [0, -5, 0],
        scale: [1, 1.1, 1],
      },
      {
        target: container,
        offset: ['start end', 'end start'],
        easing: 'ease-out',
      }
    );
  });
</script>

<section
  id="partners"
  class="partners u_p-inline__md u_p-block__xl"
  bind:this={container}
>
  <div class="partners__container u_container__sm u_gap__xl">
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

    <div class="partners__logos">
      {#each partners as p, i}
        <div
          class="partners__logo-item"
          id={'forward' + i}
          bind:this={forwardEls[i]}
        >
          <img
            class="partner__image"
            src={p.imageSrc}
            alt="partner logo"
            loading="lazy"
          />
        </div>
      {/each}

      {#each partnersReverse as p, i}
        <div
          class="partners__logo-item"
          id={'reverse' + i}
          bind:this={reverseEls[i]}
        >
          <img class="partner__image" src={p.imageSrc} alt="partner logo" />
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

    &__logos {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &__logo-item {
      flex: 1 1 45%;
      box-shadow: var(--shadow-medium--secondary);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      border-radius: var(--border-radius);
      background: var(--convex-light);
      outline: 0.0625rem solid var(--color-light);
      margin-bottom: 1rem;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .partner__image {
    object-fit: contain;
    width: 100%;
    height: 8rem;
    max-width: 12.6875rem;
    filter: drop-shadow(0 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
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

  @media (min-width: 50.625rem) {
    .partners__logo-item {
      flex: 1 1 22%;
    }
  }
</style>
