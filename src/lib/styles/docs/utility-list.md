# Utility Classes

Below is a categorized list of all single‑purpose (utility) CSS classes defined under `src/lib/styles`.

---

## Spacing System (Centralized)

All spacing utilities are now based on a centralized scale linked to typography metrics (line-height). Spacing sizes use CSS custom properties (e.g., `--spacing-sm`) defined in `_variables.scss`. This ensures consistent, accessible, and proportional spacing throughout the project.

**Spacing Sizes:**
- `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

**Formula:**
- Small sizes: `--spacing-{size}: 1em * $line-height * globals.$MINOR-{factor}`
- Larger sizes: `--spacing-{size}: $line-height * globals.size('{size}')`

### Margin Utilities

Pattern: `.u_m-{direction}__{size}`
- **Directions:** `top`, `right`, `bottom`, `left`, `block`, `inline`
- **Sizes:** as above
- Example: `.u_m-top__sm`, `.u_m-inline__lg`

### Padding Utilities

Pattern: `.u_p-{direction}__{size}`
- **Directions:** `top`, `right`, `bottom`, `left`, `block`, `inline`
- **Sizes:** as above
- Example: `.u_p-block__md`, `.u_p-bottom__xs`

### Gap Utilities

Pattern: `.u_gap__{size}`, `.u_gap-column__{size}`, `.u_gap-row__{size}`
- **Sizes:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Example: `.u_gap__md`, `.u_gap-row__lg`
- All gap utilities use the centralized spacing scale. Old gap class names are still supported for backward compatibility.

### Section Padding Utilities

Pattern: `.u_section__{size}`
- **Sizes:** `xs`, `sm`, `md`, `lg`, `xl`
- Responsive: These classes adjust their padding at larger breakpoints.
- Example: `.u_section__md`

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

Pattern: `.text--{semantic}`, `.text--on-{semantic}`, `.text--on-{semantic}-container`
- **Semantic tokens:** `primary`, `secondary`, `tertiary`, `neutral`, `error`, `warning`, `info`, `success`

### Backgrounds

Pattern: `.bg--{semantic}`, `.bg--on-{semantic}`, `.bg--on-{semantic}-container`
- **Semantic tokens:** as above

### Surface

- `.text--surface`
- `.bg--surface`

---

## State overlay

- `.state`

---

## Layout utilities

### Containers

- `.u_container`
- `.u_container__xs`
- `.u_container__sm`
- `.u_container__md`
- `.u_container__lg`
- `.u_container__xl`

### Grid utilities

- `.grid`
- Pattern: `.grid-cols-{n}`, `.grid-rows-{n}` (n = 1…9)
- Pattern: `.{breakpoint}:grid-cols-{n}`, `.{breakpoint}:grid-rows-{n}` (breakpoints: `mobile-end`, `tablet-start`, `tablet-end`, `desktop-start`; n = 1…9)

### Stack utilities

- `.stack`
- `.stack__layer`
- `.stack__layer--float`
- `.stack__layer--above`
- `.stack__layer--below`

---

## Sizing utilities

Pattern: `.w-{key}`, `.h-{key}` (keys: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`)
