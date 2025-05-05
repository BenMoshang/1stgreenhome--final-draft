export default {
  plugins: {
    'postcss-preset-env': {
      // You can configure preset-env options here if needed
      // Example: stage 3 features + specific browsers
      // stage: 3,
      // browsers: 'last 2 versions'
    },
    // Add PurgeCSS only for production builds
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './src/**/*.svelte',
              './src/app.html', // Include your main HTML file
              // Add any other file types that contain CSS class names (e.g., JS files if you dynamically add classes)
            ],
            // Add any selectors that are added dynamically and should not be purged
            safelist: {
              standard: [/^(svelte-|dark|light)/], // Keep svelte classes, dark/light themes
              // deep: [/regex_for_deep_selectors/],
              // greedy: [/regex_for_greedy_selectors/],
            },
            defaultExtractor: (content) =>
              content.match(/[^\s"'>`]+(?<!:)/g) || [],
          },
        }
      : {}),
  },
};
