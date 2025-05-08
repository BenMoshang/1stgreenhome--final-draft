<script lang="ts">
  import { textAnimate } from '$lib/actions/textAnimate.svelte';
  import { wipeDown } from '$lib/actions/wipeDown.svelte';
  // Define interfaces for type safety
  interface HeaderData {
    label: string;
    title: string;
  }

  interface FaqTab {
    question: string;
    homeAnswer: string;
    businessAnswer: string;
    id?: string; // Optional: Can be used for keying if needed, otherwise index works
  }

  // Component State using $state
  let header = $state<HeaderData>({
    label: "WE'VE GOT YOU COVERED",
    title: 'Frequently Asked Questions',
  });

  let tabs = $state<FaqTab[]>([
    {
      question: `What services does 1st Green Home offer?`,
      homeAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Home Owners:</strong><br> 1st Green Home offers a variety of energy efficiency solutions tailored for homeowners. Our services include energy audits, insulation upgrades, HVAC optimization, and LED lighting retrofits, all designed to lower your utility bills and improve home comfort.`,
      businessAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Business Owners:</strong><br> For businesses, 1st Green Home provides comprehensive energy efficiency solutions that reduce operational costs and improve sustainability. Our services range from energy audits to upgrading HVAC systems, LED lighting, and project management for large-scale energy improvement initiatives.`,
    },
    {
      question: `How can energy efficiency upgrades benefit me?`,
      homeAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Home Owners:</strong><br> Energy efficiency upgrades enhance the comfort and safety of your home. By making improvements such as upgrading insulation and installing energy-efficient lighting, you can reduce energy consumption, lower utility bills, and increase your home’s value.`,
      businessAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Business Owners:</strong><br> Energy efficiency upgrades help businesses cut operational costs and improve their environmental impact. From optimizing your energy usage to implementing smart solutions, you’ll see a reduction in energy expenses and demonstrate a commitment to sustainability, which resonates with customers and clients.`,
    },
    {
      question: `What is an ENERGY STAR® certified upgrade?`,
      homeAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Home Owners:</strong><br> ENERGY STAR® certified upgrades ensure that your home improvements meet high energy efficiency standards. Whether it’s new windows, heating systems, or lighting, these upgrades guarantee better energy savings and comfort for your family.`,
      businessAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Business Owners:</strong><br> ENERGY STAR® certified upgrades for businesses are a smart way to increase efficiency and lower energy use. Certified equipment like HVAC systems, appliances, and lighting offer superior energy performance and help reduce your operational costs over time.`,
    },
    {
      question: `How long does an energy audit take?`,
      homeAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Home Owners:</strong><br> A typical home energy audit takes around 2-4 hours. During the audit, our certified professionals will inspect your home’s insulation, windows, HVAC systems, and more to identify areas for improvement and provide you with a detailed report.`,
      businessAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Business Owners:</strong><br> For businesses, a commercial energy audit varies in duration depending on the size and complexity of your facility. On average, an audit may take a day or more, as we assess your lighting, HVAC, building envelope, and overall energy use. A comprehensive report is provided afterward to guide your efficiency upgrades.`,
    },
    {
      question: `How much can I save with energy efficiency upgrades?`,
      homeAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Home Owners:</strong><br> The savings from energy efficiency upgrades depend on the scope of the improvements. Homeowners who implement upgrades like insulation, smart thermostats, and LED lighting can expect to see a reduction of up to 30% on their energy bills.`,
      businessAnswer: `<strong class="faq__answer-text u_subheading--bold typography--secondary-rev u_m-bottom__sm">Business Owners:</strong><br> Businesses can experience significant cost savings by implementing energy efficiency measures, typically reducing energy costs by 20-40%. These savings can have a direct impact on operational costs and long-term financial sustainability.`,
    },
  ]);

  let tabsWithIds = $derived(
    tabs.map((tab, i) => ({ ...tab, id: `faq-tab-${i}` }))
  );
</script>

<section id="faqs" class="faq u_p-inline__md u_p-block__xl" itemscope itemtype="https://schema.org/FAQPage">
  <div class="faq__container u_container__sm ">
    <header class="faq__header u_m-bottom__xl">
      {#if header.label}
        <small 
        use:textAnimate
        class="faq__label brute__label-rev">{header.label}</small>
      {/if}
      {#if header.title}
        <h2 
        use:wipeDown
        class="faq__title u_display-2--bold typography--primary-rev">
          {header.title}
        </h2>
      {/if}
    </header>

    <dl class="faq__list">
      {#each tabsWithIds as tab, index (tab.id)}
        <div
          class="faq__entry"
          itemprop="mainEntity"
          itemscope
          itemtype="https://schema.org/Question"
        >
          <!-- toggle -->
          <input
            type="checkbox"
            id={tab.id}
            class="faq__toggle"
            checked={index === 0}
          />

          <!-- question row -->
          <dt>
            <label class="faq__question" for={tab.id}>
              <span
                class="faq__question-text u_heading typography--secondary-rev"
                itemprop="name"
              >
                {tab.question}
              </span>
              <span class="faq__chevron u_heading typography--secondary-rev">
                &#x2304;
              </span>
            </label>
          </dt>

          <!-- answer panel -->
          <dd
            class="faq__panel"
            role="region"
            aria-labelledby={tab.id}
            itemprop="acceptedAnswer"
            itemscope
            itemtype="https://schema.org/Answer"
          >
            <div class="faq__answer-group" itemprop="text">
              <div class="faq__answer">
                <img
                  src="/assets/faqs/faq-icon--home.svg"
                  alt="FAQ Icon"
                  class="faq__answer-icon"
                />
                <p
                  class="faq__answer-text u_paragraph typography--tertiary-rev"
                >
                  {@html tab.homeAnswer}
                </p>
              </div>

              <hr class="faq__divider" aria-hidden="true" />

              <div class="faq__answer">
                <img
                  src="/assets/faqs/faq-icon--buisness.svg"
                  alt="FAQ Icon"
                  class="faq__answer-icon"
                />
                <p
                  class="faq__answer-text u_paragraph typography--tertiary-rev"
                >
                  {@html tab.businessAnswer}
                </p>
              </div>
            </div>
          </dd>
        </div>
      {/each}
    </dl>
  </div>
</section>

<style lang="scss">
  // ===========================================================
  // Component: faq
  // ===========================================================
  .faq {
    inline-size: 100%;

    &__container {
      @extend %flex-col-center;

      & > *{
        flex:1;
      }
      @include respond-to('tablet-end') {
        flex-direction: row;
        justify-content: space-evenly;

        & .faq__header {
          position: sticky;
          top: size('2xl');
max-inline-size: 40ch;
          align-self: flex-start;
          text-align: right;
          order: 2;
        }
        & .faq__label{
          margin-left: auto;
        }
    
      }
    }

    &__header {
      @extend %flex-col-center;
      text-align: center;
    }
&__label{
  margin-inline: auto;
}
    &__list {
      @extend %flex-col-center;
      inline-size: 100%;
      gap: size('lg');
      overflow: visible; /* Changed from clip to visible to allow sticky elements to work */
      @include respond-to('tablet-end') {
        align-items: unset;
        justify-content: unset;
      }
    }

    &__entry {
      display: flex;
      flex-direction: column;
      position: relative;
      inline-size: 100%;
      max-inline-size: 70ch;
      border-radius: $border-radius;

      &:nth-child(even) {
        background-color: oklch(39.3% 0.095 152.535 / 0.85);
      }
    }

    &__toggle {
      position: absolute;
      inset: 0;
      margin: auto;
      opacity: 0;

      &:checked + dt .faq__chevron {
        transform: rotate(180deg);
        margin-top: unset;
        margin-bottom: -0.7em;
      }
      &:checked ~ .faq__panel {
        max-height: fit-content;
        padding: size('md') size('lg');
        border-radius: $border-radius;
        background-color: oklch(39.3% 0.095 152.535 / 0.85);
      }
    }

    &__question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      inline-size: 100%;
      cursor: pointer;
      padding: size('sm') size('md');
      border-radius: $border-radius;

      & > * {
        display: block;
      }
    }

    &__chevron {
      margin-top: -0.7em;
      font-weight: 900;
      flex-shrink: 0;
      transition: transform 0.2s ease-in-out;
    }

    &__panel {
      max-height: 0;
      overflow: hidden;
      @extend %inset-shadow;
      transition:
        max-height 0.2s ease-in-out,
        padding 0.2s ease-in-out;
    }

    &__answer-group {
      display: flex;
      flex-direction: column;
      gap: size('md');
    }

    &__answer {
      display: flex;
      align-items: flex-start;
      gap: size('md');

      &-icon {
        $size: size('lg');
        object-fit: contain;
        width: $size;
        height: $size;
      }
    }

    &__divider {
      block-size: 0.0625rem;
      inline-size: 100%;
      margin-block: 0;
      background: var(--brute-secondary);
      opacity: 0.5;
      border: none;
    }
  }
</style>
