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

<div class="home-content">
  <div class="leaves-background" use:parallax={{ offset: 100 }}></div>

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
    <!-- <section class="curved"></section> -->
  </div>
  <NewCta />
</div>

<style lang="scss">

/* --- Page Container --- */
.home-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: size('2xl');
  width: 100%;
  min-height: 100%;
}

/* --- Decorative Backgrounds --- */
.leaves-background {
  position: absolute;
  inset: 0;
  z-index: -1;
  display: block;
  inline-size: 100%;
  block-size: 100%;
  margin: auto;
  background-image: url('/assets/landing-page/leaves.svg');
  background-position: center;
  background-repeat: repeat;
  opacity: 0.2;
  filter: brightness(1.4) saturate(0.5);
  will-change: transform; // Hint for browser optimization for parallax effect.

  @media (prefers-color-scheme: dark) {
    filter: brightness(0.4) saturate(0.5);
  }
}

/* --- Section Wrappers --- */
.gradient-background-container,
.gradient-background-container-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: size('2xl');
  width: 100%;
  height: 100%; // Consider if this should be min-height or if content dictates height.
  margin: 0 auto;
  background-image: radial-gradient(
    circle at top center,
    var(--brute-primary) 10%,
    var(--brute-secondary) 60%,
    var(--brute-tertiary) 100%
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

// Specific override for the first gradient container on larger screens
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

/* --- Decorative Elements --- */
// Styles for .curved element, which is currently commented out in the HTML.
.curved {
  position: relative;
  flex: none; // Prevents the element from growing or shrinking in a flex container.
  width: 100%;
  height: size('2xl');
  margin-top: calc(-1 * #{size('2xl')}); // Negative margin to create overlap for the curve effect.
  background: light-dark(hsl(0, 0%, 98%), hsl(0, 0%, 7%)); // Adapts background based on light/dark mode.
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
}</style>
