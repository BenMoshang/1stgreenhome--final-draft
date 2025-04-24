# Utility Classes

Below is a categorized list of all single-purpose (utility) CSS classes defined under `src/lib/styles`. Placeholders like `{direction}`, `{size}`, and `{semantic}` represent multiple generated classes.

---

## Spacing

### Margin and Padding

- `.u_m-{direction}__{size}`
- `.u_p-{direction}__{size}`
  • Directions: `top`, `right`, `bottom`, `left`, `block`, `inline`
  • Sizes: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### Gap

- `.u_gap__{size}`
- `.u_gap-column__{size}`
- `.u_gap-row__{size}`
  • Sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### Section Padding

- `.u_section__{size}`
  • Sizes: `xs`, `sm`, `md`, `lg`, `xl`

---

## Typography

- **Display**
  • `.u_display-1`
  • `.u_display-1--bold`
  • `.u_display-2`
  • `.u_display-2--bold`
- **Titles**
  • `.u_title-a`
  • `.u_title-a--bold`
  • `.u_title-b`
  • `.u_title-c`
- **Text**
  • `.u_heading`
  • `.u_heading--bold`
  • `.u_subheading`
  • `.u_paragraph`
  • `.u_callout`
- **Labels**
  • `.u_label`
  • `.u_label--bold`
  • `.u_caption`
  • `.u_overline`

---

## Color Utilities

### Text Colors

- `.text--{semantic}`
- `.text--on-{semantic}`
- `.text--on-{semantic}-container`
  • Semantic tokens: `primary`, `secondary`, `tertiary`, `neutral`, `error`, `warning`, `info`, `success`

### Background Colors

- `.bg--{semantic}`
- `.bg--{semantic}-container`
- `.bg--{semantic}-variant`
  • Semantic tokens: `primary`, `secondary`, `tertiary`, `neutral`, `error`, `warning`, `info`, `success`

### Surface and Background

- `.text--surface`
- `.bg--surface`
- `.bg--background`

### Typography Colors

- `.typography--primary`
- `.typography--secondary`
- `.typography--tertiary`

### Focus Ring

*(Note: These apply on `:focus-visible`)*

- `.focus-ring`
- `.focus-ring--primary`
- `.focus-ring--secondary`
- `.focus-ring--tertiary`

---

## State Overlay

*(Note: Used inside interactive elements, activated by `:hover`, `:active`, `:focus-visible`)*

- `.state`

---

## Layout Utilities

### Containers

- `.u_container`
- `.u_container__{xs|sm|md|lg|xl}`

### Grid

- `.grid`
- `.grid-cols-{1-9}`
- `.grid-rows-{1-9}`
- `.{breakpoint}:grid-cols-{1-9}`
- `.{breakpoint}:grid-rows-{1-9}`

---
