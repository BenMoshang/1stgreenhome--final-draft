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
		flex: 0 0 auto; /* Keep this: essential for marquee */
		height: 100%; /* Use height: auto or manage height carefully if content varies a lot */
		padding: 1.25rem;

		/* --- RESPONSIVE WIDTH --- */
		/* Mobile First: Define a base width that works on small screens */
		width: $PAGE_MAX_WIDTH / 4; /* Example: Adjust based on your design */
		/* Or use viewport units carefully: width: clamp(250px, 80vw, 320px); */
		/* Avoid % width with flex: 0 0 auto in this marquee context */

		/* Visual */
		background: var(--convex-light);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-medium--secondary);

		/* Elements */
		&__message {
			@extend %p;
			margin-bottom: spacing(semi-related);
			display: -webkit-box;
			-webkit-line-clamp: 5; /* Good for controlling height */
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			/* Consider setting a min-height if empty statements are possible */
			min-height: 6em; /* Example: Adjust based on font size and line height */
		}

		&__header {
			/* Layout */
			width: 100%;
			display: grid;
			grid-template-areas:
				'pfp name'
				'pfp company';
			grid-template-columns: auto 1fr;
			grid-column-gap: 0.5rem;
			padding-top: 0.25rem; /* Add padding-top instead of padding: 0.25rem to avoid affecting bottom */
			margin-top: auto; /* Push header to the bottom */
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
			font-weight: 600;
			letter-spacing: 0.02em;
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
