<script lang="ts">
  import { parallax } from '$lib/actions/parallax.svelte';
  import NewHero from '$lib/components/layout/new-sections/NewHero.svelte';
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
  <!-- add round section divider here  -->
  <div class="gradient-background-container">
    <NewServiceSection />
    <NewTestimonials />
  </div>
  <NewProjectsSection />
  <!-- add round section divider here  -->
</main>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative; /* establishes containing block for abs. children */
    --gap: clamp(1rem, 4vw, 3rem);

    gap: var(--gap);
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
      background: url('/assets/landing-page/leaves.svg') center/cover repeat;
      opacity: 0.15;
      filter: brightness(1.4) saturate(0.5);
      z-index: -2;
      will-change: transform;
      @media (prefers-color-scheme: dark) {
        filter: brightness(0.4) saturate(0.5);
      }
    }
  }

  .gradient-background-container {
    position: relative; /* establishes containing block for abs. children */

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--gap);
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

    @include respond-to('tablet-end') {
      background-image: radial-gradient(
        circle at top right,
        var(--brute-primary) 10%,
        var(--brute-secondary) 60%,
        var(--brute-tertiary) 100%
      );
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>
