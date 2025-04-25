<script lang="ts" runes>
  import NewHero from '$lib/components/layout/new-sections/NewHero.svelte';
  import NewServiceSection from '$lib/components/layout/new-sections/NewServiceSection.svelte';
  // import FontTesting from '$lib/styles/FontTesting.svelte';
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
  <div class="leaves-background-container">
    <NewHero />
    <!-- <NewServiceSection /> -->
    <div class="leaves-background"></div>
  </div>

  <!-- <FontTesting /> -->
  <div class="gradient-background-container">
    <!-- <Services /> -->
    <!-- <Testimonials /> -->
    <div class="gradient-background"></div>
  </div>
  <!-- <Projects /> -->
</main>

<style lang="scss">
  %flex-column-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .page-container {
    padding-top: size('2xl');
    @extend %flex-column-center;
    inline-size: 100%;
    // min-block-size: 100svh;
    block-size: 100%;

    margin-inline: auto;
  }

  :is(.leaves-background-container, .gradient-background-container) {
    @extend %flex-column-center;
    inline-size: 100%;
    block-size: 100%;
  }

  .leaves-background {
    position: sticky;
    transform-style: preserve-3d; // Essential: Enables 3D positioning for children
    inset: 0;
    // Add specific styles:
    background: url('/assets/landing-page/leaves.svg') repeat center center;
    background-size: cover;
    opacity: 0.15;
    filter: brightness(1.4) saturate(0.5);
    z-index: -2;
    block-size: 100%; // Or consider 100dvh for better dynamic height
    inline-size: 100%;

    @media (prefers-color-scheme: dark) {
      filter: brightness(0.4) saturate(0.5);
    }
  }

  .gradient-background {
    // position: absolute;
    // z-index: -10;
    // inset-block-start: 0;
    // inset-inline-start: 50%;
    // transform: translateX(-50%);
    // background: url('/assets/landing-page/gradient-background.svg') no-repeat
    //   center/cover fixed;
    // block-size: 100%;
    // inline-size: 100%;
    // filter: brightness(0.75) saturate(1.5);
  }
</style>
