import type { AnimationOptions, DOMKeyframesDefinition } from 'motion';
import { animate, inView, stagger } from 'motion';

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
    duration = .5,
    easing = 'ease-out',
    startY = 20,
    respectReducedMotion = true
  } = opts;

  const original = node.textContent ?? '';
  let cleanup: (() => void) | undefined;
  let animationControls: ReturnType<typeof animate> | undefined;
  let hasAnimated = false;
  let letters: HTMLElement[] = [];

  // Check if user prefers reduced motion once at initialization
  const prefersReducedMotion = respectReducedMotion &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function runAnimation() {
    // Prevent multiple executions
    if (hasAnimated) return;
    hasAnimated = true;

    const text = node.textContent ?? '';
    node.textContent = '';

    // If reduced motion is preferred, just show the text without animation
    if (prefersReducedMotion) {
      node.textContent = text;
      return;
    }

    letters = Array.from(text).map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = `translateY(${startY}px)`;
      span.style.willChange = 'opacity, transform';
      node.append(span);
      return span;
    });

    const keyframes: DOMKeyframesDefinition = {
      opacity: [0, 1],
      y: [startY, 0]
    };

    animationControls = animate(
      letters,
      keyframes,
      {
        delay: stagger(delay),
        duration,
        easing,
        onfinish: () => {
          // Clean up willChange after animation completes
          letters.forEach((span) => {
            span.style.willChange = '';
          });
        }
      } as AnimationOptions
    );
  }

  cleanup = inView(node, () => {
    runAnimation();
    return () => {}; // Only run once
  }, { amount: 0.1 });

  return {
    update(newOpts: TextAnimateOptions) {
      // Merge options without mutating original opts
      Object.assign(opts, newOpts);
    },
    destroy() {
      // Cancel animation if running
      animationControls?.cancel();

      // Clean up inView observer
      cleanup?.();

      // Clean up all span styles
      letters.forEach((span) => {
        span.style.display = '';
        span.style.opacity = '';
        span.style.transform = '';
        span.style.willChange = '';
      });

      // Restore original text content
      node.textContent = original;
    },
  };
}
