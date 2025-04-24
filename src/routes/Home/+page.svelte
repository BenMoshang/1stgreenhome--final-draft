<script lang="ts">
  // These would be imports for other sections once migrated
  // import Stepper from '$lib/components/sections/Stepper.svelte';
  // import Partners from '$lib/components/sections/Partners.svelte';
  // import Faqs from '$lib/components/sections/Faqs.svelte';
  // import Cta from '$lib/components/sections/Cta.svelte';
  import NewHero from '$lib/components/layout/new-sections/NewHero.svelte';
  // For handling fragment navigation (similar to Angular's fragment handling)
  import FontTesting from '$lib/styles/FontTesting.svelte';
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
  <!-- <FontTesting /> -->
  <div class="gradient-background-container">
    <!-- <Services /> -->
    <!-- <Testimonials /> -->
    <div class="gradient-background"></div>
  </div>
  <!-- <Projects /> -->
</main>

<style lang="scss">
  .page-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    block-size: 100%;
    inline-size: 100%;
    margin-inline: auto;

    & > * {
      flex: 1;
    }
  }

  .gradient-background-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    inline-size: 100%;
  }

  .gradient-background {
    position: absolute;
    z-index: -10;
    inset-block-start: 0;
    inset-inline-start: 50%;
    transform: translateX(-50%);
    background: url('/assets/landing-page/gradient-background.svg') no-repeat
      center/cover fixed;
    block-size: 100%;
    inline-size: 100vw;
    filter: brightness(0.75) saturate(1.5);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: url('/assets/landing-page/leaves.svg') no-repeat center/cover
        fixed;
      filter: contrast(0.7) brightness(0.3);
      opacity: 0.2;
    }
  }
</style>
