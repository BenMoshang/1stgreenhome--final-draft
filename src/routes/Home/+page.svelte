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
  <div class="leaves-background" use:parallax={{ offset: 100 }}></div>

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
