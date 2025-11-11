import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

export interface TextAnimateOptions {
  /** seconds between each letter's start */
  delay?: number;
  /** total duration of each letter's animation */
  duration?: number;
  /** any valid easing string or GSAP easing function */
  easing?: string | gsap.EaseFunction;
  /** animation start position Y offset in pixels */
  startY?: number;
  /** respect user's reduced motion preference */
  respectReducedMotion?: boolean;
  /** Fraction (0–1) of element visible to trigger */
  amount?: number;
  /** Enable GPU acceleration */
  force3D?: boolean;
  /** Rotation angle for more dynamic effect */
  rotation?: number;
  /** Scale factor for more dynamic effect */
  scale?: number;
}

/**
 * Svelte action that splits text into spans and animates letters
 * only when the element enters the viewport using GSAP.
 * Optimized for text-wrapping scenarios.
 */
export function textAnimate(node: HTMLElement, opts: TextAnimateOptions = {}) {
  const {
    delay = 0.05,
    duration = 0.5,
    easing = 'power3.out',
    startY = 20,
    respectReducedMotion = true,
    amount = 0.1,
    force3D = true,
    rotation = 0,
    scale = 1
  } = opts;

  const original = node.textContent ?? '';
  let splitInstance: SplitText | null = null;
  let scrollTriggerInstance: ScrollTrigger | null = null;
  let animationTimeline: gsap.core.Timeline | null = null;
  let hasAnimated = false;

  // Check if user prefers reduced motion once at initialization
  const prefersReducedMotion = respectReducedMotion &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function runAnimation() {
    // Prevent multiple executions
    if (hasAnimated) return;
    hasAnimated = true;

    const text = node.textContent ?? '';
    if (!text.trim()) return;

    // If reduced motion is preferred, just show the text without animation
    if (prefersReducedMotion) {
      node.style.opacity = '1';
      return;
    }

    try {
      // Split text into characters - SplitText handles text-wrapping automatically
      splitInstance = new SplitText(node, {
        type: 'chars',
        charsClass: 'char-animate',
        tag: 'span'
      });

      const chars = splitInstance.chars;
      if (!chars || chars.length === 0) {
        node.style.opacity = '1';
        return;
      }

      // Set initial state with GPU acceleration
      gsap.set(chars, {
        opacity: 0,
        y: startY,
        rotation: rotation,
        scale: scale,
        force3D: force3D,
        willChange: 'transform, opacity'
      });

      // Create animation timeline
      animationTimeline = gsap.timeline({
        onComplete: () => {
          // Clean up willChange after animation completes
          if (chars) {
            gsap.set(chars, { willChange: 'auto' });
          }
        }
      });

      // Animate characters with stagger
      animationTimeline.to(chars, {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: duration,
        ease: easing,
        stagger: delay,
        force3D: force3D
      });

    } catch (error) {
      console.warn('textAnimate: SplitText failed, showing content without animation', error);
      node.style.opacity = '1';
    }
  }

  // Set initial opacity
  node.style.opacity = '0';

  // Create ScrollTrigger for viewport detection
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: node,
    start: `top ${(1 - amount) * 100}%`,
    once: true, // Only trigger once
    onEnter: () => {
      node.style.opacity = '1';
      runAnimation();
    },
    onEnterBack: () => {
      // If scrolled back up, show immediately
      node.style.opacity = '1';
      if (!hasAnimated) {
        runAnimation();
      }
    }
  });

  return {
    update(newOpts: TextAnimateOptions) {
      // Merge options
      Object.assign(opts, newOpts);

      // If animation hasn't run yet, we can update ScrollTrigger
      if (!hasAnimated && scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: node,
          start: `top ${(1 - (newOpts.amount ?? amount)) * 100}%`,
          once: true,
          onEnter: () => {
            node.style.opacity = '1';
            runAnimation();
          },
          onEnterBack: () => {
            node.style.opacity = '1';
            if (!hasAnimated) {
              runAnimation();
            }
          }
        });
      }
    },
    destroy() {
      // Kill animation timeline
      animationTimeline?.kill();

      // Kill ScrollTrigger
      scrollTriggerInstance?.kill();

      // Revert SplitText modifications
      if (splitInstance) {
        try {
          splitInstance.revert();
        } catch (error) {
          console.warn('textAnimate: Error during SplitText cleanup', error);
        }
      }

      // Clean up inline styles
      node.style.opacity = '';

      // Restore original text content
      node.textContent = original;
    }
  };
}
