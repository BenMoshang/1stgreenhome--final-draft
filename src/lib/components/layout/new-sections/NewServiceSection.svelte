<script lang="ts" runes>
  import StickyCard from '../new-components/StickyCard.svelte';

  interface Service {
    title: string;
    description: string;
    icon?: string;
  }

  const services = $state<Service[]>([
    {
      title: 'Energy Audits',
      description:
        'Comprehensive evaluations to identify energy-saving opportunities and reduce costs.',
      icon: '/assets/icons/energy-audit.svg',
    },
    {
      title: 'Solar Installations',
      description:
        'Professional solar panel installation for residential and commercial properties.',
      icon: '/assets/icons/solar-panel.svg',
    },
    {
      title: 'LED Upgrades',
      description:
        'Switch to energy-efficient LED lighting to save energy and improve ambiance.',
      icon: '/assets/icons/led-lighting.svg',
    },
  ]);
</script>

<section id="services" class="u_p-inline__md u_p-block__lg">
  <div class="u_container__lg">
    <h2 class="u_display-2--bold typography--secondary u_m-block__lg">
      Our Services
    </h2>
    <div class="services__layout u_gap__lg">
      <aside class="services__nav">
        {#each services as service}
          <StickyCard {service} />
        {/each}
      </aside>
      <div class="services__details">
        {#each services as service, idx}
          <section id={`service-${idx}`} class="service__detail">
            <h3 class="u_title-b typography--primary u_m-block__sm">
              {service.title}
            </h3>
            <p class="u_paragraph typography--tertiary">
              {service.description}
            </p>
          </section>
        {/each}
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .services__layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--size-lg);

    @include respond-to('tablet-end') {
      grid-template-columns: 1fr 2fr;
    }
  }

  .services__nav {
    position: sticky;
    top: var(--size-lg);
    display: flex;
    flex-direction: column;
    gap: var(--size-md);
  }

  .service__detail {
    scroll-margin-block-start: var(--size-lg);
    margin-block-end: var(--size-xxl);
  }
</style>
