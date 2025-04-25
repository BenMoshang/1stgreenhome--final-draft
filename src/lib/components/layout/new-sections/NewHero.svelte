<script lang="ts" runes>
  import { cubicOut } from 'svelte/easing';

  // Define hero data interface with only needed properties
  interface HeroData {
    label: string;
    title0: string;
    title: string;
    title2: string;
    subtitle: string;
    subtitle2: string;
    button: string;
  }

  // Initialize hero data using $state
  const heroData = $state({
    label: `SIMPLIFY ENERGY SAVINGS`,
    title0: ``,
    title: `Empower Your Business For`,
    title2: `A Greener Tomorrow`,
    subtitle: `Save money, cut energy use, and protect the planet. `,
    subtitle2: `Start with our free energy audit to start your sustainable journey!`,
    button: `GET STARTED`,
  });

  // Constants for email functionality
  const EMAIL_ADDRESS = $state('info@1stgreenhome.com');
  const EMAIL_SUBJECT = $state('Get Started with 1st Green Home');

  /**
   * Handles email button click - opens email client or copies to clipboard
   */
  function handleEmailClick() {
    // Create mailto link
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
    mailtoLink.target = '_self';
    mailtoLink.rel = 'noopener noreferrer';

    // Execute click and remove element
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    document.body.removeChild(mailtoLink);

    // Fallback for users without email client
    setTimeout(() => {
      if (
        confirm(
          'Would you like to copy our email address to your clipboard instead?'
        )
      ) {
        navigator.clipboard
          .writeText(EMAIL_ADDRESS)
          .then(() => alert('Email address copied to clipboard!'))
          .catch((err) => console.error('Failed to copy: ', err));
      }
    }, 500);
  }

  /**
   * Custom transition function for fade-in-up animation
   */
  function fadeInUpTransition(
    node: Element,
    { delay = 0, duration = 500, y = 30 } = {}
  ) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      delay,
      duration,
      easing: cubicOut,
      css: (t: number, u: number) => `
        opacity: ${t};
        transform: ${transform} translateY(${y * u}px);
      `,
    };
  }
</script>

<section id="hero" class="hero__section u_p-inline__md u_p-block__lg">
  <div class="hero__container u_container__sm container--grid u_gap__xl">
    <div class="hero__image-container ga-image">
      <img
        class="hero__image"
        src="/assets/landing-page/hero/herobulb.webp"
        width="640"
        height="640"
        alt="Energy efficient light bulb illustration"
        loading="eager"
        decoding="sync"
      />
    </div>

    <header class="hero__header ga-header">
      <p class="brute__label">
        {heroData.label}
      </p>

      <h1 class="u_display-1--bold typography--secondary max-ch-20">
        {heroData.title0 + heroData.title}
        <span class="gradient-text brute__text--primary">{heroData.title2}</span
        >
      </h1>

      <p class="u_paragraph u_m-top__sm typography--tertiary max-ch-45">
        {heroData.subtitle + heroData.subtitle2}
      </p>

      <button
        on:click={handleEmailClick}
        class="u_m-top__md brute__button"
        aria-label="Send email to get started"
      >
        {heroData.button}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-send"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 14l11 -11" />
          <path
            d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
          />
        </svg>
      </button>
    </header>
  </div>
</section>

<style lang="scss">
  .gradient-text {
    @include gradient-text-animated(3s);
  }

  .hero__container {
    inline-size: 100%;
  }

  .container--grid {
    display: grid;
    grid-template-columns: 1fr;

    place-items: center;
    grid-template-areas: 'header' 'image';

    @include respond-to('tablet-end') {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: 'header image';
    }
  }

  .hero__image {
    inline-size: 100%;
    block-size: 100%;
    filter: brightness(1.5) saturate(1.3);
  }

  .hero__image-container {
    max-inline-size: 31.25rem;
    max-block-size: 31.25rem;
    filter: drop-shadow(0 0 0.5rem var(--brute-secondary));
    position: relative;
    z-index: 3;
    --background-dimensions: 70%;
    --background-abs-pos: 14%;

    &::before,
    &::after {
      content: '';
      position: absolute;
      border-radius: 0% 100% 0% 100% / 17% 77% 23% 83%;
      block-size: var(--background-dimensions);
      inline-size: var(--background-dimensions);
      inset-block-start: var(--background-abs-pos);
      inset-inline-start: var(--background-abs-pos);
      transform: translateX(0.5rem) scaleX(-1);
    }

    &::before {
      background-image: url('/assets/landing-page/hero/abstract.webp');
      background-position: 0% 100%;
      background-size: cover;
      mix-blend-mode: screen;
      z-index: -1;
    }

    &::after {
      @include apply-shadow('lg');
      background: oklch(26.6% 0.065 152.934);
      filter: brightness(0.9) saturate(0.7);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      z-index: -2;
    }
  }

  .ga-header {
    grid-area: header;
  }

  .ga-image {
    grid-area: image;
  }

  .hero__header {
    inline-size: 100%;
  }
</style>
