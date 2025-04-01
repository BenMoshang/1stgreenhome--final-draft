<script lang="ts">
	import { animate, spring, inView } from '@motionone/dom';
	import { onMount } from 'svelte';

	let buttonElement: HTMLButtonElement;
	let cardElement: HTMLDivElement;

	onMount(() => {
		// Animate the card when it comes into view
		inView(cardElement, ({ target }) => {
			animate(
				target,
				{
					opacity: [0, 1],
					y: [50, 0],
					scale: [0.95, 1]
				},
				{
					duration: 1,
					easing: spring({ damping: 15, stiffness: 100 })
				}
			);
		});
	});

	function handleButtonClick() {
		animate(
			buttonElement,
			{
				scale: [1, 1.2, 1],
				rotate: [0, 10, -10, 0]
			},
			{
				duration: 0.5,
				easing: spring({ damping: 10, stiffness: 200 })
			}
		);
	}
</script>

<div class="container">
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<div class="demo-section">
		<button bind:this={buttonElement} on:click={handleButtonClick} class="animated-button">
			Click me!
		</button>

		<div bind:this={cardElement} class="animated-card">
			<h2>Animated Card</h2>
			<p>This card animates when it comes into view!</p>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	.demo-section {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}

	.animated-button {
		padding: 0.8rem 1.5rem;
		font-size: 1.1rem;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.3s ease;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}

	.animated-button:hover {
		background-color: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.animated-card {
		background-color: rgba(245, 245, 245, 0.9);
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
		text-align: center;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: transform 0.3s ease;
	}

	.animated-card:hover {
		transform: translateY(-5px);
	}

	.animated-card h2 {
		margin-top: 0;
		color: #333;
		font-size: clamp(1.5rem, 5vw, 2rem);
	}

	/* Modern CSS features that will be processed by PostCSS */
	@supports (display: grid) {
		.container {
			display: grid;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.animated-button,
		.animated-card {
			transition: none;
		}
	}
</style>
