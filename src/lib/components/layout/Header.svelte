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
	@use 'sass:map';

	:global(:root) {
		--easing-smooth: cubic-bezier(0.32, 0.72, 0, 1);
	}

	$dimensions: (
		header-height: 3rem,
		header-width: (
			desktop: 92%,
			mobile: 92%
		),
		logo: (
			size: 2rem,
			padding: primitive-spacing(xxs)
		),
		burger: (
			width: primitive-spacing(lg),
			height: primitive-spacing(lg),
			line: (
				height: 0.1563rem,
				width: calc(#{primitive-spacing(md)} + #{primitive-spacing(xxs)}),
				radius: 0.0625rem
			),
			translate: (
				x: 0.4688rem,
				y: spacing(most-related)
			)
		),
		nav: (
			max-width: 92%,
			list-gap: spacing(less-related)
		),
		link: (
			padding: (
				block: spacing(close-related),
				inline: primitive-spacing(sm)
			)
		)
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
		logo: (
			saturate: 200%,
			contrast: 100%
		)
	);

	$z-indices: (
		nav: 999,
		header: 1000,
		burger: 1001
	);

	$desktop-nav-gap: spacing(not-related);

	.header {
		--header-bg-color: hsl(206deg 18% 92% / 83%);
		--header-border-color: hsl(0deg 0% 100% / 12.5%);

		position: fixed;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: primitive-spacing(xs) primitive-spacing(md);
		border-radius: var(--rounded-border-radius);
		margin: 0 auto;
		backdrop-filter: blur(15px) saturate(200%);
		background-color: var(--header-bg-color);
		box-shadow: var(--shadow-low--light);
		inline-size: calc(100% - var(--page-inline-padding));
		inset-block-start: spacing(less-related);
		inset-inline-start: 50%;
		min-block-size: 3rem;
		transform: translateX(-50%);
		transition:
			transform var(--transition-duration) ease-in-out,
			opacity var(--transition-duration) ease-in-out;
		will-change: transform, opacity;

		&--hidden {
			opacity: 0;
			transform: translateY(map.get($transforms, header-hidden-translate-y)) translateX(-50%);
		}

		&__logo-wrapper {
			z-index: 1;
			overflow: hidden;
			flex-shrink: 0;
			padding: 0.375rem;
			border: 0.0625rem solid var(--color-secondary);
			border-radius: 50%;
			background: var(--convex-light);
			block-size: 2.25rem;
			box-shadow: var(--shadow-low--light);
			inline-size: 2.25rem;

			a {
				display: flex;
				block-size: 100%;
				inline-size: 100%;
				transition: transform var(--transition-duration) ease-in-out;

				&:hover,
				&:focus {
					transform: scale(1.05);
				}
			}
		}

		&__logo {
			block-size: 100%;
			filter: saturate(map.get($filters, logo, saturate))
				contrast(map.get($filters, logo, contrast));
			inline-size: 100%;
			margin-block-start: map.get($layout, logo-margin-top);
			mix-blend-mode: multiply;
			object-fit: contain;
		}

		&__nav-desktop {
			display: contents;
		}

		&__nav-desktop-list {
			display: none;
			padding: 0;
			margin: 0;
			list-style-type: none;
		}

		&__nav-mobile {
			position: fixed;
			z-index: map.get($z-indices, nav);
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-evenly;
			border: 1px solid var(--header-border-color);
			border-radius: var(--border-radius);
			backdrop-filter: blur(1rem) saturate(200%);
			backdrop-filter: blur(1rem) saturate(200%);
			background-color: var(--header-bg-color);
			box-shadow: var(--shadow-low--light);
			inline-size: map.get($dimensions, header-width, mobile);
			inset-block-start: 6rem;
			inset-inline-start: 50%;
			isolation: isolate;
			max-inline-size: map.get($dimensions, nav, max-width);
			opacity: 0;
			transform: translateX(-50%);
			transition:
				opacity var(--transition-duration) ease-in-out,
				visibility var(--transition-duration) ease-in-out;
			visibility: hidden;
			will-change: transform, opacity;

			&--open {
				opacity: 1;
				visibility: visible;
			}

			&-list {
				display: flex;
				flex-direction: column;
				padding: var(--page-inline-padding);
				gap: map.get($dimensions, nav, list-gap);
				list-style-type: none;
			}
		}

		&__nav-desktop-link,
		&__nav-mobile-link {
			position: relative;
			display: inline-flex;
			align-items: center;
			border-radius: var(--rounded-border-radius);
			font-size: 1rem;
			font-weight: 500;
			gap: spacing(most-related);
			max-inline-size: fit-content;
			text-decoration: none;
			transition: color var(--transition-duration) ease-in-out;

			svg {
				flex-shrink: 0;
				block-size: 1.25em;
				fill: currentcolor;
				inline-size: 1.25em;
			}

			&::after {
				position: absolute;
				background-color: var(--color-primary);
				block-size: 0.0938rem;
				content: '';
				inline-size: 100%;
				inset-block-end: -2px;
				inset-inline-start: 0;
				transform: scaleX(0);
				transform-origin: left;
				transition: transform var(--transition-duration) ease-in-out;
				will-change: transform;
			}

			&:hover::after,
			&:focus::after,
			&:active::after {
				transform: scaleX(1);
			}

			&.nav-link--cta {
				color: var(--color-primary);
				font-weight: 600;
				transition:
					transform var(--transition-duration) ease-in-out,
					opacity var(--transition-duration) ease-in-out;
				will-change: transform, opacity;
			}
		}

		&__burger {
			z-index: map.get($z-indices, burger);
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 0;
			border: none;
			background: transparent;
			block-size: map.get($dimensions, burger, height);
			cursor: pointer;
			inline-size: map.get($dimensions, burger, width);

			&-line {
				display: block;
				border-radius: map.get($dimensions, burger, line, radius);
				background-color: var(--color-p);
				block-size: map.get($dimensions, burger, line, height);
				inline-size: map.get($dimensions, burger, line, width);
				transition:
					transform var(--transition-duration) ease-in-out,
					opacity var(--transition-duration) ease-in-out;
			}

			&--open {
				.header__burger-line {
					&:first-child {
						transform: rotate(45deg)
							translate(
								map.get($dimensions, burger, translate, x),
								map.get($dimensions, burger, translate, y)
							);
					}

					&:nth-child(2) {
						opacity: 0;
					}

					&:last-child {
						transform: rotate(-45deg)
							translate(
								map.get($dimensions, burger, translate, x),
								-#{map.get($dimensions, burger, translate, y)}
							);
					}
				}
			}
		}

		@media (min-width: map.get($layout, mobile-breakpoint)) {
			justify-content: center;
			inline-size: map.get($dimensions, header-width, desktop);

			&__logo-wrapper {
				block-size: 3rem;
				inline-size: 3rem;
			}

			&__nav-desktop {
				display: flex;
				align-items: center;
				gap: $desktop-nav-gap;
			}

			&__nav-desktop-list {
				display: flex;
				align-items: center;
				padding: 0;
				margin: 0;
				gap: $desktop-nav-gap;
				list-style-type: none;
			}

			&__burger,
			&__nav-mobile {
				display: none;
			}
		}
	}

	.slide-in-blurred-top {
		animation: slide-in-blurred-top var(--transition-fade-in, 0.5s) var(--easing-smooth) both;
	}

	.slide-out-blurred-top {
		animation: slide-out-blurred-top var(--transition-standard, 0.3s) var(--easing-smooth) both;
	}

	@keyframes slide-in-blurred-top {
		0% {
			opacity: 0;
			transform: translateY(-#{spacing(less-related)}) translateX(-50%);
		}

		100% {
			opacity: 1;
			transform: translateY(0) translateX(-50%);
		}
	}

	@keyframes slide-out-blurred-top {
		0% {
			opacity: 1;
			transform: translateY(0) translateX(-50%);
		}

		100% {
			opacity: 0;
			transform: translateY(-#{spacing(less-related)}) translateX(-50%);
		}
	}
</style>
