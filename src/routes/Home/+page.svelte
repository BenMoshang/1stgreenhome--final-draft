<script lang="ts">
  import NewHero from '$lib/components/layout/new-sections/NewHero.svelte';

  import { parallax } from '$lib/actions/parallax.svelte';
  import NewServiceSection from '$lib/components/layout/new-sections/NewServiceSection.svelte';
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
  <NewHero />

  <div class="gradient-background-container">
    <!-- top curved divider-->

    <NewServiceSection />

    <!-- <Testimonials /> -->
    <div class="gradient-background"></div>
    <div class="leaves-background" use:parallax={{ offset: 50 }}></div>
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
    --_gap: #{size('2xl')};

    @extend %flex-column-center;
    gap: var(--_gap);
    inline-size: 100%;
    block-size: 100%;
    overflow: clip;
    margin-inline: auto;
    position: relative;
    & .leaves-background {
      position: absolute; // Changed from fixed
      inset: 0;
      margin: auto;
      background: url('/assets/landing-page/leaves.svg') repeat center center;
      background-size: cover;
      opacity: 0.15;
      filter: brightness(1.4) saturate(0.5);
      z-index: -2;
      block-size: 100%;
      inline-size: 100%;
      will-change: transform; // Added for performance

      @media (prefers-color-scheme: dark) {
        filter: brightness(0.4) saturate(0.5);
      }
    }
    .gradient-background-container {
      position: relative;
      @extend %flex-column-center;
      gap: var(--_gap);

      inline-size: 100%;
      block-size: 100%;

      & .gradient-background {
        position: absolute; // Added
        top: 0;
        left: 0;
        z-index: -1; // Added
        background-image: radial-gradient(
          circle at top center,
          var(--brute-primary) 10%,
          var(--brute-secondary) 60%,
          var(--brute-tertiary) 100%
        );

        block-size: 100%; // Added
        inline-size: 100%; // Added
      }
    }
  }
</style>
