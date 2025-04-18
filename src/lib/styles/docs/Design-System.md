# Design System Documentation

This document provides a comprehensive overview of the SCSS design system, its structure, core concepts, and how to use its various modules.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [File Structure](#file-structure)
- [Core Concepts](#core-concepts)
  - [Golden Ratio Scaling (`base/_globals.scss`)](#golden-ratio-scaling-base_globalsscss)
  - [Oklch Adaptive Color System (`appearance/_colors.scss`)](#oklch-adaptive-color-system-appearance_colorsscss)
  - [CSS Custom Properties (Variables)](#css-custom-properties-variables)
- [Module Breakdown](#module-breakdown)
  - [Base (`base/`)](#base-base)
  - [Layout (`layout/`)](#layout-layout)
  - [Spacing (`spacing/`)](#spacing-spacing)
  - [Typography (`typography/`)](#typography-typography)
  - [Appearance (`appearance/`)](#appearance-appearance)
  - [Sizing (`sizing/`)](#sizing-sizing)
  - [State/Interactivity (`state/`)](#stateinteractivity-state)
  - [Components (`components/`)](#components-components)
- [Usage Examples](#usage-examples)

## Introduction

This design system provides a foundational set of styles, components, and utilities built with SCSS. It emphasizes consistency, adaptability (light/dark modes), and a harmonious visual rhythm based on the Golden Ratio.

## File Structure

The system is organized into modules based on CSS properties or component types:

styles/├── main.scss               # Main entry point, imports all modules├── base/│   ├── _globals.scss       # Core variables (Golden Ratio, sizes), functions (round-to)│   └──_resets.scss        # CSS resets and base element styling├── layout/│   ├── _containers.scss    # Max-width container classes│   ├──_flex.scss          # Flexbox utility mixins (flex-row, flex-col, gap)│   ├── _grids.scss         # Grid layout classes│   ├──_sections.scss      # Section padding classes│   └── _stacks.scss        # Layering utility classes├── spacing/│   └──_margins.scss       # Margin and padding utility mixins (adjust-to, m-, p-)├── typography/│   └── _typography.scss    # Typographic scale classes (display-1, title-a, body, etc.)├── appearance/│   ├──_colors.scss        # Oklch adaptive color system (semantic colors, utilities)│   └── _shadows.scss       # Box shadow utility mixins/placeholders├── sizing/│   └──_scale.scss         # Generic sizing mixin based on global scale├── state/                  # (Note: Imported as 'interactivity' in main.scss)│   └── _state-layers.scss  # Hover/focus/active state overlay styles└── components/├──_buttons.scss       # Button component styles├── _cards.scss         # Card component styles└──_boxes.scss         # (Note: Referenced but not provided - likely contains h-box/v-box mixins)

*(Note: `main.scss` references `interactivity/state-layers` and `components/boxes`, but the provided files are `state/_state-layers.scss` and `components/_buttons.scss`/`_cards.scss`. Ensure file paths and names are consistent in your project.)*

## Core Concepts

### Golden Ratio Scaling (`base/_globals.scss`)

* **Foundation:** The system uses the Golden Ratio (Phi, ≈ 1.618) to establish harmonious relationships between sizes.
* **Variables:** Key variables like `$MAJOR`, `$MAJOR-HALF`, `$MINOR`, etc., represent proportions derived from Phi.
* **Size Scale:** A base size (`--size-md`, typically `1em`) is defined, and other sizes (`--size-xs`, `--size-lg`, etc.) are calculated as powers of Phi relative to this base. These are available as CSS Custom Properties.
* **Rounding:** The `round-to()` function ensures consistent decimal precision.

### Oklch Adaptive Color System (`appearance/_colors.scss`)

* **Modern Color Space:** Uses Oklch for more perceptually uniform and vibrant colors compared to HSL or RGB.
* **Seed Colors:** A few base `$semantic-seeds` (primary, secondary, error, etc.) and `$surface-seeds` (light/dark backgrounds) are defined.
* **Tonal Palettes:** For each seed, a tonal scale (e.g., 11 steps) is generated using `color-mix(in oklch, ...)`.
* **Adaptive Tokens:** Final CSS variables (e.g., `--primary`, `--on-primary`, `--surface`) use `light-dark()` to automatically switch between appropriate tones based on the user's preferred color scheme (light or dark mode).
* **Contrast:** `--on-<color>` variables (e.g., `--on-primary`) provide accessible text/icon colors for use *on* their corresponding background color. `--on-surface` uses `color-contrast()` for optimal text contrast against the general background.

### CSS Custom Properties (Variables)

* Extensive use of CSS Custom Properties (e.g., `--size-md`, `--primary`, `--shadow-sm`) allows for:
  * Easy theme customization.
  * Dynamic adjustments (e.g., in JavaScript).
  * Integration with the `light-dark()` mechanism.

## [UPDATED April 18, 2025]

**Changelog:**
- Synced documentation with the latest SCSS modules in `@styles`.
- Updated color system details for Oklch and semantic tokens.
- Clarified usage of new/updated flex, grid, section, and sizing mixins.
- Refined examples for cards, buttons, and state layers.

## Module Breakdown

- **Base (`base/`)**: Core variables, Golden Ratio scale, resets.
- **Layout (`layout/`)**: Containers, flex, grid, sections, stacks.
- **Spacing (`spacing/`)**: Margin/padding mixins for all sides and axes.
- **Typography (`typography/`)**: Typographic scale classes and bold modifiers.
- **Appearance (`appearance/`)**: Oklch color system, shadows, utility classes.
- **Sizing (`sizing/`)**: Generic size mixin for any property.
- **State (`state/`)**: `.state` overlay for interactive elements.
- **Components (`components/`)**: `.button`, `.card`, with scale and icon support.

### Appearance (`appearance/`)

* **`_colors.scss`:**
  - Uses Oklch for perceptual color harmony.
  - `$semantic-seeds` and `$surface-seeds` define color palette roots.
  - Generates tonal palettes for each seed (11 steps, odd number).
  - CSS custom properties (e.g., `--primary`, `--on-primary`, `--surface`) adapt to light/dark via `light-dark()`.
  - Utility classes: `.text--[semantic]`, `.bg--[semantic]`, `.bg--[semantic]-container`.
  - Example: `.bg--primary` sets background and text color for contrast.
* **`_shadows.scss`:**
  - CSS vars: `--shadow-xs` to `--shadow-2xl`.
  - Mixins: `@include apply-shadow(sm)`; placeholders: `%shadow__sm`.

### Sizing (`sizing/`)

* **`_scale.scss`:**
  - Mixin: `@include size($property, $key)` for any property.
  - Keys: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` (matches `--size-*` scale).

### State/Interactivity (`state/`)

* **`_state-layers.scss`:**
  - `.state` class for overlay feedback.
  - Use as last child in interactive elements (button, card, link, etc.).
  - Handles `:hover`, `:active`, `:focus-visible` with opacity transitions.

### Components (`components/`)

* **`_buttons.scss`:**
  - `.button`, `.button--fill`, `.button--outline`, `.button--start-icon`, `.button--end-icon`, `.button--large`.
  - `.button__content` for inline-flex content.
  - `.button__icon` for icon sizing.
  - Requires nested `.state` for feedback.
* **`_cards.scss`:**
  - `.card` with auto-padding based on largest text element (`:has()` selectors).
  - Explicit scale modifiers: `.card--display-1`, `.card--title-a`, `.card--body`, etc.
  - Requires nested `.state` for feedback.

## Usage Examples

```html
<button class="button button--fill">
  <span class="button__content">
    <span class="button__icon"></span>
    <span>Primary Button</span>
  </span>
  <span class="state"></span>
</button>
<!-- Outline, icon, and large variants also available -->

<div class="card card--heading">
  <h3 class="heading">Card Title</h3>
  <p class="body">Card content here.</p>
  <span class="state"></span>
</div>

<section class="section__md">
  <div class="container__md">
    <div class="grid grid--lg col__3">
      <div class="card"><p class="body">Item 1</p><span class="state"></span></div>
      <div class="card"><p class="body">Item 2</p><span class="state"></span></div>
      <div class="card"><p class="body">Item 3</p><span class="state"></span></div>
    </div>
  </div>
</section>

<h1 class="display-1">Main Page Title</h1>
<p class="body">This is standard body text.</p>
<p class="caption">A small caption below.</p>

<p class="text--primary">This text uses the primary color.</p>
<div class="bg--secondary-container">
  <p>This content is inside a secondary container background.</p>
</div>
