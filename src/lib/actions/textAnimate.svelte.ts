import { animate, stagger } from '@motionone/dom';

export interface TextAnimateOptions {
  /** seconds between each letter’s start */
  delay?: number;
  /** total duration of each letter’s animation */
  duration?: number;
  /** any valid easing string */
  easing?: string;
}

/**
 * Action to split an element’s text into spans and animate them.
 * @param node   The DOM element whose text you want to animate
 * @param opts   Configuration overrides
 */
export function textAnimate(node: HTMLElement, opts: TextAnimateOptions = {}) {
  const { delay = 0.05, duration = 0.5, easing = 'ease-out' } = opts;

  // Grab the raw text, then clear the node
  const original = node.textContent ?? '';
  node.textContent = '';

  // Wrap every character in a span so we can animate individually
  const letters = Array.from(original).map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    // Initial (hidden & shifted) state
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    node.append(span);
    return span;
  });

  // Fire off the staggered motion
  animate(letters, { opacity: [0, 1], y: [20, 0] }, {
    delay: stagger(delay),
    duration,
    easing,
  } as any);

  return {
    update(newOpts: TextAnimateOptions) {
      // You could re-run or tweak the animation here if needed
      // For this use case, re-creating the element is simpler
    },
    destroy() {
      // Clear the spans created by the action
      node.textContent = original;
    },
  };
}
