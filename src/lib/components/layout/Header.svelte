<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// Links data
	const links = [
		{ link: '/home', fragment: 'services', text: 'Services' },
		{ link: '/home', fragment: 'projects', text: 'Projects' },
		{ link: '/home', fragment: 'faqs', text: 'FAQs' },
		{ link: '/home', fragment: 'cta', text: 'Contact' }
	];

	// State variables using Svelte 5 $state
	let isMenuOpen = $state(false);
	let isHeaderHidden = $state(false);
	let lastScrollPosition = $state(0);
	let animationClass = $state('');

	// References
	let burgerButton: HTMLButtonElement | undefined;
	let navLinks: HTMLAnchorElement[] = [];

	// Toggle menu function
	function toggleMenu() {
		if (isMenuOpen) {
			animationClass = 'slide-out-blurred-top';
		} else {
			animationClass = 'slide-in-blurred-top';
		}
		isMenuOpen = !isMenuOpen;
	}

	// Handle animation end
	function onAnimationEnd() {
		if (!isMenuOpen) {
			// Reset animation class after slide-out animation completes
			animationClass = '';
			// Return focus to the burger button
			if (burgerButton) burgerButton.focus();
		} else {
			// Set focus to the first navigation link
			if (navLinks.length > 0) navLinks[0].focus();
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

	// Svelte action to collect nav link references
	function collectNavLink(node: HTMLAnchorElement) {
		// Add this node to our navLinks array
		navLinks = [...navLinks, node];

		return {
			destroy() {
				// Remove this node when element is destroyed
				navLinks = navLinks.filter((link) => link !== node);
			}
		};
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

<header class="header-container" class:hidden={isHeaderHidden}>
	<div class="header-logo-wrapper">
		<img
			class="header__logo"
			src="static/assets/header/1stgreenhome-logo.svg"
			alt="1st Green Home Logo"
			width={40}
			height={40}
		/>
	</div>
	<ul class="header__links">
		{#each links as link}
			<li>
				<a use:collectNavLink href={link.link + '#' + link.fragment} tabindex={isMenuOpen ? 0 : -1}
					>{@html link.text}</a
				>
			</li>
		{/each}
	</ul>
	<button
		bind:this={burgerButton}
		class="header__burger"
		on:click={toggleMenu}
		class:open={isMenuOpen}
		aria-expanded={isMenuOpen ? 'true' : 'false'}
		aria-controls="navigation"
		aria-label="Toggle navigation menu"
	>
		<span></span>
		<span></span>
		<span></span>
	</button>
</header>

<nav
	id="navigation"
	class="header__nav {animationClass}"
	class:open={isMenuOpen}
	on:animationend={onAnimationEnd}
	role="navigation"
	aria-label="Primary Navigation"
>
	<ul>
		{#each links as link}
			<li>
				<a use:collectNavLink href={link.link + '#' + link.fragment} tabindex={isMenuOpen ? 0 : -1}
					>{@html link.text}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	// SCSS Variables and Maps
	$colors: (
		primary: var(--color-primary),
		text: var(--color-p),
		light: var(--color-light),
		bg-transparent: hsla(150, 100%, 99%, 0.83)
	);

	$spacing: (
		xs: 0.3125rem,
		// 5px
		sm: 0.5rem,
		// 8px
		md: 1rem,
		// 16px
		lg: 1.25rem,
		// 20px
		xl: 1.5rem,
		// 24px
		xxl: 2.5rem // 40px
	);

	$sizes: (
		header-height: 3.75rem,
		header-width: 80svw,
		logo-size: 3rem,
		burger-width: 1.125rem,
		burger-height: 1.5625rem,
		burger-line: 0.1563rem,
		nav-max-width: 300px
	);

	$borders: (
		radius-pill: 9999px,
		radius-lg: 0.75rem,
		radius-sm: 0.0625rem,
		radius-md: 5rem
	);

	$animations: (
		standard: 0.3s ease-in-out,
		fast: 0.25s ease-in-out
	);

	$shadows: (
		medium: var(--shadow-medium--secondary)
	);

	$z-indices: (
		base: 3,
		nav: 999,
		header: 1000,
		burger: 1001
	);

	/* Global Styles */
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: var(--font-family-bold);
		font-weight: 500;
		color: map-get($colors, text);
		z-index: map-get($z-indices, base);
		/* outline: .0625rem dashed red; */
		transition: all map-get($animations, standard);
	}

	/* --------------------------------------------------
Header Container 
-------------------------------------------------- */

	.header-container {
		position: fixed;
		top: map-get($spacing, md);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: map-get($sizes, header-width);
		height: map-get($sizes, header-height);
		padding: map-get($spacing, lg);
		transition:
			transform map-get($animations, standard),
			opacity map-get($animations, standard);
		z-index: map-get($z-indices, header);
		background-color: map-get($colors, bg-transparent);
		backdrop-filter: blur(15px) saturate(200%);
		-webkit-backdrop-filter: blur(15px) saturate(200%);
		border: 1px solid rgba(255, 255, 255, 0.125);
		border-radius: map-get($borders, radius-pill);
		box-shadow: map-get($shadows, medium);
	}

	.header-container.hidden {
		transform: translateY(-100%) translateX(-50%);
		opacity: 0;
	}

	/* --------------------------------------------------
LOGO
-------------------------------------------------- */
	.header-logo-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: map-get($spacing, xs);
		width: map-get($sizes, logo-size);
		height: map-get($sizes, logo-size);
		background: var(--convex-light);
		border-radius: 50%;
		border: 0.0625rem solid map-get($colors, primary);
		box-shadow: map-get($shadows, medium);
		overflow: hidden;
	}

	.header-logo-wrapper .header__logo {
		margin-top: -5px;
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: saturate(200%) contrast(100%);
	}

	/* --------------------------------------------------
INSIDE HEADER LINKS
-------------------------------------------------- */
	.header__links {
		display: flex;
		gap: map-get($spacing, xl);
		list-style-type: none;
	}

	/* --------------------------------------------------
OUTSIDE HEADER DROPDOWN NAVIGATION
-------------------------------------------------- */
	.header__nav {
		position: fixed;
		top: map-get($sizes, header-height);
		left: 0;
		width: 100%;
		max-width: map-get($sizes, nav-max-width);
		height: calc(100% - map-get($sizes, header-height));
		backdrop-filter: blur(15px) saturate(200%);
		-webkit-backdrop-filter: blur(15px) saturate(200%);
		background-color: map-get($colors, bg-transparent);
		border-radius: map-get($borders, radius-lg);
		border: 1px solid rgba(255, 255, 255, 0.125);
		isolation: isolate;
		transform: translateX(-100%);
		opacity: 0;
		transition:
			transform map-get($animations, standard),
			opacity map-get($animations, standard);
		z-index: map-get($z-indices, nav);
	}

	/* Navigation Open State */
	.header__nav.open {
		transform: translateX(0);
		opacity: 1;
	}

	/* --------------------------------------------------
COMBINED LINK SELECTORS
-------------------------------------------------- */
	.header__nav ul {
		display: flex;
		flex-direction: column;
		gap: map-get($spacing, xxl);
		list-style-type: none;
		padding: map-get($spacing, md);
	}

	.header__links li,
	.header__nav ul li {
		margin: 0;
	}

	.header__links li a,
	.header__nav ul li a {
		text-decoration: none;
		padding: map-get($spacing, sm) map-get($spacing, md);
		border-radius: map-get($borders, radius-md);
		transition: background map-get($animations, fast);
		display: block;
		font-family: var(--font-family-regular);
		font-weight: 400;
		color: map-get($colors, text);
	}

	.header__links li a:hover,
	.header__links li a:focus,
	.header__nav ul li a:hover,
	.header__nav ul li a:focus {
		transition: background map-get($animations, fast);
		background: var(--convex-secondary);
		color: map-get($colors, light);
		outline: none;
	}

	@keyframes animate-background-center-outward {
		0% {
			background-size: 0% 0%;
			opacity: 0;
		}
		100% {
			background-size: 100% 100%;
			opacity: 1;
		}
	}

	a[href='/home#cta'] {
		color: map-get($colors, primary) !important;
		font-family: var(--font-family-bold) !important;
		font-weight: 600 !important;
	}

	/* --------------------------------------------------
BURGER
-------------------------------------------------- */
	.header__burger {
		display: none; /* Hidden by default, shown on mobile */
		flex-direction: column;
		justify-content: space-around;
		width: map-get($sizes, burger-width);
		height: map-get($sizes, burger-height);
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: map-get($z-indices, burger);
	}

	.header__burger.open span:first-child {
		transform-origin: center;
		transform: rotate(45deg) translate(0.5rem, 0.25rem);
	}

	.header__burger.open span:nth-child(2) {
		opacity: 0;
	}

	.header__burger.open span:last-child {
		transform-origin: center;
		transform: rotate(-45deg) translate(0.5rem, -0.25rem);
	}

	.header__burger span {
		width: 1.25rem;
		height: map-get($sizes, burger-line);
		background-color: map-get($colors, text);
		border-radius: map-get($borders, radius-sm);
		transition:
			transform map-get($animations, standard),
			opacity map-get($animations, standard);
	}

	/* Animation Classes */
	.slide-in-blurred-top {
		animation: slide-in-blurred-top 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
	}

	.slide-out-blurred-top {
		animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.05, 0.855, 0.06) both;
	}

	/* --------------------------------------------------
ANIMATIONS
-------------------------------------------------- */
	@keyframes slide-in-blurred-top {
		0% {
			transform: translateY(-100%) scaleY(1.2);
			filter: blur(5px);
			opacity: 0;
		}
		100% {
			transform: translateY(0) scaleY(1);
			filter: blur(0);
			opacity: 1;
		}
	}

	/* Keyframes for Slide-Out */
	@keyframes slide-out-blurred-top {
		0% {
			transform: translateY(0) scaleY(1);
			filter: blur(0);
			opacity: 1;
		}
		100% {
			transform: translateY(-100%) scaleY(1.2);
			filter: blur(5px);
			opacity: 0;
		}
	}

	/* --------------------------------------------------
MEDIA Q
-------------------------------------------------- */
	@media (max-width: 50.625rem) {
		/* Add styles for mobile view here */
	}
</style>
