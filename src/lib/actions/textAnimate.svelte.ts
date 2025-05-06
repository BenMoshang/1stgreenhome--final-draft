import { animate, inView, stagger } from '@motionone/dom';

export interface TextAnimateOptions {
  /** seconds between each letter's start */
  delay?: number;
  /** total duration of each letter's animation */
  duration?: number;
  /** any valid easing string */
  easing?: string;
  /** animation start position Y offset in pixels */
  startY?: number;
  /** respect user's reduced motion preference */
  respectReducedMotion?: boolean;
}

/**
 * Svelte action that splits text into spans and animates letters
 * only when the element enters the viewport.
 */
export function textAnimate(node: HTMLElement, opts: TextAnimateOptions = {}) {
  const { 
    delay = 0.05, 
    duration = 0.5, 
    easing = 'ease-out',
    startY = 20,
    respectReducedMotion = true
  } = opts;
  
  const original = node.textContent ?? '';
  let cleanup: (() => void) | undefined;

  // Check if user prefers reduced motion
  const prefersReducedMotion = respectReducedMotion && 
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function runAnimation() {
    const text = node.textContent ?? '';
    node.textContent = '';
    
    // If reduced motion is preferred, just show the text without animation
    if (prefersReducedMotion) {
      node.textContent = text;
      return;
    }
    
    const letters = Array.from(text).map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = `translateY(${startY}px)`;
      span.style.willChange = 'opacity, transform';
      node.append(span);
      return span;
    });
    
    animate(
      letters,
      { opacity: [0, 1], y: [startY, 0] },
      {
        delay: stagger(delay),
        duration,
        easing,
      }
    );
  }

  cleanup = inView(node, () => {
    runAnimation();
    return () => {}; // Only run once
  }, { amount: 0.1 });

  return {
    update(newOpts: TextAnimateOptions) {
      Object.assign(opts, newOpts);
    },
    destroy() {
      cleanup?.();
      node.textContent = original;
    },
  };
}
