<script lang="ts">
  import ServiceCard from '$lib/components/layout/new-components/ServiceCard.svelte';

  interface Service {
    title: string;
    description: string;
    icon?: string;
  }
  const injectableStaticText = $state<{
    label: string;
    heading: string;
    body: string;
  }>({
    label: 'EXPLORE WHAT WE OFFER',
    heading: 'Discover Our Range of Services',
    body: 'We offer a range of services designed to help you cut costs, lower energy consumption, and promote environmental sustainability.',
  });

  const steps = $state<StepperStep[]>([
    {
      id: 1,
      icon: '/assets/new-icons/lightning.svg', // Icon associated with this step
      iconAlt: 'Energy audit icon',
      title: 'Free Energy Audits',
      description:
        'Quickly find and fix energy waste in your home or business. Expert audits for fast savings.', // Main point: fast, expert audits for savings
      image: '/assets/landing-page/stepper/card-01.jpeg',
      imageAlt: 'Technician performing an energy audit with equipment.', // More descriptive alt text
    },
    {
      id: 2,
      icon: '/assets/new-icons/light-bulb.svg',
      iconAlt: 'Cost savings icon',
      title: 'Tailored Consulting',
      description:
        'Custom eco-strategies to save energy and resources. Achieve your sustainability goals faster.', // Main point: custom strategies for faster sustainability
      image: '/assets/lights.webp',
      imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.', // More descriptive alt text
    },
    {
      id: 3,
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
    <header class="services__header u_container__sm u_gap__xl">
      <small class="brute__label services__label"
        >{injectableStaticText.label}</small
      >
      <h2 class="u_display-2--bold typography--secondary u_m-bottom__md">
        {injectableStaticText.heading}
      </h2>
      <p class="u_m-block__lg u_paragraph typography--tertiary">
        {injectableStaticText.body}
      </p>
      <div class="services__card-container">
        {#each steps as step (step.id)}
          {@const serviceData = {
            title: step.title,
            description: step.description,
            icon: step.icon,
            graphic: step.image,
            link: '#'
          }}
          <ServiceCard service={serviceData} />
        {/each}
      </div>
    </header>
  </div>
</section>

<style lang="scss">
  .services {
    &__container {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas: 'header' 'card';
      place-items: center;
      @include respond-to('tablet-end') {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 'header card';
      }
    }
    &__header {
      grid-area: header;
    }
  }
</style>
