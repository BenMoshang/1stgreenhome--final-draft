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
  const routes: NavLink[] = [
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
    },

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
  <nav class="header__nav--desktop" aria-label="Primary desktop navigation">
    <ul class="header__nav--desktop-list">
      {#each routes as link}
        <li>
          <a
            href="{link.link}#{link.fragment}"
            class="header__nav-desktop-route {link.class || ''}"
            tabindex="0"
          >
            {@html link.iconSvg}
            <span>{@html link.text}</span>
          </a>
        </li>
      {/each}
    </ul>

      <a class="header__logo-container" href="/" aria-label="Homepage">
        <img
          src="/assets/header/1stgreenhome.svg"
          alt="1st Green Home Logo"
          width="40"
          height="40"
          class="header__logo-container-image"
        />
      </a>

<nav
  bind:this={mobileNavContainer}
  id="navigation"
  class="header__nav--mobile {animationClass}"
  class:header__nav--mobile--open={isMenuOpen}
  on:animationend={onAnimationEnd}
  aria-label="Mobile navigation"
>
  <ul class="header__nav--mobile-list">
    {#each routes as link}
      <li>
        <a
          href="{link.link}#{link.fragment}"
          class="header__nav-mobile-route {link.class || ''}"
          tabindex={isMenuOpen ? 0 : -1}
        >
          {@html link.iconSvg}
          <span>{@html link.text}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>
<!-- Burger -->
  <button
    bind:this={burgerButton}
    on:click={toggleMenu}
    class="header__burger"
    class:header__burger--open={isMenuOpen}
    aria-expanded={isMenuOpen}
    aria-controls="navigation"
    aria-label="Toggle menu"
  >
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
      <path class="line" d="M7 16 27 16"></path>
    </svg>
  </button>
</header>



<style lang="scss">
  

.header{

  display: flex;
  justify-content: space-around;
  align-items: center;

  &--hidden {
    opacity: 0;
    // transform: translateY(map.get($transforms, header-hidden-y))
    //   translateX(-50%);
  }
&__logo-container {
  --_size: size(xs);
  inline-size: var(--_size);
  block-size: var(--_size);



 &-image {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  

  }

}

  &__nav--desktop {
    
    &-list {
      
    }

    &-route {
      
    }
  }
  &__nav--mobile {
    &--open {
      
    }
    &-list {
      
    }

    &-route {
      
    } 
  }

  &__burger {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    inline-size: 3em;
    block-size: 3em;

    svg {
      height: 100%;
      width: 100%;
      transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .line {
      fill: none;
      stroke: white;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 3;
      transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                  stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .line-top-bottom {
      stroke-dasharray: 12 63;
    }

    &--open {
      svg {
        transform: rotate(-45deg);
      }
      .line-top-bottom {
        stroke-dasharray: 20 300;
        stroke-dashoffset: -32.42;
      }
    }
  }
}

/*=========================
  Utility
===========================*/

  .slide-in-blurred-top {
    --easing-smooth: cubic-bezier(0.32, 0.72, 0, 1);

    animation: slide-in-blurred-top var(--transition-fade-in, 0.5s) var(--easing-smooth)
      both;
  }
  .slide-out-blurred-top {
    --easing-smooth: cubic-bezier(0.32, 0.72, 0, 1);

    animation: slide-out-blurred-top var(--transition-standard, 0.3s) var(--easing-smooth)
      both;
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
