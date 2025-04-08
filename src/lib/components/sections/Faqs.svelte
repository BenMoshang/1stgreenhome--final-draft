<script lang="ts">
	// Import dependencies
	import { fadeInUpTransition } from '$lib/utils/animations.js';

	// Header data using Svelte 5 Runes
	const header = $state({
		label: "WE'VE GOT YOU COVERED",
		title: 'Frequently Asked Questions'
	});

	// FAQ tabs data using Svelte 5 Runes
	const tabs = $state([
		{
			question: `What services does 1st Green Home offer?`,
			homeAnswer: `<strong>Home Owners:</strong> 1st Green Home offers a variety of energy efficiency solutions tailored for homeowners. Our services include energy audits, insulation upgrades, HVAC optimization, and LED lighting retrofits, all designed to lower your utility bills and improve home comfort.`,
			businessAnswer: `<strong>Business Owners:</strong> For businesses, 1st Green Home provides comprehensive energy efficiency solutions that reduce operational costs and improve sustainability. Our services range from energy audits to upgrading HVAC systems, LED lighting, and project management for large-scale energy improvement initiatives.`
		},
		{
			question: `How can energy efficiency upgrades benefit me?`,
			homeAnswer: `<strong>Home Owners:</strong> Energy efficiency upgrades enhance the comfort and safety of your home. By making improvements such as upgrading insulation and installing energy-efficient lighting, you can reduce energy consumption, lower utility bills, and increase your home's value.`,
			businessAnswer: `<strong>Business Owners:</strong> Energy efficiency upgrades help businesses cut operational costs and improve their environmental impact. From optimizing your energy usage to implementing smart solutions, you'll see a reduction in energy expenses and demonstrate a commitment to sustainability, which resonates with customers and clients.`
		},
		{
			question: `What is an ENERGY STAR® certified upgrade?`,
			homeAnswer: `<strong>Home Owners:</strong> ENERGY STAR® certified upgrades ensure that your home improvements meet high energy efficiency standards. Whether it's new windows, heating systems, or lighting, these upgrades guarantee better energy savings and comfort for your family.`,
			businessAnswer: `<strong>Business Owners:</strong> ENERGY STAR® certified upgrades for businesses are a smart way to increase efficiency and lower energy use. Certified equipment like HVAC systems, appliances, and lighting offer superior energy performance and help reduce your operational costs over time.`
		},
		{
			question: `How long does an energy audit take?`,
			homeAnswer: `<strong>Home Owners:</strong> A typical home energy audit takes around 2-4 hours. During the audit, our certified professionals will inspect your home's insulation, windows, HVAC systems, and more to identify areas for improvement and provide you with a detailed report.`,
			businessAnswer: `<strong>Business Owners:</strong> For businesses, a commercial energy audit varies in duration depending on the size and complexity of your facility. On average, an audit may take a day or more, as we assess your lighting, HVAC, building envelope, and overall energy use. A comprehensive report is provided afterward to guide your efficiency upgrades.`
		},
		{
			question: `How much can I save with energy efficiency upgrades?`,
			homeAnswer: `<strong>Home Owners:</strong> The savings from energy efficiency upgrades depend on the scope of the improvements. Homeowners who implement upgrades like insulation, smart thermostats, and LED lighting can expect to see a reduction of up to 30% on their energy bills.`,
			businessAnswer: `<strong>Business Owners:</strong> Businesses can experience significant cost savings by implementing energy efficiency measures, typically reducing energy costs by 20-40%. These savings can have a direct impact on operational costs and long-term financial sustainability.`
		}
	]);

	// Track the active tab
	let activeTab = $state(-1); // -1 means no tab is active

	// Toggle active tab
	function toggleTab(index: number) {
		activeTab = activeTab === index ? -1 : index;
	}

	// Animation delays
	const animationDelays = {
		label: 0,
		title: 200,
		tabs: 400,
		bounce: 15 // Keep bounce value from the Angular component
	};
</script>

