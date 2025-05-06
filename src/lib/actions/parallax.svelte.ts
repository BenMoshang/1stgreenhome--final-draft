import { scroll, transform } from 'motion'; // Revert imports

interface ParallaxParams {
  offset?: number; // Negative offset in pixels for translateY
}

/**
 * Applies a vertical parallax effect to an element on scroll.
 * @param node The HTML element to apply the effect to.
 * @param params Optional parameters.
 * @param params.offset The maximum negative vertical offset (in pixels) for the parallax effect. Defaults to 150.
 */
export function parallax(node: HTMLElement, params: ParallaxParams = {}) {
  let currentOffset = params.offset ?? 150;

  // Revert scroll handler signature to accept a number
  const handleScroll = (progress: number) => {
    // Map scroll progress [0, 1] to translateY [0, -offset]
    // Clamp progress to ensure it's within [0, 1]
    const clampedProgress = Math.max(0, Math.min(1, progress));
    // Use numbers for transform range
    const yValue = transform(clampedProgress, [0, 1], [0, -currentOffset]);

    // Apply the transform using px units
    node.style.transform = `translateY(${yValue}px)`;
  };

  // Pass the corrected handler to scroll
  const unsubscribe = scroll(handleScroll, {
    // Default target (viewport) and offset are likely fine
  });

  node.style.willChange = 'transform';

  return {
    destroy() {
      unsubscribe();
      node.style.willChange = 'auto';
      node.style.transform = '';
    },
    update(newParams: ParallaxParams) {
       currentOffset = newParams.offset ?? 150;
       // Force a recalculation on next scroll event
    }
  };
}
