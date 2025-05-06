import { animate, inView, stagger } from '@motionone/dom';
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
    duration = 2,
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

  // Set up inView observer
  const stopObserver = inView(
    node,
    () => {
      // Element is in view: reveal it
      node.style.opacity = '1';

      // Split the text into lines
      const split = new SplitType(node, { types: 'lines' });
      const { lines } = split;

      // When leaving view or destroying, revert the split
      cleanupSplit = () => split.revert();

      if (lines) {
        lines.forEach((line) => {
          const parent = line.parentElement as HTMLElement;
          parent.style.overflow = 'hidden';
          line.style.display = 'inline-block';
          line.style.opacity = '0';
          line.style.transform = `translateY(${yFrom})`;
          if (willChange) {
            line.style.willChange = 'transform, opacity';
          }
        });

        if (prefersReducedMotion) {
          // Minimal motion for reduced-motion users
          animate(
            lines,
            { clipPath: ['inset(0 0 0 0)'], y: 0, opacity: 1 },
            { duration: 0.01 }
          );
        } else {
          // Staggered wipe-down animation
          animate(
            lines,
            {
              clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
              opacity: [0, 1],
              y: [yFrom, '0px'],
            },
            {
              delay: stagger(staggerDelay, { start: delay }),
              duration,
              easing,
              times: [0, 0.6, 0.8],
            } as any
          );
        }
      }
    },
    { amount }
  );

  return {
    destroy() {
      // Stop watching with IntersectionObserver
      stopObserver();

      // Revert the SplitType modifications if applied
      if (cleanupSplit) cleanupSplit();

      // (Optional) reset inline opacity if you need to reuse the node
      node.style.opacity = '';
    },
  };
}
