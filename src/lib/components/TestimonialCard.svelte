<script lang="ts">
	// Use Svelte 5 runes syntax for props
	const props = $props();

	// Extract and derive props
	let statement = $derived(props.statement || '');
	let pfp = $derived(props.pfp || '');
	let name = $derived(props.name || '');
	let company = $derived(props.company || '');
</script>

<article class="card">
	<p class="card__message">{@html statement}</p>
	<header class="card__header">
		<img class="card__pfp" src={pfp} alt={`${name} from ${company}`} />
		<h3 class="card__name">{name}</h3>
		<p class="card__company">{@html company}</p>
	</header>
</article>

<style lang="scss">
	/* Card component styling */
	.card {
		/* Layout */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 0 0 auto;
		width: 100%;
		height: 100%;
		padding: 1.25rem;
		max-width: calc(70.5rem / 4); /* Using calc instead of $PAGE_MAX_WIDTH */

		/* Visual */
		background: var(--convex-light);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-medium--light);

		/* Elements */
		&__message {
			@extend %p;
			margin-bottom: spacing(semi-related);
			display: -webkit-box;
			-webkit-line-clamp: 5;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: normal;
		}

		&__header {
			/* Layout */
			display: grid;
			grid-template-areas:
				'pfp name'
				'pfp company';
			grid-template-columns: auto 1fr;
			grid-column-gap: 0.5rem;
			padding: 0.25rem;
		}

		&__pfp {
			grid-area: pfp;
			height: 2.5rem;
			width: 2.5rem;
			border-radius: 50%;
			box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.849);
			object-fit: cover;
		}

		&__name {
			grid-area: name;
			align-self: end;
			@extend %h6;
		}

		&__company {
			@extend %p;
			grid-area: company;
			font-weight: 300;
			font-size: var(--label-p);
			letter-spacing: 0.05em;
			color: var(--color-secondary-900);
		}
	}

	/* Accessibility: Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		.card {
			transition-duration: 0.01ms !important;
		}
	}
</style>
