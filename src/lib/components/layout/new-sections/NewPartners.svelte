<script lang="ts">
import { scaleOnView } from '$lib/actions/scaleOnView.svelte';
import { textAnimate } from '$lib/actions/textAnimate.svelte';
import { wipeDown } from '$lib/actions/wipeDown.svelte';

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


</script>

<section
  id="partners"
  class="partners u_p-inline__md u_p-block__xl"
>
  <div class="partners__container u_container__sm ">
    <header class="partners__header u_m-bottom__xl">
      <small
        use:textAnimate
        class="partners__header-label brute__label-rev"
      >
        {header.label}
      </small>
      <h2
        use:wipeDown

        class=" partners__header-heading max-ch-20 u_display-2--bold typography--primary-rev u_m-bottom__sm"
      >
        {header.title}
      </h2>
      <p
        use:wipeDown

        class="partners__header-body m u_paragraph typography--secondary-rev"
      >
        {header.description}
      </p>
    </header>

    <div class="partners__logos-container">
      {#each partners as p, i}
        <div use:scaleOnView={{ delay: i * 0.1 }} class="partners__logo-container-item">
          <img
            class="partners__logo-container-item--image"
            src={p.imageSrc}
            alt="partner logo"
            loading="lazy"
          />
        </div>
      {/each}

      {#each partnersReverse as p, i}
        <div use:scaleOnView={{ delay: i * 0.1 }} class="partners__logo--container-item">
          <img
          id={`reverse${i}`}
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
    

    &__container {
    @extend %flex-col-center;
      gap: size('2xl');
    }
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
      gap: size('xl');
      place-items: center;
      max-inline-size: calc(4 * 10rem + 3 * var(--size-lg));
      margin-inline: auto;

      &-item {
        box-shadow: var(--shadow-elevation-medium);
        inline-size: size('xl');
        block-size: size('xl');
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


</style>
