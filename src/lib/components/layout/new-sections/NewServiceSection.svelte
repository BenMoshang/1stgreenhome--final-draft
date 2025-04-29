<script lang="ts">
  import ServiceCard from '$lib/components/layout/new-components/ServiceCard.svelte';
  const injectableStaticText = $state<{
    label: string;
    heading: string;
    body: string;
  }>({
    label: 'EXPLORE WHAT WE OFFER',
    heading: 'Discover Our Range of Services',
    body: 'We offer a range of services designed to help you cut costs, lower energy consumption, and promote environmental sustainability.',
  });

  const steps = $state<Service[]>([
    {
      tag: '1',
      icon: '/assets/new-icons/lightning.svg', // Icon associated with this step
      iconAlt: 'Energy audit icon',
      title: 'Free Energy Audits',
      description:
        'Quickly find and fix energy waste in your home or business. Expert audits for fast savings.', // Main point: fast, expert audits for savings
      image: '/assets/landing-page/stepper/card-01.jpeg',
      imageAlt: 'Technician performing an energy audit with equipment.', // More descriptive alt text
    },
    {
      tag: '2',
      icon: '/assets/new-icons/light-bulb.svg',
      iconAlt: 'Cost savings icon',
      title: 'Tailored Consulting',
      description:
        'Custom eco-strategies to save energy and resources. Achieve your sustainability goals faster.', // Main point: custom strategies for faster sustainability
      image: '/assets/lights.webp',
      imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.', // More descriptive alt text
    },
    {
      tag: '3',
      icon: '/assets/new-icons/briefcase.svg',
      iconAlt: 'Project management icon',
      title: 'End-to-End Management',
      description:
        'We handle your energy projects from start to finish. Smooth, timely, and cost-effective upgrades.', // Main point: complete, smooth, cost-effective project management
      image: '/assets/landing-page/stepper/card-03.jpeg',
      imageAlt: 'Team collaborating on an energy project plan.', // More descriptive alt text
    },
  ]);
</script>

<section id="services" class="services u_p-inline__md u_p-block__lg">
  <div class="services__container u_container__sm u_gap__xl">
    <header class="services__header">
      <small class="services__header-label brute__label-rev"
        >{injectableStaticText.label}</small
      >
      <h2
        class="max-ch-20 services__header-heading u_display-2--bold typography--primary-rev"
      >
        {injectableStaticText.heading}
      </h2>
      <p
        class="services__header-body max-ch-45 u_paragraph typography--primary-rev"
      >
        {injectableStaticText.body}
      </p>
    </header>

    <div class="services__cards">
      {#each steps as step (step.tag)}
        <ServiceCard service={step} />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .services {
    inline-size: 100%;
    &__container {
      inline-size: 100%;
      display: grid;
      grid-template-columns: 1fr;

      grid-template-areas: 'content' 'image';

      @include respond-to('tablet-end') {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 'content image';
      }
    }
    &__header {
      inline-size: 100%;
      display: flex;
      flex-direction: column;
      grid-area: content;

      &-label {
        text-wrap: nowrap;
      }
      &-heading {
        margin-block-end: var(--margin-md);
      }
      &-body {
        align-self: flex-start;
      }
    }
    &__cards {
      inline-size: 100%;
      display: grid;
      gap: var(--gap-xl);
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      @include respond-to('tablet-end') {
        gap: var(--gap-lg);
      }
    }
  }
</style>
