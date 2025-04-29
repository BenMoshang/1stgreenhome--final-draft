import { scroll, transform } from 'motion';

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
  const offset = params.offset ?? 150;

  const unsubscribe = scroll(
    (progress: number) => { 
      // Map scroll progress [0, 1] to translateY [0px, -offset px]
      // Ensure progress is within [0, 1] bounds
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const yValue = transform(clampedProgress, [0, 1], ['0px', `-${offset}px`]);
      node.style.transform = `translateY(${yValue})`;
    },
    {
      // Default target is the viewport, which is usually what's needed for parallax
    }
  );

  // Set will-change for performance
  node.style.willChange = 'transform';

  return {
    destroy() {
      // Stop listening to scroll events and clean up styles
      unsubscribe();
      node.style.willChange = 'auto';
      node.style.transform = ''; // Reset transform on destroy
    },
    // Optional: Add an update method if parameters need to be reactive
    // update(newParams: ParallaxParams) {
    //   offset = newParams.offset ?? 150;
    //   // Note: Re-calculating inside the scroll handler might be needed if offset changes live
    // }
  };
}
