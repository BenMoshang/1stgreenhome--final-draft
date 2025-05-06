import { inView, animate } from 'motion';

export interface ScaleOnViewOptions {
  /** initial scale for element */
  scaleFrom?: number;
  /** final scale for element */
  scaleTo?: number;
  /** animation duration in seconds */
  duration?: number;
  /** easing string or cubic-bezier array */
  easing?: string | [number, number, number, number];
  /** delay before starting animation */
  delay?: number;
  /** fraction of element visible to trigger */
  amount?: number;
}

export function scaleOnView(node: HTMLElement, opts: ScaleOnViewOptions = {}) {
  const {
    scaleFrom = 0.8,
    scaleTo = 1,
    duration = 0.5,
    easing = 'ease-out',
    delay = 0,
    amount = 0.1
  } = opts;

  // set initial state
  node.style.opacity = '0';
  node.style.transform = `scale(${scaleFrom})`;
  node.style.willChange = 'transform, opacity';

  // observe when in view
  const stop = inView(
    node,
    () => {
      (animate as any)(
        node,
        { scale: [scaleFrom, scaleTo], opacity: [0, 1] },
        { delay, duration, easing }
      );
    },
    { amount }
  );

  return {
    destroy() {
      stop();
      node.style.opacity = '';
      node.style.transform = '';
      node.style.willChange = '';
    }
  };
}
