import { animate, stagger } from '@motionone/dom';
import SplitType from 'split-type';

export interface LineStaggerOptions {
  /** seconds between each line's start */
  delay?: number;
  /** total run-time of the whole key-frame sequence */
  duration?: number;
  /** easing for the clip reveal */
  easing?: string | [number, number, number, number] | ((v: number) => number);
  /** initial downward offset in px or em */
  yFrom?: string | number;
  /** tiny overshoot above baseline */
  yOvershoot?: string | number;
  /** respect user's reduced motion preference */
  respectReducedMotion?: boolean;
}

/**
 * Better Off-style line reveal:
 * 1. clip-path wipes each line up
 * 2.   while it moves from yFrom → 0 → −yOvershoot → 0
 */
export function lineStagger(node: HTMLElement, opts: LineStaggerOptions = {}) {
  const {
    delay = 0.08, // same cadence they use
    duration = 1, // a hair longer for the extra frames
    easing = [0.19, 1, 0.22, 1], // their easing curve in array format
    yFrom = '0.7em', // start slightly below
    yOvershoot = '-0.2em', // rise a touch above, then settle
    respectReducedMotion = true,
  } = opts;

  // Check for reduced motion preference
  const prefersReducedMotion =
    respectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1 — split into visual lines */
  const split = new SplitType(node, { types: 'lines' });
  const { lines } = split;

  if (lines) {
    lines.forEach(
      (l) => ((l.parentElement as HTMLElement).style.overflow = 'hidden')
    );

    /* 2 — key-frame animation (clip reveal + y-lift) */
    if (prefersReducedMotion) {
      // Simple reveal without animation for reduced motion
      animate(
        lines,
        { clipPath: ['inset(0 0 0 0)'], y: 0 },
        { duration: 0.01 }
      );
    } else {
      animate(
        lines,
        {
          clipPath: [
            'inset(100% 0 0 0)', // fully hidden
            'inset(0 0 0 0)',
          ], // revealed
          y: [yFrom, 0, yOvershoot, 0], // lift & settle
        },
        {
          delay: stagger(delay),
          duration,
          easing,
          times: [0, 0.6, 0.82, 1],
        } as any
      );
    }
  }

  /* 3 — clean up on unmount */
  return {
    destroy() {
      split.revert();
    },
  };
}
