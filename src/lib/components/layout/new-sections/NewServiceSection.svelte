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
      image: '/assets/landing-page/news/lights.webp',
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

<section id="services" class="services u_p-inline__md u_p-block__xl">
  <div class="services__container u_container__sm u_gap__xl">
    <header class="services__header">
      <small class="services__header-label brute__label-rev"
        >{injectableStaticText.label}</small
      >
      <h2
        class=" services__header-heading u_display-2--bold typography--primary-rev"
      >
        {injectableStaticText.heading}
      </h2>
      <p class="services__header-body u_paragraph typography--secondary-rev">
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
    block-size: fit-content;
    margin-inline: auto;
    &__container {
      inline-size: 100%;
      display: grid;
      place-content: center;
      place-items: center;
      grid-template-columns: 1fr;

      grid-template-areas: 'content' 'cards';

      @include respond-to('tablet-end') {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 'cards content';
      }
    }
    &__header {
      grid-area: content;
      position: sticky;
      top: size('2xl');
      place-self: center;
      display: flex;
      flex-direction: column;
      inline-size: fit-content;
      margin-inline: auto;
      margin-bottom: size('xl');
      &-label {
        text-wrap: nowrap;
        place-self: start;
      }
      @include respond-to('mobile-end') {
        position: unset;
        text-align: center;
        & .services__header-label {
          justify-self: center;
          align-self: center;
        }
      }
      @include respond-to('tablet-end') {
        position: sticky;
        place-self: start;
        text-align: right;
        & .services__header-label {
          justify-self: end;
          align-self: end;
        }
      }

      &-heading {
        max-inline-size: 20ch;
        margin-block-end: var(--margin-sm);
      }
      &-body {
        max-inline-size: 45ch;
      }
    }
    &__cards {
      place-items: center;
      inline-size: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
      gap: size('xl');

      @include respond-to('tablet-end') {
        place-items: start;
      }
    }
  }
</style>
