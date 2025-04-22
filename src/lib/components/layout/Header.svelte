<script lang="ts">
  // Define interface for navigation links
  interface NavLink {
    link: string;
    fragment: string;
    iconSvg?: string;
    text: string;
    class?: string;
  }

  // Navigation link data
  const linksLeft: NavLink[] = [
    {
      link: '/home',
      fragment: 'services',
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
        </svg>`,
      text: 'Services'
    },
    {
      link: '/home',
      fragment: 'projects',
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd"/>
        </svg>`,
      text: 'Projects'
    }
  ];

  const linksRight: NavLink[] = [
    {
      link: '/home',
      fragment: 'faqs',
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"/>
        </svg>`,
      text: 'FAQs'
    },
    {
      link: '/home',
      fragment: 'cta',
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
        </svg>`,
      text: 'Contact',
      class: 'nav-link--cta'
    }
  ];

  // State
  let isMenuOpen = $state(false);
  let isHeaderHidden = $state(false);
  let lastScrollPosition = $state(0);
  let animationClass = $state('');

  // Element refs
  let burgerButton: HTMLButtonElement;
  let mobileNavContainer: HTMLElement;

  // Toggle mobile menu
  function toggleMenu() {
    animationClass = isMenuOpen ? 'slide-out-blurred-top' : 'slide-in-blurred-top';
    isMenuOpen = !isMenuOpen;
  }

  // After animation ends
  function onAnimationEnd() {
    if (!isMenuOpen) {
      animationClass = '';
      burgerButton?.focus();
    } else {
      mobileNavContainer?.querySelector('a')?.focus();
    }
  }

  // Throttled scroll handling
  function onWindowScroll() {
    const current = window.scrollY;
    if (current > lastScrollPosition) {
      isHeaderHidden = true;
      if (isMenuOpen) {
        isMenuOpen = false;
        animationClass = 'slide-out-blurred-top';
      }
    } else {
      isHeaderHidden = false;
    }
    lastScrollPosition = current;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  }

  function throttle(fn: () => void, wait: number) {
    let last = 0;
    return () => {
      const now = Date.now();
      if (now - last < wait) return;
      last = now;
      fn();
    };
  }

  // Lifecycle
  $effect(() => {
    const scrollHandler = throttle(onWindowScroll, 200);
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<header class="header" class:header--hidden={isHeaderHidden}>
  <nav class="header__nav-desktop" aria-label="Primary desktop navigation">
    <ul class="header__nav-desktop-list header__nav-desktop-list--left">
      {#each linksLeft as link}
        <li>
          <a
            href="{link.link}#{link.fragment}"
            class="header__nav-desktop-link {link.class || ''}"
            tabindex="0"
          >
            {@html link.iconSvg}
            <span>{@html link.text}</span>
          </a>
        </li>
      {/each}
    </ul>

    <div class="header__logo-wrapper">
      <a href="/" aria-label="Homepage">
        <img
          src="/assets/header/1stgreenhome.svg"
          alt="1st Green Home Logo"
          width="40"
          height="40"
          class="header__logo"
        />
      </a>
    </div>

    <ul class="header__nav-desktop-list header__nav-desktop-list--right">
      {#each linksRight as link}
        <li>
          <a
            href="{link.link}#{link.fragment}"
            class="header__nav-desktop-link {link.class || ''}"
            tabindex="0"
          >
            {@html link.iconSvg}
            <span>{@html link.text}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <button
    bind:this={burgerButton}
    on:click={toggleMenu}
    class="header__burger"
    class:header__burger--open={isMenuOpen}
    aria-expanded={isMenuOpen}
    aria-controls="navigation"
    aria-label="Toggle menu"
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
  aria-label="Mobile navigation"
>
  <ul class="header__nav-mobile-list">
    {#each [...linksLeft, ...linksRight] as link}
      <li>
        <a
          href="{link.link}#{link.fragment}"
          class="header__nav-mobile-link {link.class || ''}"
          tabindex={isMenuOpen ? 0 : -1}
        >
          {@html link.iconSvg}
          <span>{@html link.text}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @use 'sass:map';

  // Define dimensions and spacing values
  $dimensions: (
    header-height: 3rem,
    header-width: (
      desktop: 92%,
      mobile: 92%
    ),
    logo-size: 2rem,
    burger: (
      line: (
        height: 0.1563rem,
        width: calc(var(--spacing-md) + var(--spacing-xxs)),
        radius: 0.0625rem
      ),
      translate: (
        x: 0.4688rem,
        y: var(--spacing-xs)
      )
    ),
    nav-max: 92%,
    nav-gap: var(--spacing-sm),
    link-padding: (
      block: var(--spacing-xxs),
      inline: var(--spacing-xs)
    )
  );

  $layout: (
    mobile-breakpoint: 64rem,
    nav-top-offset: var(--spacing-xs),
    logo-offset: -0.25rem
  );

  $transforms: (
    header-hidden-y: -120%
  );

  $filters: (
    logo-sat: 200%,
    logo-ctr: 100%
  );

  $z: (
    nav: 999,
    header: 1000,
    burger: 1001
  );

  :global(:root) {
    --easing-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  }

  .header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: map.get($dimensions, header-width, desktop);
    padding: var(--spacing-xs) var(--spacing-md);
    background: var(--bg);
    backdrop-filter: blur(var(--blur-standard, 15px)) saturate(var(--saturate-high, 200%));
    border-radius: var(--rounded-border-radius);
    box-shadow: var(--shadow-low--light);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform var(--transition-duration),
      opacity var(--transition-duration);
    z-index: map.get($z, header);

    &--hidden {
      opacity: 0;
      transform: translateY(map.get($transforms, header-hidden-y))
        translateX(-50%);
    }

    &__logo-wrapper {
      flex-shrink: 0;
      border: 1px solid var(--color-secondary);
      border-radius: 50%;
      padding: var(--spacing-xxs);
      background: var(--convex-light);
      box-shadow: var(--shadow-low--light);
      width: var(--spacing-lg);
      height: var(--spacing-lg);

      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        transition: transform var(--transition-duration);

        &:hover,
        &:focus {
          transform: scale(1.05);
        }
      }
    }

    &__logo {
      width: 100%;
      height: 100%;
      margin-top: map.get($layout, logo-offset);
      filter: saturate(map.get($filters, logo-sat))
        contrast(map.get($filters, logo-ctr));
      object-fit: contain;
      mix-blend-mode: multiply;
    }

    &__nav-desktop {
      display: none;

      @media (min-width: map.get($layout, mobile-breakpoint)) {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
    }

    &__nav-desktop-list {
      list-style: none;
      display: flex;
      gap: var(--spacing-md);
      margin: 0;
      padding: 0;
    }

    &__nav-mobile {
      position: fixed;
      top: var(--spacing-xxl);
      left: 50%;
      transform: translateX(-50%);
      width: map.get($dimensions, nav-max);
      max-width: map.get($dimensions, nav-max);
      background: var(--bg);
      backdrop-filter: blur(var(--blur-light, 1rem)) saturate(var(--saturate-high, 200%));
      border: 1px solid var(--border);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-low--light);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--transition-duration),
        visibility var(--transition-duration);
      z-index: map.get($z, nav);

      &--open {
        opacity: 1;
        visibility: visible;
      }

      &-list {
        list-style: none;
        padding: var(--page-inline-padding);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        margin: 0;
      }

      @media (min-width: map.get($layout, mobile-breakpoint)) {
        display: none;
      }
    }

    &__nav-desktop-link,
    &__nav-mobile-link {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      position: relative;
      padding-block: var(--spacing-xxs);
      padding-inline: var(--spacing-xs);
      border-radius: var(--rounded-border-radius);
      transition: color var(--transition-duration);

      svg {
        width: 1.25em;
        height: 1.25em;
        flex-shrink: 0;
        fill: currentColor;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: calc(-1 * var(--spacing-xxs));
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--color-primary);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--transition-duration);
      }
      &:hover::after,
      &:focus::after,
      &:active::after {
        transform: scaleX(1);
      }

      &.nav-link--cta {
        color: var(--color-primary);

        font-weight: 600;
      }
    }

    &__burger {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background: transparent;
      border: none;
      cursor: pointer;
      width: map.get($dimensions, burger, width);
      height: map.get($dimensions, burger, height);
      z-index: map.get($z, burger);

      &-line {
    
        background: var(--color-p);
        transition: transform var(--transition-duration),
          opacity var(--transition-duration);
      }

      &--open .header__burger-line {
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
              calc(-1 * map.get($dimensions, burger, translate, y))
            );
        }
      }

      @media (min-width: map.get($layout, mobile-breakpoint)) {
        display: none;
      }
    }
  }

  .slide-in-blurred-top {
    animation: slide-in-blurred-top var(--transition-fade-in, 0.5s) var(--easing-smooth)
      both;
  }
  
  .slide-out-blurred-top {
    animation: slide-out-blurred-top var(--transition-standard, 0.3s) var(--easing-smooth)
      both;
  }

  @keyframes slide-in-blurred-top {
    0% {
      opacity: 0;
      transform: translateY(calc(-1 * var(--spacing-lg))) translateX(-50%);
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
      transform: translateY(calc(-1 * var(--spacing-lg))) translateX(-50%);
    }
  }
</style>
