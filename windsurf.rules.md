# Windsurf Rule: Applying the New Design System (`@styles`)

**Effective Date:** April 18, 2025

---

## Purpose
This rule defines the standard for applying and using the new SCSS-based design system (`@styles`) throughout this codebase, especially when updating legacy components and layouts.

---

## Rule: Always Apply the New Design System

**Whenever you create, update, or refactor any UI code (HTML, Svelte, CSS, or JS):**

1. **Use Only the New Classes and Mixins**
   - Use the semantic color, layout, spacing, and component classes/mixins from `@styles`.
   - Do **not** use deprecated or legacy style classes, variables, or mixins.

2. **Apply Semantic Color Utilities**
   - Use `.text--[semantic]`, `.bg--[semantic]`, and `.bg--[semantic]-container` for color.
   - Reference CSS custom properties (e.g., `var(--primary)`) only if a utility class is not sufficient.

3. **Follow Layout and Spacing Patterns**
   - Use `.container__*`, `.grid`, `.section__*`, and flex/grid mixins for structure.
   - Use margin/padding mixins for spacing (`@include m-*`, `@include p-*`).

4. **Component Updates**
   - Replace all legacy button, card, and similar classes with new `.button`, `.card`, and their modifiers.
   - Always include a `.state` element as the last child in interactive components for feedback.

5. **Typography**
   - Use the provided typography scale classes (`.display-1`, `.heading`, `.body`, etc.) for all text.

6. **No Inline Styles or Ad Hoc CSS**
   - Avoid inline `style="..."` except for dynamic/JS-calculated values that cannot be expressed in SCSS.
   - Prefer utility classes and mixins for all styling.

7. **Responsive and Themed Design**
   - Ensure all layouts and components are responsive by using the provided container, grid, and section classes.
   - Use semantic classes to ensure correct theming for both light and dark modes.

8. **Documentation and Examples**
   - Reference the updated documentation in `src/lib/styles/docs/` for correct usage patterns and examples.

---

## Example Migration

**Legacy Button:**
```html
<button class="btn-primary">Click Me</button>
```
**New System:**
```html
<button class="button button--fill">
  <span class="button__content">Click Me</span>
  <span class="state"></span>
</button>
```

---

## Enforcement
- All code reviews and automated migrations must check for compliance with this rule.
- Any new or updated UI code must use the new design system exclusively.
- Legacy styles should be removed as files are updated.

---

## Reference
- See `src/lib/styles/docs/Design-System.md`, `Quick-Access.md`, and `Quick-List.md` for details and usage patterns.
- For questions or edge cases, consult the design system documentation or maintainers.
