<script lang="ts">
  import { textAnimate } from '$lib/actions/textAnimate.svelte';
  import { wipeDown } from '$lib/actions/wipeDown.svelte';
    // Define hero data interface with only needed properties
  interface HeroData {
    label: string;
    title0: string;
    title: string;
    title2: string;
    body: string;
    body2: string;
    button: string;
  }

  const heroData = $state({
    label: `SIMPLIFY ENERGY SAVINGS`,
    title0: ``,
    title: `Empower Your Business For`,
    title2: `A Greener Tomorrow`,
    body: `Slash overhead by up to 30 % while proving your commitment to sustainability.`,
    body2: ` Book a free, no-obligation energy audit and unlock incentive-funded upgrades today.`,
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
</script>

<section id="hero" class="hero__section u_p-inline__md u_p-block__xl">
  <div class="hero__container u_container__sm">
    <header class="hero__header ga-header">
      <small class="brute__label"
        use:textAnimate={{ duration: 1, delay: 0.04 }}
      >
        {heroData.label}
      </small>

      <h1
        class="u_display-1--bold u_m-bottom__sm typography--secondary max-ch-20"
                use:wipeDown


      >
        {heroData.title0 + heroData.title}
        <span class="gradient-text">{heroData.title2}</span>
      </h1>

      <p
        use:wipeDown
        class="hero__body u_paragraph u_m-bottom__md tert typography--tertiary max-ch-45"
      >
        {heroData.body + heroData.body2}
      </p>

      <button
        onclick={handleEmailClick}
        class="brute__button"
        aria-label="Send email to get started"
      >
        {heroData.button}
        <img
        loading="eager"
        
        src="/assets/icons/icon-lightbulb.svg" alt="Lightbulb" />
      </button>
    </header>

    <div class="hero__image-container">
      <img
        class="hero__image"
        src="/assets/landing-page/hero/herobulb.webp"
        width="640"
        height="640"
        alt="Energy efficient light bulb illustration"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
      />
    </div>
  </div>
</section>

<style lang="scss">
  /* ---------------------------------------------
   * Base Styles and Animations
   * --------------------------------------------- */

  // Animated gradient text for hero titles
  .gradient-text {
    @include gradient-text-animated(3s);
  }

  // Animation for pulsing shadow effect
  @keyframes pulse-shadow {
    0%,
    100% {
      filter: drop-shadow(0 0 0.5rem var(--brute-secondary));
    }
    50% {
      filter: drop-shadow(0 0 1rem var(--brute-secondary));
    }
  }

  /* ---------------------------------------------
   * Layout Structure
   * --------------------------------------------- */

  // Main hero section container
  .hero__section {
    position: relative;
    inline-size: 100%;
  }

  // Inner container with flex layout
  .hero__container {
    inline-size: 100%;
    @extend %flex-col-center;
    gap: size('xl');

    & > * {
      flex: 1;
    }

    @include respond-to('tablet-end') {
      flex-direction: row;
    }
  }

  /* ---------------------------------------------
   * Content Elements
   * --------------------------------------------- */

  // Text content container
  .hero__header {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  /* ---------------------------------------------
   * Visual Elements
   * --------------------------------------------- */

  // Hero image and decorative elements
  .hero__image {
    aspect-ratio: 1 / 1;
    object-fit: contain;
    filter: brightness(1.5) saturate(1.3);
  }

  // Container with decorative pseudo-elements
  .hero__image-container {
    // Positioning
    position: relative;
    z-index: 3;
    aspect-ratio: 1 / 1;

    // Visual effects
    filter: drop-shadow(0 0 1rem var(--brute-secondary));
    animation: pulse-shadow 3s infinite ease-in-out;

    // Custom properties
    --background-dimensions: 70%;
    --background-abs-pos: 14%;

    // Decorative pseudo-elements
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
      z-index: -1;
      background-image: url('/assets/landing-page/hero/abstract.webp');
      background-position: 0% 100%;
      background-size: cover;
      mix-blend-mode: screen;
    }

    &::after {
      z-index: -2;
      background: oklch(26.6% 0.065 152.934);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      filter: brightness(0.9) saturate(0.75);
    }
  }
</style>
