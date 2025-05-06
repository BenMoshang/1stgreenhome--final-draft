<script lang="ts">
  import { textAnimate } from '$lib/actions/textAnimate.svelte';
  import TestimonialCard from '../new-components/TestimonialCard.svelte';
  
  // Header data
  const header = $state({
    title0: 'Over',
    title1: ' 351k+ ',
    title2: 'homes and businesses empowered by our Renewable Energy Solutions.',
  });

  // Testimonials data
  const testimonials = $state([
    {
      pfp: `/assets/landing-page/testimonial/headshot1.jpg`,
      name: `Jack Amoruso`,
      company: `Lumber and Things`,
      statement: `"I couldn't believe the difference retrofit lighting made in our office! Not only did it brighten up the space, but our energy bills have significantly decreased. The installation was quick and easy too. Highly recommend 1st Green Home to any business!"`,
    },
    {
      pfp: `/assets/landing-page/testimonial/headshot5.jpg`,
      name: `Rick Schmidt`,
      company: `84 Lumber`,
      statement: `"As a business owner, I was hesitant to switch to retrofit lighting at first, but after seeing the results, I'm so glad I did. Not only does it make my store look more modern, but I've noticed a difference in the quality of light. It's much brighter and more energy efficient. 1st Green Home has made the process super easy and explained the program in great detail to put my mind at ease during the whole process."`,
    },
    {
      name: `Lenny Kline`,
      company: `Queen City Flea Market`,
      statement: `"We recently upgraded our warehouse lighting to retrofit LED fixtures through 1st Green Home, and the difference is incredible. Our employees feel safer and more productive with the improved lighting, and we're saving money on our energy bills. It's a win-win!"`,
      pfp: `/assets/landing-page/testimonial/headshot3.jpg`,
    },
    {
      pfp: `/assets/landing-page/testimonial/headshot4.jpg`,
      name: `David Shin`,
      company: `Commercial Laundry`,
      statement: `"I've been using retrofit lighting in my store for a few months now, and I'm amazed at the positive feedback from customers. The ambiance is so much better, and I've noticed a decrease in maintenance costs too. Definitely worth the investment."`,
    },
    {
      pfp: `/assets/landing-page/testimonial/headshot2.jpg`,
      name: `Oddy Okojie`,
      company: `M&amp;M Bedding`,
      statement: `"I was skeptical about retrofitting my outdoor lighting, but after seeing how much brighter and more inviting my business looks at night, I'm thrilled with the decision. Plus, the added security benefits give me peace of mind."`,
    },
  ]);

  // Animation delays config
  const animationDelays = {
    title: 200,
    standout: 0,
    marquee: 1000,
  };

  // Control for marquee pausing
  let isPaused = $state(false);

  function pauseMarquee() {
    isPaused = true;
  }

  function resumeMarquee() {
    isPaused = false;
  }
</script>

<section
  id="testimonials"
  class="testimonials-section u_p-inline__md u_p-block__xl u_container__sm "
>
  <div
    id="testimonials-marquee"
    aria-label="Customer testimonials"
    aria-roledescription="Customer testimonials"
    class="testimonials-section__marquee"
    onmouseenter={pauseMarquee}
    onmouseleave={resumeMarquee}
    onfocusin={pauseMarquee}
    onfocusout={resumeMarquee}
  >
 
    <h2
      class="testimonials-section__title"
    >
     <span use:textAnimate={{ duration: 0.3, delay: 0.04 }}>{header.title0}</span>
      <span
        class="testimonials-section__title-standout"
      >
        {header.title1}
      </span>
      <span use:textAnimate={{ duration: 0.3, delay: 0.04 }}>{header.title2}</span>
    </h2>
    <div
      class="testimonials-section__track"
      class:paused={isPaused}
      role="region"
      aria-label="Customer testimonials"
    >
      {#each testimonials as testimonial, i}
        <TestimonialCard
          pfp={testimonial.pfp}
          name={testimonial.name}
          company={testimonial.company}
          statement={testimonial.statement}
        />
      {/each}
      {#each testimonials as testimonial, i}
        <TestimonialCard
          pfp={testimonial.pfp}
          name={testimonial.name}
          company={testimonial.company}
          statement={testimonial.statement}
          aria-hidden="true"
        />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .testimonials-section {
@extend %flex-col-center;
    block-size: 100%;
    gap: size('xl');
    inline-size: 100%;
    margin-inline: auto;
    overflow-inline: clip;

    &__marquee {
    @extend %flex-col-center;
      --gap: size('xl');

      gap: var(--gap);
      inline-size: 100%;
    }

    &__title {
      @extend %u_title-a;

      color: $text-primary-rev;
      text-align: center;
      margin-bottom: var(--margin-lg);

      &-standout {
        font-weight: 600;
        animation: gradient-loop 5s ease-in-out infinite;
        background: linear-gradient(
          45deg,
          #ffd700,
          #ffc107,
          #ffeb3b,
          #ffc107,
          #ffd700
        );
        background-clip: text;
        background-clip: text;
        background-size: 200% 200%;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }
    }

    &__track {
      display: flex;
      border-radius: var(--border-radius);
      animation: scroll 20s linear infinite;
      gap: size('lg');

      &.paused {
        animation-play-state: paused;
      }
    }
  }

  /* --------------------------------------------------
   Keyframes
   -------------------------------------------------- */
  @keyframes gradient-loop {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-50%);
    }
  }
</style>
