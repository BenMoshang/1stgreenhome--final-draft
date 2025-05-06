# AI Agent Context & Utility Reference Sheet

This document provides a quick reference for AI agents working within the `src/lib/components/layout/new-sections` and `src/lib/components/layout/new-components` folders of the 1stgreenhome project.

## Core Technologies & Conventions

*   **Framework:** Svelte 5 (using Runes mode)
    *   `$state`: For reactive component state.
    *   `$derived`: For computed state based on other reactive values.
    *   `$props`: For declaring and receiving component properties.
*   **Language:** TypeScript (`<script lang="ts">`). Interfaces are commonly used to define data structures (e.g., `HeroData`, `Service`).
*   **Styling:** SCSS (`<style lang="scss">`).
*   **Component Structure:** A common pattern for section components is:
    ```html
    <section id="section-name" class="... u_p-inline__md u_p-block__xl">
      <div class="...__container u_container__sm ">
        <header class="...__header">
          <!-- Header content (label, title, description) -->
        </header>
        <!-- Main section content (cards, articles, etc.) -->
      </div>
    </section>
    ```
*   **Utility Class System:** Heavy reliance on utility classes prefixed with `u_` (see details below).
*   **SCSS Naming:** Generally follows a BEM-like convention (e.g., `component__element--modifier`).
*   **Custom Style Set:** Uses `brute__*` classes (e.g., `brute__label`, `brute__button`) for a distinct visual style. `-rev` variants (e.g., `brute__label-rev`) likely indicate styles adapted for darker backgrounds.

## Common Utility Classes

*(Based on observed usage and project memories)*

*   **Spacing (Tied to Typography - see Memory `fc51511b`):**
    *   Padding: `u_p-inline__*`, `u_p-block__*` (e.g., `u_p-inline__md`, `u_p-block__xl`)
    *   Margin: `u_m-bottom__*` (e.g., `u_m-bottom__sm`, `u_m-bottom__lg`)
    *   Gap: `u_gap__*` (e.g., `u_gap__xl`)
*   **Layout:**
    *   Container: `brute-container` (Constrains content width)
    *   Grid specific: `container--grid` (Used in `NewHero`)
*   **Typography (Tied to Color System - see Memory `71f5251c`):**
    *   Hierarchy/Style: `u_display-*`, `u_title-*`, `u_paragraph`, `u_heading`, `u_subheading` (often via `@extend`)
    *   Color Levels:
        *   `typography--primary` (`var(--on-surface)`)
        *   `typography--secondary` (`var(--on-surface-container)`)
        *   `typography--tertiary` (`var(--on-surface-container-high)`)
    *   Reversed Variants (likely for dark backgrounds):
        *   `typography--primary-rev`
        *   `typography--secondary-rev`
        *   `typography--tertiary-rev`
    *   Line Length: `max-ch-*` (e.g., `max-ch-20`, `max-ch-45`)

## Common SCSS Patterns

*   **Mixins (`@include`):**
    *   `respond-to('*')`: For media query breakpoints (e.g., `respond-to('tablet-start')`).
    *   `gradient-text-animated(*)`: Applies an animated gradient text effect.
    *   `apply-shadow(*)`: Applies predefined shadow styles.
    *   `only-green`: Complex filter used in `NewProjectsSection` image containers.
*   **Placeholders (`@extend %*`):**
    *   `%flex-col-center`: Centers items in a flex column.
    *   `%image-hover`: Applies common hover effects/transitions to images/containers.
    *   `%u_paragraph`, `%u_heading`, `%typography--*`, etc.: Extends base typography styles.
*   **Variables & Functions:**
    *   CSS Variables: `var(--brute-*)`, `var(--shadow-*)`, `var(--margin-*)`, `var(--brand)`, etc.
    *   SCSS Variables: `$br` (border-radius), `$text-z`, etc.
    *   `size('*')`: Function likely resolving to spacing values (e.g., `size('md')`, `size('xl')`).

## Reusable Components (`src/lib/components/layout/new-components/`)

*   **`ServiceCard.svelte`**
    *   Purpose: Displays a single service offering with an image, title, description, and tags.
    *   Props (`$props`): Expects a `service` object with properties: `title`, `description`, `image`, `tags` (array of `{ label: string }`).
*   **`TestimonialCard.svelte`**
    *   Purpose: Displays a single customer testimonial with a quote, photo, name, and company.
    *   Props (`$props`): Expects `statement`, `pfp`, `name`, `company`.

## Animations

*   **Motion Library:** Used in `NewPartners` via `import { animate, inView } from 'motion';` for scroll-triggered animations.
*   **Svelte Transitions:** Custom transitions like `fadeInUpTransition` imported from `$lib/utils/animations.js` and used with the `in:` directive.
*   **CSS Keyframes:** Used for:
    *   Marquee effects (`@keyframes scroll` in `NewTestimonials`). Logic for pausing included.
    *   Gradient loops (`@keyframes gradient-loop` in `NewTestimonials`).
    *   Other effects (`@keyframes pulse-shadow` in `NewHero`).

## Placeholders & Conventions

*   **SVG Rendering:** Placeholder SVG strings are sometimes stored in `$state` data and rendered using `{@html}` (see `NewProjectsSection`).
*   **TODOs:** Look for `// TODO:` comments indicating areas needing updates (e.g., replacing placeholder SVGs).
*   **Accessibility:** Attempts are made to include `alt` text, `aria-label`, `role`, etc., especially for complex elements like marquees. Lazy loading (`loading="lazy"`) is common for images.

This sheet should help maintain consistency when modifying existing components or creating new ones within this section of the project.
