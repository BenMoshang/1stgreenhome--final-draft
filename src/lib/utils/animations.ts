import { cubicOut } from 'svelte/easing'; // Using cubicOut as an approximation for the bezier curve

// Svelte custom transition function for fade in up effect
export const fadeInUpTransition = (node: Element, { delay = 0, duration = 500, y = 30 } = {}) => {
	// Get computed style to avoid overriding existing transforms
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		delay,
		duration,
		easing: cubicOut, // Matches the original CSS animation's timing function more closely
		css: (t: number, u: number) => `
            opacity: ${t};
            transform: ${transform} translateY(${y * u}px);
        `
		// t ranges from 0 to 1 (start to end), u is 1 - t
	};
};
