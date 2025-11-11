<script lang="ts">
	import { textAnimate } from '$lib/actions/textAnimate.svelte';
	import { textReveal } from '$lib/actions/textReveal.svelte';
	import ServiceCard from '$lib/components/new-components/ServiceCard.svelte';
	import { base } from '$app/paths';

  // Internal service data structure
  interface ServiceData {
    tag: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }

  // ServiceCard expected interface
  interface ServiceCardProps {
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

  const stepsData: ServiceData[] = [
    {
      tag: '1',
      title: 'Offered Energy Audits',
      description:
        'Quickly find and fix energy waste in your home or business. Expert audits for fast savings.',
      image: base + '/assets/landing-page/stepper/card-01.jpeg',
      imageAlt: 'Technician performing an energy audit with equipment.',
    },
    {
      tag: '2',
      title: 'Tailored Consulting',
      description:
        'Custom eco-strategies to save energy and resources. Achieve your sustainability goals faster.',
      image: base + '/assets/landing-page/news/lights.webp',
      imageAlt: 'Close-up of energy-efficient light bulbs illuminating a room.',
    },
    {
      tag: '3',
      title: 'Solar Program',
      description:
        'Harness the power of the sun with our comprehensive solar solutions. Reduce energy costs and environmental impact.',
      image: base + '/assets/landing-page/stepper/solar-program.webp',
      imageAlt: 'Solar panels installed on a rooftop capturing sunlight.',
    },
    {
      tag: '4',
      title: 'End-to-End Management',
      description:
        'We handle your energy projects from start to finish. Smooth, timely, and cost-effective upgrades.',
      image: base + '/assets/landing-page/stepper/card-03.jpeg',
      imageAlt: 'Team collaborating on an energy project plan.',
    },
  ];
</script>

<section id="services" class="services u_p-inline__md u_p-block__xl">
  <div class="services__container u_container__sm u_gap__xl">
    <header class="services__header">
      <small class="services__header-label brute__label-rev"
        use:textAnimate>{injectableStaticText.label}</small
      >
      <h2
        use:textReveal
        class="services__header-heading u_display-2--bold typography--primary-rev"
      >
        {injectableStaticText.heading}
      </h2>
      <p
        use:textReveal
        class="services__header-body u_paragraph typography--secondary-rev"
      >
        {injectableStaticText.body}
      </p>
    </header>

    <div class="services__cards">
      {#each stepsData as stepData (stepData.tag)}
        {@const service: ServiceCardProps = {
          title: stepData.title,
          description: stepData.description,
          image: stepData.image,
          imageAlt: stepData.imageAlt
        }}
        <ServiceCard service={service} />
      {/each}
    </div>
  </div>
</section>
