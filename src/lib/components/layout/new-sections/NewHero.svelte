<script lang="ts">
  // Import required modules
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';

  // Assuming design system types/interfaces might be needed later
  // import type { /* ... */ } from '$lib/types'; // Example import

  // Data model for hero content
  interface HeroData {
    label: string;
    title0: string;
    title: string;
    title2: string;
    subtitle: string;
    subtitle2: string;
    // benefits seem unused in the template, remove if not needed elsewhere
    benefit1: string;
    benefit2: string;
    benefit3: string;
    button: string;
  }

  // Links - currently unused in the template
  // const links = [{ link: '/home', fragment: 'cta' }]; // Remove if not needed

  // Initialize hero data array
  const heroData: HeroData[] = [
    {
      label: `SIMPLIFY ENERGY SAVINGS`,
      title0: ``,
      title: ` Empower Your Business For`,
      title2: `A Greener Tomorrow`,
      subtitle: `Save money, cut energy use, and protect the planet. `,
      subtitle2: `Start with our free energy audit to start your sustainable journey!`,
      benefit1: `kWh Savings`, // Unused
      benefit2: `Overall Client Savings`, // Unused
      benefit3: `Commercial Projects`, // Unused
      button: `GET STARTED`,
    },
  ];

  // Reactive state for hero data
  let hero = $state<HeroData | null>(null);

  // Initialize hero data on component mount
  onMount(() => {
    hero = heroData[0];
  });

  // Function to handle button click (email)
  function handleEmailClick() {
    // Create a temporary anchor element
    const mailtoLink = document.createElement('a');
    const emailAddress = 'info@1stgreenhome.com';
    mailtoLink.href = `mailto:${emailAddress}?subject=Get Started with 1st Green Home`;
    mailtoLink.target = '_self'; // Force same window/tab behavior
    mailtoLink.rel = 'noopener noreferrer';

    // Append to body, click it, then remove it
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    document.body.removeChild(mailtoLink);

    // Add this if you want to provide a fallback for users without email client configured
    setTimeout(() => {
      // If no client opened (check could happen here), offer to copy email to clipboard
      if (
        confirm(
          'Would you like to copy our email address to your clipboard instead?'
        )
      ) {
        navigator.clipboard
          .writeText(emailAddress)
          .then(() => alert('Email address copied to clipboard!'))
          .catch((err) => console.error('Failed to copy: ', err));
      }
    }, 500);
  }

  // Svelte custom transition function for fade in up effect
  const fadeInUpTransition = (
    node: Element,
    { delay = 0, duration = 500, y = 30 } = {}
  ) => {
    // Get computed style to avoid overriding existing transforms
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      delay,
      duration,
      easing: cubicOut, // Matches the original CSS animation's timing function more closely
      css: (t: number, u: number) => `
				opacity: ${t};
				transform: ${transform} translateY(${y * u}px);
			`,
      // t ranges from 0 to 1 (start to end), u is 1 - t
    };
  };

  // REMOVE Animation classes - dynamically added
  // const animationClasses = {
  // 	label: 'animate-fade-in-up animate-delay-0',
  // 	title: 'animate-fade-in-up animate-delay-200',
  // 	subtitle: 'animate-fade-in-up animate-delay-400',
  // 	button: 'animate-fade-in-up animate-delay-600',
  // 	image: 'animate-fade-in-up animate-delay-1000'
  // };
</script>

{#if hero}
  <section id="hero" class="u_p-inline__md u_p-block__lg">
    <div class="u_container__md container--grid ">
      <img
        class="ga-image"
        src="/assets/landing-page/hero/herobulb.webp"
        width="640"
        height="640"
        alt="Energy efficient light bulb illustration"
        loading="eager"
        decoding="sync"
      />

      <header class="max-ch-65 ga-header">
        <p class="brute__label">
          {hero.label}
        </p>
        <h1 class="u_display-1--bold typography--secondary u_m-bottom__md">
          {hero.title0 + hero.title}
          <span class="brute__text--primary">{hero.title2}</span>
        </h1>
        <p class="u_paragraph typography--tertiary">
          {hero.subtitle + hero.subtitle2}
        </p>

        <button onclick={handleEmailClick} class="brute__button">
          {hero.button}

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
            ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
              d="M10 14l11 -11"
            /><path
              d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
            /></svg
          >
        </button>
      </header>
    </div>
  </section>
{/if}

<style lang="scss">
  .container--grid{
    display:grid;
    grid-template-columns: 1fr;
    grid-template-areas: "image"
                         "header";


@include respond-to('tablet-end'){
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "image header";
}
  }

img{
  object-fit: cover;
}
  .ga-header{
    grid-area:header;
  }

  .ga-image{
    grid-area:image;
  }
  // No global imports needed here; rely on globally available CSS custom properties from app.scss

  /* Apply box-sizing globally if not already done */
  *,
  *::before,
  *::after,
  *::backdrop {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
</style>
