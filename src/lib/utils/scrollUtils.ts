import { browser } from '$app/environment';

interface LenisScrollDetail {
	scroll: number;
	limit: number;
	velocity: number;
	direction: number;
	progress: number;
}

interface LenisScrollEvent extends CustomEvent {
	detail: LenisScrollDetail;
}

/**
 * Utility to handle scroll-triggered animations with Lenis
 * This attaches observers to elements with data-scroll attributes
 */
export function initScrollAnimations() {
	if (!browser) return;

	// Create IntersectionObserver for scroll-triggered animations
	const scrollObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				// Add .is-inview class when element comes into view
				if (entry.isIntersecting) {
					entry.target.classList.add('is-inview');
				} else {
					// Optional: remove the class when element leaves viewport
					// Uncomment if you want elements to animate each time they enter viewport
					// entry.target.classList.remove('is-inview');
				}
			});
		},
		{
			// Element becomes visible when 15% of it enters the viewport
			threshold: 0.15,
			rootMargin: '0px 0px -10% 0px' // Trigger slightly before element enters viewport
		}
	);

	// Find all elements with data-scroll attribute and observe them
	const scrollElements = document.querySelectorAll('[data-scroll]');
	scrollElements.forEach((element) => {
		scrollObserver.observe(element);
	});

	// Listen for scroll events from Lenis to trigger additional effects
	window.addEventListener('lenisScroll', ((e: LenisScrollEvent) => {
		const { scroll, limit, velocity, direction, progress } = e.detail;

		// Find elements that need parallax effect
		document.querySelectorAll('[data-parallax]').forEach((element) => {
			if (element instanceof HTMLElement) {
				const speed = parseFloat(element.dataset.parallax || '0.1');
				const y = scroll * speed;

				// Apply smooth transform - will create parallax effect
				element.style.transform = `translate3d(0, ${-y}px, 0)`;
			}
		});

		// Handle sticky elements with progress
		document.querySelectorAll('[data-sticky-progress]').forEach((element) => {
			if (element instanceof HTMLElement) {
				// Use the overall scroll progress for effects like progress bars
				if (element.tagName === 'PROGRESS' || element.classList.contains('progress')) {
					(element as HTMLProgressElement).value = progress * 100;
				}
			}
		});
	}) as EventListener);

	return {
		// Clean up function to remove observers
		cleanup: () => {
			scrollObserver.disconnect();
			window.removeEventListener('lenisScroll', (() => {}) as EventListener);
		}
	};
}

/**
 * Helper to programmatically scroll to elements with Lenis
 * @param target Element or selector to scroll to
 * @param options Options for the scroll behavior
 */
export function scrollTo(
	target: string | HTMLElement,
	options: {
		offset?: number;
		duration?: number;
		immediate?: boolean;
	} = {}
) {
	if (!browser) return;

	// @ts-ignore - Lenis is attached to window by the layout component
	const lenis = window.lenis;
	if (!lenis) return;

	const defaultOptions = {
		offset: 0,
		duration: 1.2,
		immediate: false
	};

	const scrollOptions = { ...defaultOptions, ...options };

	lenis.scrollTo(target, scrollOptions);
}
