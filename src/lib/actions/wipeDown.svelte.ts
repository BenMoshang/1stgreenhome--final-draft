import type { AnimationOptions, DOMKeyframesDefinition } from 'motion';
import { animate, inView, stagger } from 'motion';
import SplitType from 'split-type';

export interface WipeDownOptions {
  /** initial upward offset for text float step */
  yFrom?: number | string;
  /** animation duration in seconds */
  duration?: number;
  /** easing string or cubic-bezier array */
  easing?: string | [number, number, number, number] | ((v: number) => number);
  /** delay before starting animation */
  delay?: number;
  /** seconds between each line's start */
  staggerDelay?: number;
  /** respect reduced-motion preference */
  respectReducedMotion?: boolean;
  /** Fraction (0–1) of element visible to trigger */
  amount?: number;
  /** will change properties to optimize animation */
  willChange?: boolean;
}

export function wipeDown(
  node: HTMLElement,
  opts: WipeDownOptions = {}
) {
  const {
    yFrom = '0.5em',
    duration = .5,
    easing = [0.19, 1, 0.22, 1] as [number, number, number, number],
    delay = 0,
    staggerDelay = 0.08,
    respectReducedMotion = true,
    amount = 0.5,
    willChange = true
  } = opts;

  const prefersReducedMotion =
    respectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hide the node until it comes into view
  node.style.opacity = '0';

  // Will hold our revert function from SplitType
  let cleanupSplit: (() => void) | null = null;
  let animationControls: ReturnType<typeof animate> | undefined;
  let hasAnimated = false;
  let lines: HTMLElement[] = [];
  let parentElements: HTMLElement[] = [];

  // Set up inView observer
  const stopObserver = inView(
    node,
    () => {
      // Prevent multiple executions
      if (hasAnimated) return;
      hasAnimated = true;

      // Element is in view: reveal it
      node.style.opacity = '1';

      try {
        // Split the text into lines
        const split = new SplitType(node, { types: 'lines' });
        const splitLines = split.lines;

        // When leaving view or destroying, revert the split
        cleanupSplit = () => split.revert();

        if (!splitLines || splitLines.length === 0) {
          // No lines found, just show the content
          return;
        }

        lines = Array.from(splitLines);
        parentElements = [];

        lines.forEach((line) => {
          const parent = line.parentElement as HTMLElement;
          if (parent) {
            parent.style.overflow = 'hidden';
            parentElements.push(parent);
          }
          line.style.display = 'inline-block';
          line.style.opacity = '0';
          line.style.transform = `translateY(${yFrom})`;
          if (willChange) {
            line.style.willChange = 'transform, opacity';
          }
        });

        if (prefersReducedMotion) {
          // Minimal motion for reduced-motion users
          animationControls = animate(
            lines,
            {
              clipPath: ['inset(0 0 0 0)'],
              y: 0,
              opacity: 1
            } as DOMKeyframesDefinition,
            {
              duration: 0.01,
              onfinish: () => {
                // Clean up willChange after animation completes
                if (willChange) {
                  lines.forEach((line) => {
                    line.style.willChange = '';
                  });
                }
              }
            } as AnimationOptions
          );
        } else {
          // Staggered wipe-down animation
          const keyframes: DOMKeyframesDefinition = {
            clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
            opacity: [0, 1],
            y: [yFrom, '0px'],
          };
          animationControls = animate(
            lines,
            keyframes,
            {
              delay: stagger(staggerDelay, { startDelay: delay }),
              duration,
              easing,
              onfinish: () => {
                // Clean up willChange after animation completes
                if (willChange) {
                  lines.forEach((line) => {
                    line.style.willChange = '';
                  });
                }
              }
            } as AnimationOptions
          );
        }
      } catch (error) {
        // Error handling for SplitType failures
        console.warn('wipeDown: SplitType failed, showing content without animation', error);
        node.style.opacity = '1';
      }
    },
    { amount }
  );

  return {
    destroy() {
      // Cancel animation if running
      animationControls?.cancel();

      // Stop watching with IntersectionObserver
      stopObserver();

      // Clean up all inline styles from lines
      lines.forEach((line) => {
        line.style.display = '';
        line.style.opacity = '';
        line.style.transform = '';
        line.style.willChange = '';
      });

      // Clean up parent overflow styles
      parentElements.forEach((parent) => {
        parent.style.overflow = '';
      });

      // Revert the SplitType modifications if applied
      if (cleanupSplit) {
        try {
          cleanupSplit();
        } catch (error) {
          console.warn('wipeDown: Error during SplitType cleanup', error);
        }
      }

      // Reset inline opacity if you need to reuse the node
      node.style.opacity = '';
    },
  };
}
