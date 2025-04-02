<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	// State using Svelte 5 runes
	let { isOpen } = $props();
	let emailLink = $state('');

	const dispatch = createEventDispatcher();

	// Lifecycle
	onMount(() => {
		emailLink = 'info@1stgreenhome.com';
	});

	function handleClose() {
		dispatch('close');
	}
</script>

<!-- Sidebar container -->
{#if isOpen}
	<section class="container">
		<div class="overlay" on:click={handleClose}></div>
		<nav class="nav-content">
			<button class="close-button" on:click={handleClose} aria-label="Close sidebar">
				<span></span>
				<span></span>
			</button>
			<button
				class="button"
				on:click={() => (window.location.href = '/home#services')}
				tabindex="0"
			>
				<img loading="lazy" src="/assets/landing-page/lightbulb-solid.svg" alt="Services" />Services
			</button>
			<button
				class="button"
				on:click={() => (window.location.href = '/home#projects')}
				tabindex="0"
			>
				<img
					loading="lazy"
					src="/assets/landing-page/address-card-solid.svg"
					alt="Projects"
				/>Projects
			</button>
			<button class="button" on:click={() => (window.location.href = '/home#faqs')} tabindex="0">
				<img loading="lazy" src="/assets/landing-page/question-solid.svg" alt="FAQs" />Faqs
			</button>
			<button class="button" on:click={() => (window.location.href = '/home#cta')} tabindex="0">
				<img loading="lazy" src="/assets/landing-page/phone-solid.svg" alt="Contact" />Contact
			</button>
			<a class="action-button" href={emailLink} target="_blank" tabindex="0" role="button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					class="icon"
				>
					<g
						fill="none"
						stroke="white"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<path
							stroke-dasharray="64"
							stroke-dashoffset="64"
							d="M8 3C8.5 3 10.5 7.5 10.5 8C10.5 9 9 10 8.5 11C8 12 9 13 10 14C10.3943 14.3943 12 16 13 15.5C14 15 15 13.5 16 13.5C16.5 13.5 21 15.5 21 16C21 18 19.5 19.5 18 20C16.5 20.5 15.5 20.5 13.5 20C11.5 19.5 10 19 7.5 16.5C5 14 4.5 12.5 4 10.5C3.5 8.5 3.5 7.5 4 6C4.5 4.5 6 3 8 3Z"
						>
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
							<animateTransform
								attributeName="transform"
								begin="0.6s;lineMdPhoneCallLoop0.begin+2.6s"
								dur="0.5s"
								type="rotate"
								values="0 12 12;15 12 12;0 12 12;-12 12 12;0 12 12;12 12 12;0 12 12;-15 12 12;0 12 12"
							/>
						</path>
						<path
							stroke-dasharray="4"
							stroke-dashoffset="4"
							d="M14 7.04404C14.6608 7.34734 15.2571 7.76718 15.7624 8.27723M16.956 10C16.6606 9.35636 16.2546 8.77401 15.7624 8.27723"
							opacity="0"
						>
							<set
								id="lineMdPhoneCallLoop0"
								attributeName="opacity"
								begin="0.7s;lineMdPhoneCallLoop0.begin+2.7s"
								to="1"
							/>
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="0.7s;lineMdPhoneCallLoop0.begin+2.7s"
								dur="0.2s"
								values="4;8"
							/>
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="1.3s;lineMdPhoneCallLoop0.begin+3.3s"
								dur="0.3s"
								values="0;4"
							/>
							<set attributeName="opacity" begin="1.6s;lineMdPhoneCallLoop0.begin+3.6s" to="0" />
						</path>
						<path
							stroke-dasharray="10"
							stroke-dashoffset="10"
							d="M20.748 9C20.3874 7.59926 19.6571 6.347 18.6672 5.3535M15 3.25203C16.4105 3.61507 17.6704 4.3531 18.6672 5.3535"
							opacity="0"
						>
							<set attributeName="opacity" begin="1s;lineMdPhoneCallLoop0.begin+3s" to="1" />
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="1s;lineMdPhoneCallLoop0.begin+3s"
								dur="0.2s"
								values="10;20"
							/>
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="1.5s;lineMdPhoneCallLoop0.begin+3.5s"
								dur="0.3s"
								values="0;10"
							/>
							<set attributeName="opacity" begin="1.8s;lineMdPhoneCallLoop0.begin+3.8s" to="0" />
						</path>
					</g>
				</svg>
				Schedule a call
			</a>
		</nav>
	</section>
{/if}

<style>
	/* CSS styles converted from the Angular component */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		transition: all 0.3s ease;
	}

	/* Variables */
	:global(:root) {
		--fade-in-duration: 0.5s;
		--transition-duration: 0.3s;
		--rounded-border-radius: 62.4375rem;
		--button-hover-scale: 1.05;
		--button-active-scale: 0.95;
		--small-box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
		--hover-box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.15);
	}

	/* Sidebar container */
	.container {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
	}

	/* Overlay for closing the sidebar when clicking outside */
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(0.313rem);
		-webkit-backdrop-filter: blur(0.313rem);
	}

	/* Navigation content */
	.nav-content {
		position: absolute;
		top: 0;
		left: 0;
		backdrop-filter: blur(0.625rem) saturate(200%);
		-webkit-backdrop-filter: blur(0.625rem) saturate(200%);
		background-color: rgba(255, 255, 255, 0.9);
		animation: open var(--transition-duration) ease forwards;
		z-index: 1000;
		max-width: 16.875rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 5rem;
		padding-right: 0.625rem;
		padding-left: 0.625rem;
		gap: 1.5rem;
		box-shadow: 0.25rem 0 1rem rgba(0, 0, 0, 0.1);
	}

	/* Close button inside sidebar */
	.close-button {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		width: 2rem;
		height: 2rem;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.close-button span {
		position: absolute;
		width: 1.5rem;
		height: 0.125rem;
		background-color: var(--color-primary);
		border-radius: 0.0625rem;
	}

	.close-button span:first-child {
		transform: rotate(45deg);
	}

	.close-button span:last-child {
		transform: rotate(-45deg);
	}

	/* Button Styles */
	.action-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--convex-secondary);
		border: 0.0625rem solid var(--color-accent);
		border-radius: var(--rounded-border-radius);
		box-shadow:
			var(--small-box-shadow),
			inset 0 0.0625rem 0 rgba(255, 255, 255, 0.5);
		color: var(--color-light);
		font-family: var(--font-family-regular);
		font-size: 1.25rem;
		padding: 0.5rem 1.5rem;
		text-wrap: nowrap;
		text-decoration: none;
		transition:
			transform 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out,
			filter 0.2s ease-in-out;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.action-button:is(:focus, :hover) {
		filter: brightness(1.1);
		transform: scale(var(--button-hover-scale));
		box-shadow: var(--hover-box-shadow);
	}

	.action-button:active {
		transform: scale(var(--button-active-scale));
	}

	.action-button .icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* General button styles */
	.button {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 1rem;
		font-family: var(--font-family-regular);
		background: none;
		border: none;
		color: var(--color-dark);
		font-size: 1.25rem;
		text-align: left;
		padding: 0.75rem 1rem;
		cursor: pointer;
		border-radius: 1rem;
		transition:
			background 0.3s,
			transform 0.1s ease;
		white-space: nowrap;
	}

	/* Hover and active states for nav buttons */
	.button:hover,
	.button:active {
		transform: scale(0.95);
		background: var(--convex-light);
		box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
	}

	/* Keyframes for opening animation */
	@keyframes open {
		from {
			width: 0;
			opacity: 0;
		}
		to {
			width: 16.875rem;
			opacity: 1;
		}
	}

	/* Media queries for responsiveness */
	@media (min-width: 50.625rem) {
		.nav-content {
			border-radius: 0 1rem 1rem 0;
		}
	}
</style>
