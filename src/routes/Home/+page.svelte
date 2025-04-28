<script lang="ts">
  import NewHero from '$lib/components/layout/new-sections/NewHero.svelte';

  import NewServiceSection from '$lib/components/layout/new-sections/NewServiceSection.svelte';
  // import FontTesting from '$lib/styles/FontTesting.svelte';
  import { onMount } from 'svelte';
  import { parallax } from '$lib/actions/parallax';

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

  // Add curved SVG scroll animation logic
  let curvePath: SVGPathElement;
  const defaultCurveValue = 350;
  const curveRate = 3;
  let ticking = false;

  onMount(() => {
    const scrollEvent = (scrollPos: number) => {
      if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
        const curveValue = defaultCurveValue - scrollPos / curveRate;
        curvePath.setAttribute("d", `M 800 300 Q 400 ${curveValue} 0 300 L 0 0 L 800 0 L 800 300 Z`);
      }
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollEvent(scrollPos);
          ticking = false;
        });
      }
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll);
    scrollEvent(window.scrollY);

    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<main class="page-container">
  <div class="leaves-background-container">
    <NewHero />

    <div class="leaves-background" use:parallax={{ offset: 50 }}></div>
  </div>

  <div class="gradient-background-container">
    <!-- Top curved divider -->
    <div class="divider svg-top">
      <svg viewBox="0 0 800 400" preserveAspectRatio="none" class="divider-svg">
        <path bind:this={curvePath} fill="#50c6d8" d="M 800 300 Q 400 350 0 300 L 0 0 L 800 0 L 800 300 Z" />
      </svg>
    </div>
    <NewServiceSection />

    <!-- <Testimonials /> -->
    <div class="gradient-background" use:parallax={{ offset: 100 }}></div>
    <!-- Bottom curved divider -->
    <div class="divider svg-bottom">
      <svg viewBox="0 0 800 400" preserveAspectRatio="none" class="divider-svg">
        <path fill="#50c6d8" d="M 800 300 Q 400 350 0 300 L 0 400 L 800 400 L 800 300 Z" />
      </svg>
    </div>
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
    gap: size('2xl');
    inline-size: 100%;
    block-size: 100%;
    position: relative; // Added for positioning context
    overflow: hidden; // Added to contain absolute children
  }

  .leaves-background {
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

  .gradient-background {
    position: absolute; // Added
    inset: 0; // Added
    z-index: -1; // Added
    // Example gradient - adjust as needed
    background: linear-gradient(180deg, hsla(120, 60%, 70%, 0.1), hsla(200, 60%, 70%, 0.1));
    block-size: 100%; // Added
    inline-size: 100%; // Added
    will-change: transform; // Added for performance
    // filter: brightness(0.75) saturate(1.5); // Uncomment and adjust if needed
  }

  /* Curved divider styles */
  .divider {
    position: absolute;
    inset-inline: 0;
    height: 100px;
    overflow: hidden;
    line-height: 0;
    z-index: 0;
  }

  .svg-top {
    top: 0;
  }

  .svg-bottom {
    bottom: 0;
    transform: rotate(180deg);
  }

  .divider-svg {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
