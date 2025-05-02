<script lang="ts">
  import { parallax } from '$lib/actions/parallax.svelte';
  import NewCta from '$lib/components/layout/new-sections/NewCta.svelte';
  import NewFaqs from '$lib/components/layout/new-sections/NewFaqs.svelte';
  import NewHero from '$lib/components/layout/new-sections/NewHero.svelte';
  import NewPartners from '$lib/components/layout/new-sections/NewPartners.svelte';
  import NewProjectsSection from '$lib/components/layout/new-sections/NewProjectsSection.svelte';
  import NewServiceSection from '$lib/components/layout/new-sections/NewServiceSection.svelte';
  import NewTestimonials from '$lib/components/layout/new-sections/NewTestimonials.svelte';
  import { onMount } from 'svelte';

  // Function to handle fragment navigation
  function jumpToFragment(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Check for fragment in URL on mount
  onMount(() => {
    // Get fragment from URL
    const hash = window.location.hash.substring(1);
    if (hash) {
      jumpToFragment(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1);
      if (newHash) {
        jumpToFragment(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });
</script>

<main class="page-container">
  <div class="leaves-background" use:parallax={{ offset: 50 }}></div>

  <NewHero />
  <div class="gradient-background-container">
    <!-- <section class="curved"></section> -->
    <NewServiceSection />
    <NewTestimonials />
    <!-- <section class="curved"></section> -->
  </div>
  <NewProjectsSection />
  <div class="gradient-background-container-2">
    <!-- <section class="curved"></section> -->
    <NewPartners />
    <NewFaqs />
    <!-- <section class="curved"></section  > -->
  </div>
  <NewCta />
</main>

<style lang="scss">
  .page-container {
    padding-top: 4.1875rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* establishes containing block for abs. children */

    gap: size('2xl');
    width: 100%;
    height: 100%; /* full viewport height */
    & > * {
      flex: 1;
    }
    /* Decorative leaves background */

    & .leaves-background {
      position: absolute;
      inset: 0; /* top:0; right:0; bottom:0; left:0; */
      inline-size: 100%;
      block-size: 100%;
      margin: auto;
      background-image: url('/assets/landing-page/leaves.svg');
      background-position: center;

      background-repeat: repeat;
      opacity: 0.15;
      filter: brightness(1.4) saturate(0.5);
      z-index: -1;
      will-change: transform;
      @media (prefers-color-scheme: dark) {
        filter: brightness(0.4) saturate(0.5);
      }
    }
  }

  .gradient-background-container,
  .gradient-background-container-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    gap: size('2xl');
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle at top center,
      var(--brute-primary) 10%,
      var(--brute-secondary) 60%,
      var(--brute-tertiary) 100%
    );
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .gradient-background-container {
    @include respond-to('tablet-end') {
      background-image: radial-gradient(
        circle at top right,
        var(--brute-primary) 10%,
        var(--brute-secondary) 60%,
        var(--brute-tertiary) 100%
      );
    }
  }

  .curved {
    flex: none;
    position: relative;
    width: 100%;
    height: size('2xl');
    margin-top: calc(-1 * #{size('2xl')});
    background: light-dark(hsl(0, 0%, 98%), hsl(0, 0%, 7%));
    border-bottom-left-radius: 50% 20%;
    border-bottom-right-radius: 50% 20%;
  }
</style>
