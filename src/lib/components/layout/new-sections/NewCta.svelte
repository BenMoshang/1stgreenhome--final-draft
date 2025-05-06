<script lang="ts">
  import { wipeDown } from '$lib/actions/wipeDown.svelte';

  import { textAnimate } from '$lib/actions/textAnimate.svelte';
  // CTA section data using Svelte 5 Runes
  const cta = $state({
    label: 'CONTACT US',
    title1: 'Your Green Journey Starts Here',
    title2: 'Starts Here',
    description:
      "Switch to renewable energy and make a lasting impact. Schedule your consultation now—let's power a sustainable future together.",
    button: 'GET STARTED',
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

<section id="cta" class="cta-section u_p-inline__md u_p-block__xl">
  <div class="cta-section__container u_container__sm ">
    <header class="cta-section__header">
      <small
      use:textAnimate
      class="cta-section__header-label brute__label">
        {cta.label}
      </small>
      <h2
      use:wipeDown
        class=" cta-section__header-heading max-ch-20 u_display-2--bold typography--primary u_m-bottom__sm"
      >
        {cta.title1}
        <strong class="cta-section__header-heading--gradient"
          >{cta.title2}</strong
        >
      </h2>
      <p
      use:wipeDown
        class=" u_m-bottom__lg cta-section__header-body m u_paragraph typography--tertiary"
      >
        {cta.description}
      </p>

      <button
        onclick={handleEmailClick}
        class="cta-section__header-button brute__button"
        aria-label="Send email to get started"
      >
        {cta.button}
        <img src="/assets/icons/icon-lightbulb.svg" alt="Lightbulb" />
      </button>
    </header>
    <div class="cta-section__map-container">
      <iframe
        class="cta-section__map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.5463320227776!2d-76.80009168402638!3d39.1491968435434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7e19db4c40b81%3A0x8892a6ba28a0442a!2s10630%20Riggs%20Hill%20Rd%20Unit%20A%2C%20Jessup%2C%20MD%2020794!5e0!3m2!1sen!2sus!4v1620160000000!5m2!1sen!2sus"
        frameborder="0"
        style="border:0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="1st Green Home Location: 10630 Riggs Hill Rd. Unit A, Jessup, MD 20794"
        aria-label="Google Maps showing 1st Green Home's office location at 10630 Riggs Hill Rd. Unit A, Jessup, MD 20794"
      ></iframe>

    </div>
  </div>
</section>

<style lang="scss">
  .cta-section {
    inline-size: 100%;

    &__container {
      @extend %flex-col-center;
      gap: size('xl');
      overflow: visible; /* Ensure parent container allows sticky positioning */
      & > * {
        flex: 1;
      }
      @include respond-to('tablet-end') {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__header {
      text-align: center;

      @extend %flex-col-center;
      @include respond-to('tablet-end') {
        margin-right: auto;
        position: sticky;
        top: size('2xl');
        align-self: flex-start;
        text-align: left;
        z-index: 10; /* Add z-index to ensure header appears above other content */

        align-items: flex-start;
        justify-content: flex-start;
      }

      &-heading {
        &--gradient {
          @include gradient-text-animated(3s);
        }

        @include respond-to('tablet-end') {
          margin-right: auto;
        }
      }

      &-body {
        max-inline-size: 35ch;
      }
    }

    &__map-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-block: size('xl');
      
      @include respond-to('tablet-end') {
        margin-block: 0;
      }
    }

    &__map {
      display: block;
      margin-inline: auto;
      inline-size: 100%;
      max-inline-size: 40rem;
      max-block-size: 40rem;
      aspect-ratio: 16 / 9;
      border-radius: $border-radius;
      box-shadow: var(--shadow-elevation-medium);
      margin-block: size('md');
    }

    &__address {
      font-size: var(--font-size-body);
      margin-top: size('sm');
      color: var(--on-surface-container-high);
      font-weight: 500;
    }

    &__button {
      margin-inline: auto;
    }
  }
</style>
