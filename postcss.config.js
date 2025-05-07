// postcss.config.js
// This file is needed if other tools (like Stylelint with postcss-html,
// or svelte-preprocess if you explicitly pass PostCSS plugins there)
// rely on postcss-load-config.

// Make sure postcss-html is installed if you use it: npm i -D postcss-html
// It's already in your package.json from previous context.

export default {
  // The syntax key helps PostCSS understand special file types like .svelte
  // This is primarily for tools that might parse CSS within these files using PostCSS.
  syntax: 'postcss-html', // For parsing CSS in <style> tags of .svelte and .html files

  plugins: [
    // Add any other PostCSS plugins here ONLY IF:
    // 1. Their functionality is NOT covered by LightningCSS.
    // 2. They are essential for your workflow (e.g., specific linters, niche transformations).
    //
    // 'postcss-preset-env' is NOT needed here if LightningCSS is active in vite.config.js
    // '@fullhuman/postcss-purgecss' is also likely not needed if LightningCSS or Svelte/Vite handle optimization.
  ],
};