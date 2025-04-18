<script lang="ts">
	// Define interface for link objects
	interface NavLink {
		link: string;
		fragment: string;
		iconSvg?: string; // New optional property for SVG icon markup
		text: string;
		class?: string; // Make class optional
	}

	// Remove unused imports
	// import { onMount, onDestroy } from 'svelte';

	// Links data using the NavLink interface
	const linksLeft: NavLink[] = [
		{
			link: '/home',
			fragment: 'services',
			iconSvg:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" /><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" /></svg>',
			text: 'Services'
		},
		{
			link: '/home',
			fragment: 'projects',
			iconSvg:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd" /></svg>',
			text: 'Projects'
		}
	];
	const linksRight: NavLink[] = [
		{
			link: '/home',
			fragment: 'faqs',
			iconSvg:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" /></svg>',
			text: 'FAQs'
		},
		{
			link: '/home',
			fragment: 'cta',
			iconSvg:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" /><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" /></svg>',
			text: 'Contact',
			class: 'nav-link--cta'
		} // Class is defined here
	];

	// State variables using Svelte 5 $state
	let isMenuOpen = $state(false);
	let isHeaderHidden = $state(false);
	let lastScrollPosition = $state(0);
	let animationClass = $state('');

	// References
	let burgerButton: HTMLButtonElement | undefined;
	// Remove the navLinks array, no longer needed
	// let navLinks: HTMLAnchorElement[] = [];
	let mobileNavContainer: HTMLElement | undefined;

	// Toggle menu function
	function toggleMenu() {
		if (isMenuOpen) {
			animationClass = 'slide-out-blurred-top';
		} else {
			animationClass = 'slide-in-blurred-top';
		}
		isMenuOpen = !isMenuOpen;
	}

	// Handle animation end - simplified focus management
	function onAnimationEnd() {
		if (!isMenuOpen) {
			// Reset animation class after slide-out animation completes
			animationClass = '';
			// Return focus to the burger button
			burgerButton?.focus();
		} else {
			// Set focus to the first focusable element (link) inside the mobile nav container
			mobileNavContainer?.querySelector('a')?.focus();
		}
	}

	// Scroll handling
	function onWindowScroll() {
		const currentScrollPosition = window.scrollY;

		if (currentScrollPosition > lastScrollPosition) {
			// Scrolling down
			isHeaderHidden = true;
			if (isMenuOpen) {
				isMenuOpen = false;
				animationClass = 'slide-out-blurred-top';
			}
		} else {
			// Scrolling up
			isHeaderHidden = false;
		}

		lastScrollPosition = currentScrollPosition;
	}

	// Handle keydown events
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isMenuOpen) {
			toggleMenu();
		}
	}

	// Lifecycle
	$effect(() => {
		// Add throttled scroll event to improve performance
		const scrollHandler = throttle(onWindowScroll, 200);
		window.addEventListener('scroll', scrollHandler);

		// Add event listener for 'Escape' key to close the menu
		window.addEventListener('keydown', handleKeyDown);

		// Cleanup function
		return () => {
			window.removeEventListener('scroll', scrollHandler);
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	// Simple throttle function
	function throttle(callback: () => void, delay: number) {
		let lastCall = 0;
		return function () {
			const now = new Date().getTime();
			if (now - lastCall < delay) {
				return;
			}
			lastCall = now;
			return callback();
		};
	}
</script>

<header class="header" class:header--hidden={isHeaderHidden}>
	<!-- Wrap desktop nav in a <nav> element for better semantics -->
	<nav class="header__nav-desktop" aria-label="Primary desktop navigation">
		<!-- Left Links -->
		<ul class="header__nav-desktop-list header__nav-desktop-list--left">
			{#each linksLeft as link}
				<li>
					<a
						href={link.link + '#' + link.fragment}
						tabindex="0"
						class="header__nav-desktop-link {link.class || ''}"
					>
						{#if link.iconSvg}
							{@html link.iconSvg}
						{/if}
						<span>{@html link.text}</span>
					</a>
				</li>
			{/each}
		</ul>

		<!-- Logo wrapper moved back inside nav -->
		<div class="header__logo-wrapper">
			<a href="/" aria-label="Go to homepage">
				<img
					class="header__logo"
					src="/assets/header/1stgreenhome.svg"
					alt="1st Green Home Logo"
					width={40}
					height={40}
				/>
			</a>
		</div>

		<!-- Right Links -->
		<ul class="header__nav-desktop-list header__nav-desktop-list--right">
			{#each linksRight as link}
				<li>
					<a
						href={link.link + '#' + link.fragment}
						tabindex="0"
						class="header__nav-desktop-link {link.class || ''}"
					>
						{#if link.iconSvg}
							{@html link.iconSvg}
						{/if}
						<span>{@html link.text}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<button
		bind:this={burgerButton}
		class="header__burger"
		on:click={toggleMenu}
		class:header__burger--open={isMenuOpen}
		aria-expanded={isMenuOpen ? 'true' : 'false'}
		aria-controls="navigation"
		aria-label="Toggle navigation menu"
	>
		<span class="header__burger-line"></span>
		<span class="header__burger-line"></span>
		<span class="header__burger-line"></span>
	</button>
</header>

<nav
	bind:this={mobileNavContainer}
	id="navigation"
	class="header__nav-mobile {animationClass}"
	class:header__nav-mobile--open={isMenuOpen}
	on:animationend={onAnimationEnd}
	aria-label="Primary Navigation"
>
	<ul class="header__nav-mobile-list">
		{#each [...linksLeft, ...linksRight] as link}
			<li>
				<a
					href={link.link + '#' + link.fragment}
					tabindex={isMenuOpen ? 0 : -1}
					class="header__nav-mobile-link {link.class || ''}"
				>
					{#if link.iconSvg}
						{@html link.iconSvg}
					{/if}
					<span>{@html link.text}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	/* Define custom easing */
	:global(:root) {
		--easing-smooth: cubic-bezier(0.32, 0.72, 0, 1);
	}

	/* ==================================================
	   Component SCSS Maps
	   ================================================== */
	$dimensions: (
		header-height: 3rem,
		header-width-desktop: 92%,
		header-width-mobile: 92%,
		logo-size: 2rem,
		logo-padding: primitive-spacing(xxs),
		// Kept for reference if needed elsewhere
		burger-width: primitive-spacing(lg),
		burger-height: primitive-spacing(lg),
		burger-line-height: 0.1563rem,
		burger-line-width: calc(#{primitive-spacing(md)} + #{primitive-spacing(xxs)}),
		nav-max-width: 92%,
		nav-list-gap: spacing(less-related),
		link-padding-block: spacing(close-related),
		link-padding-inline: primitive-spacing(sm),
		burger-translate-x: 0.4688rem,
		burger-translate-y: spacing(most-related)
	);

	$layout: (
		mobile-breakpoint: 64rem,
		nav-top-offset: spacing(close-related),
		logo-margin-top: -0.25rem
	);

	$transforms: (
		header-hidden-translate-y: -120%
	);

	$filters: (
		logo-saturate: 200%,
		logo-contrast: 100%
	);

	$borders: (
		burger-line-radius: 0.0625rem // 1px
	);

	$z-indices: (
		nav: 999,
		header: 1000,
		burger: 1001
	);
	$desktop-nav-gap: spacing(not-related);
	/* ==================================================
	   Header Block (.header)
	   ================================================== */
	.header {
		max-inline-size: $PAGE_MAX_WIDTH;

		// Positioning
		position: fixed;
		top: spacing(less-related);
		left: 50%;
		z-index: map-get($z-indices, header);

		// Layout
		display: flex;
		justify-content: space-between;
		align-items: center;

		// Box Model
		width: calc(100% - var(--page-inline-padding));
		min-height: map-get($dimensions, header-height);
		margin: 0 auto;
		padding-inline: primitive-spacing(md);
		padding-block: primitive-spacing(xs);

		// Visuals
		background-color: hsl(206, 18%, 92%, 0.83); // Use HSL for better readability
		backdrop-filter: blur(15px) saturate(200%);
		border-radius: var(--rounded-border-radius);
		box-shadow: var(--shadow-low--light);

		// Animation & Interaction
		transform: translateX(-50%);
		transition:
			transform var(--transition-duration) ease-in-out,
			opacity var(--transition-duration) ease-in-out;
		will-change: transform, opacity; // Performance hint

		/* Modifier: Hidden state */
		&--hidden {
			opacity: 0;
			transform: translateY(map-get($transforms, header-hidden-translate-y)) translateX(-50%);
		}

		/* Element: Logo Wrapper */
		&__logo-wrapper {
			@extend %flex-center;
			// Box Model
			flex-shrink: 0; // Prevent shrinking
			width: 2.25rem;
			height: 2.25rem;
			overflow: hidden;
			padding: 0.375rem;
			// Visuals
			background: var(--convex-light);
			border-radius: 50%;
			border: 0.0625rem solid var(--color-secondary);
			box-shadow: var(--shadow-low--light);

			// Positioning (relative to siblings if needed)
			z-index: 1;
		}

		/* Element: Logo Image */
		&__logo {
			// Box Model
			width: 100%;
			height: 100%;
			margin-top: map-get($layout, logo-margin-top);
			object-fit: contain;

			// Visuals
			mix-blend-mode: multiply;
			filter: saturate(map-get($filters, logo-saturate)) contrast(map-get($filters, logo-contrast));
		}

		/* Logo link styling */
		&__logo-wrapper a {
			display: flex;
			width: 100%;
			height: 100%;
			transition: transform var(--transition-duration) ease-in-out;

			&:hover,
			&:focus {
				transform: scale(1.05);
			}
		}

		/* Element: Desktop Nav Container */
		&__nav-desktop {
			/* MODIFIED: Use display: contents by default (mobile) */
			/* This allows logo and lists inside to be positioned by the parent .header flexbox */
			display: contents;
			/* Removed align-items and gap here, apply only on desktop */
		}

		/* ADDED: Hide nav lists by default (mobile) */
		&__nav-desktop-list {
			display: none; // Hide lists on mobile
			// Box Model
			margin: 0;
			padding: 0;
			// Visuals
			list-style-type: none;
		}

		/* Element: Mobile Navigation Container */
		&__nav-mobile {
			// Positioning
			position: fixed;
			top: 6rem; // Consider using spacing tokens if applicable
			left: 50%;
			z-index: map-get($z-indices, nav);
			isolation: isolate; // Create new stacking context

			// Layout
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: flex-start;

			// Box Model
			width: map-get($dimensions, header-width-mobile);
			max-width: map-get($dimensions, nav-max-width);

			// Visuals
			background-color: hsla(var(--color-light-hsl), 0.83);
			backdrop-filter: blur(1rem) saturate(200%);
			-webkit-backdrop-filter: blur(1rem) saturate(200%); // Keep for broader compatibility
			border: 1px solid hsla(0, 0%, 100%, 0.125);
			border-radius: var(--border-radius);
			box-shadow: var(--shadow-low--light);
			opacity: 0; // Hidden by default
			visibility: hidden;

			// Animation & Interaction
			transform: translateX(-50%);
			transition:
				opacity var(--transition-duration) ease-in-out,
				visibility var(--transition-duration) ease-in-out;
			will-change: transform, opacity; // Performance hint

			/* Modifier: Open state */
			&--open {
				opacity: 1;
				visibility: visible;
			}

			/* Element: Nav Mobile List */
			&-list {
				// Layout
				display: flex;
				flex-direction: column;
				gap: map-get($dimensions, nav-list-gap);

				// Box Model
				padding: var(--page-inline-padding); // Assumes this variable holds appropriate spacing

				// Visuals
				list-style-type: none;
			}
		}

		/* Shared Link Styles */
		&__nav-desktop-link,
		&__nav-mobile-link {
			// Positioning
			position: relative; // For pseudo-element

			// Layout
			display: inline-flex; // Arrange icon and text horizontally
			align-items: center; // Vertically align icon and text
			gap: spacing(most-related); // Add space between icon and text

			// Box Model
			max-inline-size: fit-content; // Shrink-wrap width

			// Typography & Visuals
			@extend %p; // Apply base paragraph styles
			font-weight: 500;
			text-decoration: none;
			border-radius: var(--rounded-border-radius);
			font-size: 1rem;
			// Animation & Interaction
			transition: color var(--transition-duration) ease-in-out; // Removed transform transition here as it's not explicitly used

			/* Style the SVG icon within the link */
			svg {
				width: 1.25em; // Size relative to font size
				height: 1.25em;
				flex-shrink: 0; // Prevent icon from shrinking
				fill: currentColor; // Optional: Make icon color inherit text color
			}

			/* Underline Pseudo-element */
			&::after {
				content: '';
				position: absolute;
				bottom: -2px;
				left: 0;
				width: 100%; // Start full width
				height: 0.0938rem;
				background-color: var(--color-primary);
				transform: scaleX(0); // Initially hidden by scaling
				transform-origin: left; // Scale from the left
				transition: transform var(--transition-duration) ease-in-out; // Animate transform
				will-change: transform; // Performance hint
			}

			&:hover,
			&:focus {
				&::after {
					transform: scaleX(1); // Reveal underline by scaling
				}
			}

			&:active {
				&::after {
					transform: scaleX(1); // Keep underline visible
				}
			}

			/* Modifier: CTA Link Style */
			&.nav-link--cta {
				color: var(--color-primary);
				font-weight: 600;
				// Animation & Interaction
				transition:
					transform var(--transition-duration) ease-in-out,
					opacity var(--transition-duration) ease-in-out;
				will-change: transform, opacity; // Performance hint
			}
		}

		/* Element: Burger Menu Button */
		&__burger {
			// Positioning
			z-index: map-get($z-indices, burger);

			// Layout
			display: flex; // Use flexbox for lines
			flex-direction: column;
			justify-content: space-around; // Space out lines

			// Box Model
			width: map-get($dimensions, burger-width);
			height: map-get($dimensions, burger-height);
			padding: 0;

			// Visuals
			background: transparent;
			border: none;

			// Interaction
			cursor: pointer;

			/* Element: Burger Line */
			&-line {
				// Layout
				display: block;

				// Box Model
				width: map-get($dimensions, burger-line-width);
				height: map-get($dimensions, burger-line-height);

				// Visuals
				background-color: var(--color-p); // Use paragraph color token
				border-radius: map-get($borders, burger-line-radius);

				// Animation & Interaction
				transition:
					transform var(--transition-duration) ease-in-out,
					opacity var(--transition-duration) ease-in-out;
			}

			/* Modifier: Open state animation */
			&--open {
				.header__burger-line {
					// Target lines within open burger
					&:first-child {
						transform-origin: center;
						transform: rotate(45deg)
							translate(
								map-get($dimensions, burger-translate-x),
								map-get($dimensions, burger-translate-y)
							);
					}

					&:nth-child(2) {
						opacity: 0;
					}

					&:last-child {
						transform-origin: center;
						transform: rotate(-45deg)
							translate(
								map-get($dimensions, burger-translate-x),
								-#{map-get($dimensions, burger-translate-y)}
							);
					}
				}
			}
		}

		/* --------------------------------------------------
		MEDIA QUERY (Desktop Styles - min-width)
		-------------------------------------------------- */
		@media (min-width: map-get($layout, mobile-breakpoint)) {
			// Box Model
			width: map-get($dimensions, header-width-desktop);

			// Layout
			justify-content: center; // Ensure elements space out correctly -> CHANGED from space-between
			&__logo-wrapper {
				width: 3rem;
				height: 3rem;
			}
			&__nav-desktop {
				/* MODIFIED: Set back to flex for desktop */
				display: flex;
				align-items: center; // Vertically align nav items
				gap: $desktop-nav-gap;
			}

			&__nav-desktop-list {
				// Layout
				/* MODIFIED: Show lists on desktop */
				display: flex;
				align-items: center;
				gap: $desktop-nav-gap;

				// Box Model
				margin: 0;
				padding: 0;

				// Visuals
				list-style-type: none;
			}

			&__burger {
				display: none; // Hide burger
			}

			&__nav-mobile {
				display: none; // Hide mobile nav
			}
		}
	} /* End .header block */

	/* --------------------------------------------------
	Mobile Nav Animation Classes (Remain top-level)
	-------------------------------------------------- */
	.slide-in-blurred-top {
		animation: slide-in-blurred-top var(--transition-fade-in, 0.5s) var(--easing-smooth) both;
	}

	.slide-out-blurred-top {
		animation: slide-out-blurred-top var(--transition-standard, 0.3s) var(--easing-smooth) both;
	}

	/* Keyframes for Slide-In (Blur Removed) */
	@keyframes slide-in-blurred-top {
		0% {
			transform: translateY(-#{spacing(less-related)}) translateX(-50%);
			opacity: 0;
		}
		100% {
			transform: translateY(0) translateX(-50%);
			opacity: 1;
		}
	}

	/* Keyframes for Slide-Out (Blur Removed) */
	@keyframes slide-out-blurred-top {
		0% {
			transform: translateY(0) translateX(-50%);
			opacity: 1;
		}
		100% {
			transform: translateY(-#{spacing(less-related)}) translateX(-50%);
			opacity: 0;
		}
	}
</style>
