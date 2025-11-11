import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export interface TextRevealOptions {
  /** initial upward offset for text float step */
  yFrom?: number | string;
  /** animation duration in seconds */
  duration?: number;
  /** easing string or GSAP easing function */
  easing?: string | gsap.EaseFunction;
  /** delay before starting animation */
  delay?: number;
  /** seconds between each line's start */
  staggerDelay?: number;
  /** respect reduced-motion preference */
  respectReducedMotion?: boolean;
  /** Fraction (0–1) of element visible to trigger */
  amount?: number;
  /** Enable GPU acceleration */
  force3D?: boolean;
}

/**
 * Svelte action that reveals text with a smooth clip-path wipe-down animation.
 * Uses GSAP for optimal performance with GPU acceleration.
 * Each line is revealed from top to bottom with staggered timing.
 */
export function textReveal(
  node: HTMLElement,
  opts: TextRevealOptions = {}
) {
  const {
    yFrom = '0.5em',
    duration = 0.5,
    easing = 'power3.out',
    delay = 0,
    staggerDelay = 0.08,
    respectReducedMotion = true,
    amount = 0.5,
    force3D = true
  } = opts;

  const prefersReducedMotion =
    respectReducedMotion &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Hide the node until it comes into view
  node.style.opacity = '0';

  // Animation state management
  let cleanupSplit: (() => void) | null = null;
  let animationTimeline: gsap.core.Timeline | null = null;
  let scrollTriggerInstance: ScrollTrigger | null = null;
  let hasAnimated = false;
  let lines: HTMLElement[] = [];
  let lineWrappers: HTMLElement[] = [];

  function runAnimation() {
    // Prevent multiple executions
    if (hasAnimated) return;
    hasAnimated = true;

    // Element is in view: reveal it
    node.style.opacity = '1';

    try {
      // Split the text into lines
      const split = new SplitType(node, { types: 'lines' });
      const splitLines = split.lines;

      // Store cleanup function
      cleanupSplit = () => split.revert();

      if (!splitLines || splitLines.length === 0) {
        // No lines found, just show the content
        return;
      }

      lines = Array.from(splitLines);
      lineWrappers = [];

      // Wrap each line in a container for clip-path reveal
      lines.forEach((line) => {
        // Ensure line is inline-block for proper wrapping
        line.style.display = 'inline-block';

        // Get or create wrapper for clip-path effect
        const parent = line.parentElement as HTMLElement;
        if (parent) {
          // Set parent as wrapper with overflow hidden
          parent.style.overflow = 'hidden';
          parent.style.display = 'inline-block';
          lineWrappers.push(parent);
        }
      });

      // Set initial state with GPU acceleration
      // Clip-path starts fully clipped from bottom (100% bottom inset)
      gsap.set(lines, {
        opacity: 0,
        y: yFrom,
        clipPath: 'inset(0% 0% 100% 0%)', // Fully clipped from bottom
        force3D: force3D,
        willChange: 'transform, opacity, clip-path'
      });

      if (prefersReducedMotion) {
        // Minimal motion for reduced-motion users - instant reveal
        gsap.set(lines, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)', // Fully revealed
          clearProps: 'all'
        });
      } else {
        // Create optimized animation timeline with staggered clip-path reveal
        animationTimeline = gsap.timeline({
          delay: delay,
          onComplete: () => {
            // Clean up willChange after animation completes for better performance
            if (lines.length > 0) {
              gsap.set(lines, {
                willChange: 'auto',
                clearProps: 'transform' // Clear transform, keep clip-path and opacity
              });
            }
          }
        });

        // Animate clip-path reveal from bottom to top (wipe-down effect)
        // Stagger creates the cascading reveal effect
        animationTimeline.to(lines, {
          clipPath: 'inset(0% 0% 0% 0%)', // Fully revealed
          opacity: 1,
          y: 0,
          duration: duration,
          ease: easing,
          stagger: staggerDelay,
          force3D: force3D
        });
      }
    } catch (error) {
      // Error handling for SplitType failures
      console.warn('textReveal: SplitType failed, showing content without animation', error);
      node.style.opacity = '1';
    }
  }

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
    update(newOpts: TextRevealOptions) {
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

      // Clean up all inline styles from lines using GSAP clearProps
      if (lines.length > 0) {
        gsap.set(lines, {
          clearProps: 'all'
        });
      }

      // Clean up wrapper styles
      lineWrappers.forEach((wrapper) => {
        wrapper.style.overflow = '';
        wrapper.style.display = '';
      });

      // Revert the SplitType modifications if applied
      if (cleanupSplit) {
        try {
          cleanupSplit();
        } catch (error) {
          console.warn('textReveal: Error during SplitType cleanup', error);
        }
      }

      // Reset inline opacity if you need to reuse the node
      node.style.opacity = '';
    },
  };
}
