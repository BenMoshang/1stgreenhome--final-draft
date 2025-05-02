import { scroll } from '@motionone/dom';
import type { ScrollInfo } from '@motionone/dom';
import { transform } from 'motion';

interface ParallaxRevealParams {
  /** Percentage from the bottom of the scroll area where the reveal starts (0 to 1). Default: 0.1 (last 10%) */
  threshold?: number;
  /** The initial vertical offset when hidden (CSS value). Default: '50%' */
  startOffset?: string;
}

/**
 * Reveals an element by translating it vertically and fading it in
 * only when the user scrolls close to the bottom of the page.
 * Assumes the element is positioned sticky or fixed at the bottom.
 *
 * @param node The HTML element to apply the effect to.
 * @param params Optional parameters.
 */
export function parallaxReveal(
  node: HTMLElement,
  params: ParallaxRevealParams = {}
) {
  const threshold = params.threshold ?? 0.1;
  const startOffset = params.startOffset ?? '50%'; // Start halfway down for a smoother reveal

  // Initial hidden state
  node.style.transform = `translateY(${startOffset})`;
  node.style.opacity = '0';
  node.style.willChange = 'transform, opacity';

  const unsubscribe = scroll(
    (info: ScrollInfo) => {
      // y.progress is the overall scroll progress [0, 1]
      const progress = info.y.progress;

      // Define the scroll progress range for the reveal animation
      const startRevealProgress = 1 - threshold; // e.g., 0.9 for threshold 0.1
      const endRevealProgress = 1;

      // Map the overall progress to the reveal progress [0, 1]
      // Values < startRevealProgress map to 0, values >= endRevealProgress map to 1
      const revealProgress = transform(
        progress,
        [startRevealProgress, endRevealProgress],
        [0, 1]
      );
      // Clamp the result strictly between 0 and 1
      const clampedRevealProgress = Math.max(0, Math.min(1, revealProgress));

      // Map the clamped reveal progress [0, 1] to translateY [startOffset, 0%]
      const yValue = transform(
        clampedRevealProgress,
        [0, 1],
        [startOffset, '0%']
      );

      // Map the clamped reveal progress [0, 1] to opacity [0, 1]
      const opacityValue = transform(clampedRevealProgress, [0, 1], [0, 1]);

      // Apply the styles directly
      node.style.transform = `translateY(${yValue})`;
      node.style.opacity = `${opacityValue}`;
    },
    {
      // Default target (document) is usually correct
    }
  );

  return {
    destroy() {
      unsubscribe();
      node.style.willChange = 'auto';
      node.style.transform = ''; // Reset transform
      node.style.opacity = ''; // Reset opacity
    },
    // update(newParams: ParallaxRevealParams) { ... } // Optional: Add if params need reactivity
  };
}
