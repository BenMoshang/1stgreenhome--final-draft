import { animate, stagger } from '@motionone/dom';
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
  } = opts;

  const prefersReducedMotion =
    respectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const split = new SplitType(node, { types: 'lines' });
  const { lines } = split;

  if (lines) {
    lines.forEach((l) => {
      const parent = l.parentElement as HTMLElement;
      parent.style.overflow = 'hidden';
      l.style.display = 'inline-block';
      l.style.opacity = '0';
      l.style.transform = `translateY(${yFrom})`;
    });

    if (prefersReducedMotion) {
      animate(lines, { clipPath: ['inset(0 0 0 0)'], y: 0 }, { duration: 0.01 });
    } else {
      animate(
        lines,
        {
          clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
          opacity: [0, 1],
          y: [yFrom, '0px'],
        },
        { delay: stagger(staggerDelay, { start: delay }), duration, easing, times: [0, 0.6, 0.8] } as any
      );
    }
  }

  return {
    destroy() {
      split.revert();
    },
  };
}
