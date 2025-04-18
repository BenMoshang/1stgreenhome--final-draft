# Design System - Usage Quick List
# [UPDATED April 18, 2025]

Core classes and mixins for applying the design system:

**Layout:**

* Containers: `.container__[xs|sm|md|lg|xl]`
* Sections: `.section__[xs|sm|md|lg|xl]`
* Grid: `.grid`, `.grid--[xs|sm|md|lg|xl|2xl]`, `.col__[1-9]`, `.row__[1-9]`
* Flex (Mixin): `@include flex-row($gap)` / `@include flex-col($gap)`, `@include inline-flex-row($gap)` / `@include inline-flex-col($gap)`
* Stack: `.stack`, `.stack__layer`, `.stack__layer--[float|above|below]`

**Typography:**

* Text Styles: `.display-[1-2]`, `.title-[a-c]`, `.heading`, `.subheading`, `.body`, `.callout`, `.label`, `.caption`, `.overline`
* Bold Modifier: `.--bold`

**Color:**

* Text: `.text--[semantic]`, `.text--surface`
* Background (w/ text): `.bg--[semantic]`, `.bg--surface`
* Container BG: `.bg--[semantic]-container`
* CSS Variables: `var(--primary)`, `var(--on-surface)`, etc.

**Spacing (Mixins):**

* Margin: `@include m-[direction]__[$size]`
* Padding: `@include p-[direction]__[$size]`
* Sizing: `@include size($property, $key)`

**Components:**

* Button: `.button`, `.button--[fill|outline|start-icon|end-icon|large]` (Requires inner `.button__content`, `.button__icon`, `.state`)
* Card: `.card`, `.card--[display-1|title-a|...]` (Auto-padding or explicit. Requires inner `.state` for interaction)

**Appearance:**

* Shadows (Mixin/Extend): `@include apply-shadow($size)` / `%shadow__[xs-2xl]`
* Shadows (CSS): `var(--shadow-[xs-2xl])`

**State Layer (for interactions):**

* Add `<span class="state"></span>` inside interactive elements.

**Best Practices:**

* Always nest `.state` as last child in interactive elements for feedback
* Use container/grid/section classes for responsive layouts
* Use semantic color classes for adaptive theming

Synced with latest `@styles` changes: new/updated classes, mixins, and variables for Oklch, layout, sizing, state, and components.
