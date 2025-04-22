# Utility Classes

Below is a categorized list of all single‑purpose (utility) CSS classes defined under `src/lib/styles`.

---

## Spacing

### Margin utilities

Pattern: .m‑{direction}\_\_{size}

- **Directions:** `top`, `right`, `bottom`, `left`, `block`, `inline`
- **Sizes:** `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### Padding utilities

Pattern: .p‑{direction}\_\_{size}

- **Directions:** `top`, `right`, `bottom`, `left`, `block`, `inline`
- **Sizes:** `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### Gap utilities

.gap**{size} .gap‑column**{size} .gap‑row\_\_{size}

- **Sizes:** `none`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

---

## Typography

- `.u_display-1`
- `.u_display-1--bold`
- `.u_display-2`
- `.u_display-2--bold`
- `.u_title-a`
- `.u_title-a--bold`
- `.u_title-b`
- `.u_title-c`
- `.u_heading`
- `.u_heading--bold`
- `.u_subheading`
- `.u_paragraph`
- `.u_callout`
- `.u_label`
- `.u_label--bold`
- `.u_caption`
- `.u_overline`

---

## Color utilities

### Text colors

Pattern: .text--{semantic} .text--on-{semantic} .text--on-{semantic}-container

- **Semantic tokens:** `primary`, `secondary`, `tertiary`, `neutral`, `error`, `warning`, `info`, `success`

### Backgrounds

Pattern: .bg--{semantic} .bg--on-{semantic} .bg--on-{semantic}-container- **Semantic tokens:** `primary`, `secondary`, `tertiary`, `neutral`, `error`, `warning`, `info`, `success`

### Surface

- `.text--surface`
- `.bg--surface`

---

## State overlay

- `.state`

---

## Layout utilities

### Containers

- `.container`
- `.container__xs`
- `.container__sm`
- `.container__md`
- `.container__lg`
- `.container__xl`

### Grid utilities

- `.grid`
- Pattern: `.grid-cols-{n}`, `.grid-rows-{n}` (n = 1…9)
- Pattern: `.{breakpoint}\:grid-cols-{n}`, `.{breakpoint}\:grid-rows-{n}` (breakpoints: `mobile-end`, `tablet-start`, `tablet-end`, `desktop-start`; n = 1…9)

### Stack utilities

- `.stack`
- `.stack__layer`
- `.stack__layer--float`
- `.stack__layer--above`
- `.stack__layer--below`

---

## Sizing utilities

- Pattern: `.w-{key}`, `.h-{key}` (keys: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`)
