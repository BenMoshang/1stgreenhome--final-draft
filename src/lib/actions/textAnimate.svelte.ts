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
 * Svelte action that splits text into spans and animates letters
 * only when the element enters the viewport.
 */
export function textAnimate(node: HTMLElement, opts: TextAnimateOptions = {}) {
  const { delay = 0.05, duration = 0.5, easing = 'ease-out' } = opts;
  const original = node.textContent ?? '';
  let observer: IntersectionObserver;

  function runAnimation() {
    const text = node.textContent ?? '';
    node.textContent = '';
    const letters = Array.from(text).map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      node.append(span);
      return span;
    });
    animate(
      letters,
      { opacity: [0, 1], y: [20, 0] },
      {
        delay: stagger(delay),
        duration,
        easing,
      } as any
    );
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(node);

  return {
    update(newOpts: TextAnimateOptions) {
      // You could reconfigure animation parameters here if needed
    },
    destroy() {
      observer.disconnect();
      node.textContent = original;
    },
  };
}
