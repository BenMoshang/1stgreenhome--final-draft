<script lang="ts">
  import NewHeader from '$lib/components/layout/NewHeader.svelte';
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
    });
    let frameId: number;
    function animate(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);

    onDestroy(() => cancelAnimationFrame(frameId));
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
  {@render children()}
</div>
<svg width="0" height="0" style="position: absolute;">
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
  :global(html) {
    scrollbar-color: var(--brute-secondary) transparent;
    scrollbar-width: thin;
    background: light-dark(hsl(0, 0%, 98%), hsl(0, 0%, 7%));

    ::selection {
      background: var(--brute-tertiary);
      color: white;
    }
    &::before {
      content: '';
      position: absolute;

      inset: 0;

      overflow: clip;
      z-index: 2;
      margin: auto;
      min-block-size: 1000%;
      inline-size: 100%;
      filter: url('#noiseFilter2') contrast(300%) brightness(120%) opacity(1);
      opacity: 0.05;
      pointer-events: none;
      transform: translateZ(0);
      will-change: filter;
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
</style>
