declare module 'lenis' {
	interface LenisOptions {
		wrapper?: HTMLElement | Window;
		content?: HTMLElement;
		lerp?: number;
		duration?: number;
		easing?: (t: number) => number;
		orientation?: 'vertical' | 'horizontal';
		gestureOrientation?: 'vertical' | 'horizontal' | 'both';
		smoothWheel?: boolean;
		smoothTouch?: boolean;
		touchMultiplier?: number;
		infinite?: boolean;
		autoResize?: boolean;
		autoRaf?: boolean;
		syncTouch?: boolean;
		syncTouchLerp?: number;
		eventsTarget?: HTMLElement | Window;
		preventTouch?: boolean;
		prevent?: (node: HTMLElement) => boolean;
		wheelMultiplier?: number;
		wheelEventsTarget?: HTMLElement | Window;
	}

	interface LenisScrollToOptions {
		offset?: number;
		lerp?: number;
		duration?: number;
		easing?: (t: number) => number;
		immediate?: boolean;
		lock?: boolean;
		force?: boolean;
		onComplete?: () => void;
		userData?: any;
	}

	interface LenisScrollEventData {
		direction: 1 | -1;
		progress: number;
		velocity: number;
		scroll: number;
		targetScroll: number;
		animatedScroll: number;
		limit: number;
		isHorizontal: boolean;
		length: number;
		isScrolling: boolean | string;
		isStopped: boolean;
		time: number;
	}

	export default class Lenis {
		constructor(options?: LenisOptions);
		raf(time: number): void;
		scrollTo(target: string | number | HTMLElement, options?: LenisScrollToOptions): void;
		on(event: string, callback: (e: LenisScrollEventData) => void): void;
		stop(): void;
		start(): void;
		resize(): void;
		destroy(): void;
	}
}
