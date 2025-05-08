<script lang="ts">
  import { parallax } from '$lib/actions/parallax.svelte';
  import NewCta from '$lib/components/new-sections/NewCta.svelte';
  import NewFaqs from '$lib/components/new-sections/NewFaqs.svelte';
  import NewHero from '$lib/components/new-sections/NewHero.svelte';
  import NewPartners from '$lib/components/new-sections/NewPartners.svelte';
  import NewProjectsSection from '$lib/components/new-sections/NewProjectsSection.svelte';
  import NewServiceSection from '$lib/components/new-sections/NewServiceSection.svelte';
  import NewTestimonials from '$lib/components/new-sections/NewTestimonials.svelte';
  import { onMount } from 'svelte';

  function jumpToFragment(fragment: string) {
    const el = document.getElementById(fragment);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(() => {
    const hash = window.location.hash.slice(1);
    if (hash) jumpToFragment(hash);
    const onHash = () => jumpToFragment(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  });
</script>

<main class="home-content">
  <div class="leaves-background" use:parallax={{ offset: 100 }} />

  <div class="content-layer">
    <NewHero />
  </div>

  <section class="gradient-section">
    <div class="content-layer">
      <NewServiceSection />
      <NewTestimonials />
    </div>
  </section>

  <div class="content-layer">
    <NewProjectsSection />
  </div>

  <section class="gradient-section">
    <div class="content-layer">
      <NewFaqs />
      <NewPartners />
    </div>
  </section>

  <div class="content-layer">
    <NewCta />
  </div>
</main>

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

/* --- Decorative Leaves Background --- */
.leaves-background {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: url('/assets/landing-page/leaves.svg') center repeat;
  opacity: 0.08;
  // filter: brightness(1.4) saturate(0.2);
  will-change: transform;

  @media (prefers-color-scheme: dark) {
    filter: brightness(0.4) saturate(0.5);
  }
}

/* --- Generic Content Wrapper --- */
.content-layer {
  position: relative;
  z-index: 3;
  margin: 0 auto;
  @extend %flex-col-center;
  gap: size('2xl');
  width: 100%;
}

/* --- Gradient Section with Shallower Curves --- */
.gradient-section {
  padding-block: size('2xl');
 
  background: radial-gradient(
    circle at top center,
    var(--brute-primary) 10%,
    var(--brute-secondary) 60%,
    var(--brute-tertiary) 100%
  );
  overflow: visible; /* Changed from hidden to visible to allow sticky positioning to work */
$curve-radius: 5%;
  /* Top curve (shallower) */
  border-top-left-radius:  100% $curve-radius;
  border-top-right-radius: 100% $curve-radius;

  /* Bottom curve (shallower) */
  border-bottom-left-radius:  100% $curve-radius;
  border-bottom-right-radius: 100% $curve-radius;

  .content-layer {
    position: relative;
    z-index: 3;
  }
}
</style>
