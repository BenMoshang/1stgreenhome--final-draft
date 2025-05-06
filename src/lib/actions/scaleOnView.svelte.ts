import { animate } from '@motionone/dom';

export interface ScaleOnViewOptions {
  /** starting scale value */
  scaleFrom?: number;
  /** animation duration in seconds */
  duration?: number;
  /** delay before animation in seconds */
  delay?: number;
  /** easing string or cubic-bezier array */
  easing?: string | [number, number, number, number] | ((v: number) => number);
  /** respect prefers-reduced-motion media query */
  respectReducedMotion?: boolean;
  /** IntersectionObserver threshold(s) */
  threshold?: number | number[];
  /** whether to run animation only once */
  once?: boolean;
}

/**
 * Action to scale an element from a given scale to normal (1) when scrolled into view.
 */
export function scaleOnView(node: HTMLElement, opts: ScaleOnViewOptions = {}) {
  const {
    scaleFrom = 1.2,
    duration = 0.8,
    delay = 0,
    easing = 'ease-out',
    respectReducedMotion = true,
    threshold = 0.1,
    once = true,
  } = opts;

  const prefersReducedMotion =
    respectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set initial scale
  node.style.transform = `scale(${scaleFrom})`;
  node.style.transformOrigin = 'center';

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && (!once || !hasAnimated)) {
        hasAnimated = true;
        if (prefersReducedMotion) {
          node.style.transform = 'scale(1)';
        } else {
          animate(
            node,
            { scale: [scaleFrom, 1] },
            { delay, duration, easing } as any
          );
        }
        if (once) observer.disconnect();
      }
    },
    { threshold }
  );

  observer.observe(node);

  return {
    update(newOpts: ScaleOnViewOptions) {
      // Optionally handle dynamic updates here
    },
    destroy() {
      observer.disconnect();
    },
  };
}
