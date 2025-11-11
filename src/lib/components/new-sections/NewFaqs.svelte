<script lang="ts">
  import { textAnimate } from '$lib/actions/textAnimate.svelte';
  import { wipeDown } from '$lib/actions/wipeDown.svelte';
  import { base } from '$app/paths';
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
                  src={base + '/assets/faqs/faq-icon--home.svg'}
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
                  src={base + '/assets/faqs/faq-icon--buisness.svg'}
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
