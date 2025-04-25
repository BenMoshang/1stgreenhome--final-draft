<script lang="ts">
  import NewHeader from '$lib/components/layout/NewHeader.svelte';
  let { children } = $props();
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

  <!-- <Footer /> -->
</div>
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
  html {
    &::before {
      position: fixed;
      z-index: -2;
      margin: auto;
      block-size: 100%;
      content: '';
      filter: url('#noiseFilter2') contrast(300%) brightness(120%) opacity(1);
      inline-size: 100%;
      inset: 0;
      opacity: 0.05;
      pointer-events: none;
      transform: translateZ(0);
      will-change: filter;
    }
    // &::after {
    //   position: absolute;
    //   z-index: -1;
    //   margin: auto;
    //   background-attachment: fixed;
    //   background-image: url('/assets/landing-page/leaves.svg');
    //   background-position: center;
    //   background-repeat: no-repeat;
    //   background-size: cover;
    //   block-size: 100%;
    //   content: '';
    //   inline-size: 100%;
    //   inset: 0;
    //   opacity: 0.05;
    // }
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
  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
    :global([data-scroll]) {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
</style>
