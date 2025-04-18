# Svelte library

Everything you need to build a Svelte library, powered by [`sv`](https://npmjs.com/package/sv).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```

# Enhanced Scroll Animation

This project uses Lenis for smooth scrolling with enhanced motion design principles.

## Using Scroll-Linked Animations

### Basic Fade-In Animation

Add the `data-scroll="fade-in"` attribute to any element you want to fade in when it enters the viewport:

```html
<div data-scroll="fade-in">This content will fade in when scrolled into view</div>
```

### Fade-Up Animation

Add the `data-scroll="fade-up"` attribute to elements you want to fade in and slide up:

```html
<div data-scroll="fade-up">This content will fade in and slide up when scrolled into view</div>
```

### Parallax Effect

Add the `data-parallax` attribute with a speed value to create parallax effects:

```html
<div data-parallax="0.1">This content will move at 0.1x scroll speed</div>
```

Lower values (like 0.1) create subtle effects, while higher values (0.5+) create more dramatic parallax.

### Progress-Based Animations

Add the `data-sticky-progress` attribute to elements that should respond to overall scroll progress:

```html
<progress data-sticky-progress value="0" max="100"></progress>
```

## Accessibility

The system automatically respects user preferences for reduced motion by:

- Disabling smooth scrolling
- Removing transitions/animations
- Ensuring content is immediately visible

## Programmatic Scrolling

You can scroll to elements programmatically using the `scrollTo` utility:

```ts
import { scrollTo } from '$lib/utils/scrollUtils';

// Scroll to element with options
scrollTo('#target-element', {
	offset: 50, // Offset in pixels
	duration: 1.5, // Duration in seconds
	immediate: false // Whether to skip animation
});
```
