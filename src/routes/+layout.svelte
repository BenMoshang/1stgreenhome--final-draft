<script lang="ts">
  import Footer from '$lib/components/layout/Footer.svelte';
  import NewHeader from '$lib/components/layout/NewHeader.svelte';
  import { wipeDown } from '$lib/actions/wipeDown.svelte';
  import Lenis from 'lenis';
  import { onDestroy, onMount } from 'svelte';
  let { children } = $props();

  onMount(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 2), // easeOutQuad for smooth deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical', // match scroll gesture direction
      smoothWheel: true, // enable smooth wheel scrolling
      wheelMultiplier: 1.5, // boost scroll-to-wheel sensitivity
      lerp: 0.08, // smoother interpolation with snappier response
      infinite: false, // ensure we don't get stuck in infinite scroll
    });

    // Add window resize handler to recalculate scroll boundaries
    const resizeObserver = new ResizeObserver(() => {
      // Force Lenis to recalculate dimensions
      lenis.resize();
    });

    // Observe document element for size changes
    resizeObserver.observe(document.documentElement);

    // Set up a scroll listener to update content when needed
    lenis.on('scroll', (e: any) => {
      // This keeps Lenis aware of scroll position
      document.documentElement.setAttribute(
        'data-scroll-position',
        e.scroll.toString()
      );
    });

    let frameId: number;
    function animate(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);

    onDestroy(() => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    });
  });
</script>

<svelte:head>
  <title
    >1st Green Home - Free Energy Audits, LED Retrofits, and Sustainable
    Solutions</title
  >
</svelte:head>
<div class="layout-wrapper">
  <NewHeader />
  <main class="page-container">
    {@render children()}
  </main>
  <svg class="layout-wrapper__svg" width="0" height="0">
    <defs>
      <filter id="noiseFilter2">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
        />
      </filter>
    </defs>
  </svg>
</div>
<Footer />

<!-- SVG filter for noise effect -->

<style lang="scss" global>
  @use '../lib/styles/main.scss' as *;
  :global(*),
  :global(*::before),
  :global(*::after),
  :global(*::backdrop) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .layout-wrapper {
    position: relative;
    @extend %flex-col-center;
    min-block-size: 100%;
    width: 100%;
    margin: 0 auto;
    isolation: isolate;
    overscroll-behavior: contain;
    pointer-events: auto;

    &__svg {
      position: absolute;
      min-block-size: 100%;
      inline-size: 100%;
      visibility: hidden;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      overflow: clip;
      z-index: 3;
      margin: auto;
      block-size: 100%;
      inline-size: 100%;
      filter: url('#noiseFilter2') contrast(300%) brightness(120%) opacity(1);
      opacity: 0.05;
      pointer-events: none;
    }
  }

  .page-container {
    background: light-dark(hsl(0, 0%, 98%), hsl(0, 0%, 7%));
    flex-grow: 1;
    padding-top: 4.1875rem;
    margin-inline: auto;
    box-shadow: var(--shadow-elevation-high);

    margin-bottom: 95vh;
    @include respond-to('tablet-end') {
      margin-bottom: $footer-height;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative; /* establishes containing block for abs. children */
    z-index: 3;
    gap: size('2xl');
    width: 100%;
    min-height: 100vh;
    & > * {
      flex: 1;
    }
  }

  :global(html) {
    scrollbar-color: var(--brute-secondary) transparent;
    scrollbar-width: thin;
    background: light-dark(hsl(0, 0%, 98%), hsl(0, 0%, 7%));
    scroll-behavior: smooth;

    ::selection {
      background: var(--brute-tertiary);
      color: white;
    }
  }

  :global([data-scroll]) {
    transition:
      transform 1s cubic-bezier(0.165, 0.84, 0.44, 1),
      opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: transform, opacity;
  }
  :global([data-scroll='fade-up']) {
    opacity: 0;
    transform: translateY(50px);
  }
  :global([data-scroll='fade-up'].is-inview) {
    opacity: 1;
    transform: translateY(0);
  }
  :global([data-scroll='fade-in']) {
    opacity: 0;
  }
  :global([data-scroll='fade-in'].is-inview) {
    opacity: 1;
  }
  :global(.brute-container){
    max-inline-size: 80rem;
    margin-inline: auto;
  }
</style>
