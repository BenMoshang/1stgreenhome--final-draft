<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
    import NewHeader from '$lib/components/NewHeader.svelte';
    import '$lib/styles/main.scss';
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
      lerp: 0.08, // smnoother interpolation with snappier response
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
