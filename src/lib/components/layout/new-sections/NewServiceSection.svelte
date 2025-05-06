<script lang="ts">
	import { textAnimate } from '$lib/actions/textAnimate.svelte';
	import { wipeDown } from '$lib/actions/wipeDown.svelte';
	import ServiceCard from '$lib/components/layout/new-components/ServiceCard.svelte';

  // Define the Service interface to fix the TypeScript error
  interface Service {
    tag: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
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

  const steps: Service[] = [
    {
      tag: '1',
      title: 'Offered Energy Audits',
      description:
        'Quickly find and fix energy waste in your home or business. Expert audits for fast savings.', // Main point: fast, expert audits for savings
      image: '/assets/landing-page/stepper/card-01.jpeg',
      imageAlt: 'Technician performing an energy audit with equipment.', // More descriptive alt text
    },
    {
      tag: '2',
      title: 'Tailored Consulting',
      description:
        'Custom eco-strategies to save energy and resources. Achieve your sustainability goals faster.', // Main point: custom strategies for faster sustainability
      image: '/assets/landing-page/news/lights.webp',
      imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.', // More descriptive alt text
    },
    {
      tag: '3',
      title: 'Solar Program',
      description:
        'Custom eco-strategies to save energy and resources. Achieve your sustainability goals faster.', // Main point: custom strategies for faster sustainability
      image: '/assets/landing-page/stepper/solar-program.webp',
      imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.', // More descriptive alt text
    },
    {
      tag: '4',
      title: 'End-to-End Management',
      description:
        'We handle your energy projects from start to finish. Smooth, timely, and cost-effective upgrades.', // Main point: complete, smooth, cost-effective project management
      image: '/assets/landing-page/stepper/card-03.jpeg',
      imageAlt: 'Team collaborating on an energy project plan.', // More descriptive alt text
    },
  ];
</script>

<section id="services" class="services u_p-inline__md u_p-block__xl">
  <div class="services__container u_container__sm  u_gap__xl">
    <header class="services__header">
      <small class="services__header-label brute__label-rev"
        use:textAnimate>{injectableStaticText.label}</small
      >
      <h2
        use:wipeDown
        class=" services__header-heading u_display-2--bold typography--primary-rev"
      >
        {injectableStaticText.heading}
      </h2>
      <p
        use:wipeDown
        class="services__header-body u_paragraph typography--secondary-rev"
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
    block-size: fit-content;
    margin-inline: auto;
    &__container {
      inline-size: 100%;
      display: grid;
      place-content: center;
      place-items: center;
      grid-template-columns: 1fr;
      overflow: visible; /* Ensure parent container allows sticky positioning */

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
      z-index: 10; /* Add z-index to ensure header stays above other content */
      &-label {
            justify-self: center;
          align-self: center;
        text-wrap: nowrap;
      }
      @include respond-to('mobile-end') {
        position: unset;
     
      }
      @include respond-to('tablet-end') {
        position: sticky;
        place-self: start;
        text-align: right;
        & .services__header-label {
          justify-self: end;
          align-self: end;
        }
        & .services__header-heading {
          text-align: right;
        }
        & .services__header-body {
          text-align: right;
        }
      }

      &-heading {
        text-align: center;
        max-inline-size: 20ch;
        margin-block-end: var(--margin-sm);
      }
      &-body {
        text-align: center;
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