<section id="faqs" class="faqs-section">
	<header class="faqs-section__header">
		<p
			class="faqs-section__label"
			in:fadeInUpTransition={{ delay: animationDelays.label, bounce: animationDelays.bounce }}
		>
			{header.label}
		</p>
		<h2
			class="faqs-section__title"
			in:fadeInUpTransition={{ delay: animationDelays.title, bounce: animationDelays.bounce }}
		>
			{header.title}
		</h2>
	</header>

	<div
		class="faqs-section__container"
		in:fadeInUpTransition={{ delay: animationDelays.tabs, bounce: animationDelays.bounce }}
	>
		{#each tabs as tab, i}
			<div class="faqs-section__tab" class:active={activeTab === i}>
				<button
					class="tab__label"
					on:click={() => toggleTab(i)}
					aria-expanded={activeTab === i ? 'true' : 'false'}
					aria-controls={`tab-content-${i}`}
				>
					<h5>{tab.question}</h5>
					<img
						class="tab__arrow"
						class:rotated={activeTab === i}
						src="/assets/icons/chevron_arrow.svg"
						alt="Expand/collapse"
						width="28"
						height="28"
					/>
				</button>

				<div id={`tab-content-${i}`} class="tab__content" class:active={activeTab === i}>
					<div class="content__section">
						<img src="/assets/icons/faqs-home-icon.svg" alt="Home icon" width="28" height="28" />
						<p>{@html tab.homeAnswer}</p>
					</div>
					<hr />
					<div class="content__section">
						<img
							src="/assets/icons/faqs-business-icon.svg"
							alt="Business icon"
							width="28"
							height="28"
						/>
						<p>{@html tab.businessAnswer}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		will-change: transform, opacity;
		z-index: 3;
		transition: all 0.3s ease-in-out;
	}

	.faqs-section {
		width: 100%;
		height: 100%;
		margin-inline: auto;
		max-width: 90rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: var(--padding-section);
		gap: 1.25rem;
	}

	/* Header Styles */
	.faqs-section__header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.9375rem;
		text-align: center;
		margin-bottom: 1rem;

		.faqs-section__label {
			@extend %text-label--secondary;
			margin-bottom: 1rem;
			max-width: 50ch;
		}

		.faqs-section__title {
			@extend %h2;
			color: $light-1;
			max-width: var(--max-width-title);
		}
	}

	/* Container Styles */
	.faqs-section__container {
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		overflow: hidden;
		max-width: 90rem;
		align-items: center;
		width: 100%;
	}

	/* Tab Styles */
	.faqs-section__tab {
		width: 100%;
		max-width: 50rem;
		border-radius: 1.5rem;
		background-color: var(--convex-dark);
		transition: background-color 0.3s ease-in-out;

		&:hover,
		&.active {
			background-color: var(--color-light);

			h5 {
				color: var(--color-dark);
			}

			.tab__arrow {
				filter: invert(0);
			}
		}
	}

	/* Tab Label Styles */
	.tab__label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		cursor: pointer;
		padding: 1.5rem;
		background: none;
		border: none;

		h5 {
			@extend %h5;
			color: var(--color-light);
			transition: color 0.3s ease-in-out;
		}

		.tab__arrow {
			filter: invert(1);
			transition:
				transform 0.3s ease-in-out,
				filter 0.3s ease-in-out;

			&.rotated {
				transform: rotate(180deg);
				filter: invert(0);
			}
		}
	}

	/* Tab Content Styles */
	.tab__content {
		max-height: 0;
		overflow: hidden;
		transition:
			max-height 0.3s ease-in-out,
			padding 0.3s ease-in-out;

		&.active {
			padding: 0 1.5rem 1.5rem 1.5rem;
			max-height: 50rem;
		}

		.content__section {
			display: flex;
			gap: 1rem;

			img {
				height: 2rem;
				width: 2rem;
				background: var(--convex-light);
				border-radius: 4rem;
				border: 1px solid var(--color-secondary);
				box-shadow: var(--shadow-medium--light);
			}

			p {
				@extend %p;
				font-size: 1.1875rem;
			}
		}
	}

	hr {
		height: 0.0625rem;
		background-color: var(--color-accent);
		border: none;
		width: 100%;
		margin-block: 1rem;
		opacity: 0.5;
	}

	/* Media Queries */
	@media (max-width: 50.625rem) {
		.content__section {
			flex-direction: column;
			gap: 0.5rem !important;

			img {
				width: 2rem !important;
				height: 2rem !important;
			}
		}
	}

	/* Reduced Motion Preferences */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}
</style>
