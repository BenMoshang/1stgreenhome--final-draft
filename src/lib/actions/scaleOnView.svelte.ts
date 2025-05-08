import { animate, inView } from 'motion';
import type { DOMKeyframesDefinition, AnimationOptions } from 'motion';

export interface ScaleOnViewOptions {
  /** initial scale (before animation) */
  scaleFrom?: number;
  /** final scale (after animation) */
  scaleTo?: number;
  /** animation duration in seconds */
  duration?: number;
  /** easing string or cubic-bezier array */
  easing?: string | [number, number, number, number] | ((v: number) => number);
  /** delay before starting animation */
  delay?: number;
  /** respect reduced-motion preference */
  respectReducedMotion?: boolean;
  /** Fraction (0–1) of element visible to trigger */
  amount?: number;
  /** will change properties to optimize animation */
  willChange?: boolean;
}

export function scaleOnView(
  node: HTMLElement,
  opts: ScaleOnViewOptions = {}
) {
  const {
    scaleFrom = 0.9,
    scaleTo = 1,
    duration = 0.8,
    easing = [0.19, 1, 0.22, 1] as [number, number, number, number],
    delay = 0,
    respectReducedMotion = true,
    amount = 0.2,
    willChange = true
  } = opts;

  const prefersReducedMotion =
    respectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set initial state
  node.style.opacity = '0';
  node.style.transform = `scale(${scaleFrom})`;

  if (willChange) {
    node.style.willChange = 'transform, opacity';
  }

  // Set up inView observer - making sure it's synchronous to avoid TypeScript errors
  const stopObserver = inView(
    node,
    (entry) => {
      // Synchronous callback for TypeScript compatibility
      node.style.opacity = '1';
      
      // Use an IIFE to handle async operations if needed
      (async () => {
        if (prefersReducedMotion) {
          // Minimal motion for reduced-motion users
          animate(
            node,
            {
              scale: scaleTo,
              opacity: 1
            } as DOMKeyframesDefinition,
            { duration: 0.01 } as AnimationOptions
          );
        } else {
          // Scale-up animation
          const keyframes: DOMKeyframesDefinition = {
            scale: [scaleFrom, scaleTo],
            opacity: [0, 1]
          };
          
          animate(
            node,
            keyframes,
            {
              delay,
              duration,
              easing,
            } as AnimationOptions
          );
        }
      })();
    },
    { amount }
  );

  return {
    update(newOpts: ScaleOnViewOptions) {
      // Update options if needed during lifecycle
      Object.assign(opts, newOpts);
    },
    destroy() {
      // Stop watching with IntersectionObserver
      stopObserver();
      
      // Reset inline styles
      node.style.opacity = '';
      node.style.transform = '';
      if (willChange) {
        node.style.willChange = '';
      }
    },
  };
}
