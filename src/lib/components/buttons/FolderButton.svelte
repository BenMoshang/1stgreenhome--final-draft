<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	let {
		text = 'Continue Application',
		onClick = (() => {}) as MouseEventHandler<HTMLButtonElement>
	} = $props();
</script>

<button class="folder-button" on:click={onClick}>
	<div>
		<div class="folder-button__pencil"></div>
		<div class="folder-button__folder">
			<div class="folder-button__top">
				<svg viewBox="0 0 24 27">
					<path
						d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"
					></path>
				</svg>
			</div>
			<div class="folder-button__paper"></div>
		</div>
	</div>
	{text}
</button>

<style lang="scss">
	.folder-button {
		// Using design system colors instead of hardcoded values
		--color: var(--color-950);
		--background: var(--color-50);
		--background-hover: hsl(142.66, 81.25%, 71.39%, 0.083);
		--background-left: var(--color-transitional);
		--folder: var(--color-neutral);
		--folder-inner: var(--color-accent);
		--paper: var(--color-light);
		--paper-lines: var(--color-primary);
		--paper-behind: var(--color-neutral);
		--pencil-cap: var(--color-light);
		--pencil-top: var(--color-primary);
		--pencil-middle: var(--color-light);
		--pencil-bottom: var(--color-accent);
		--shadow: rgba(13, 15, 25, 0.2);
		--transition-duration: 0.3s;
		box-shadow: var(--shadow-medium--secondary);
		border: none;
		outline: none;
		cursor: pointer;
		position: relative;
		border-radius: var(--border-radius);
		font-size: var(--p);
		font-weight: 700;
		line-height: 1.5;
		font-family: var(--font-family-bold);
		-webkit-appearance: none;
		-webkit-tap-highlight-color: transparent;
		padding: spacing(semi-related) spacing(less-related) spacing(semi-related) 69px;
		transition:
			background var(--transition-duration),
			transform var(--transition-duration),
			box-shadow var(--transition-duration);
		color: var(--color);
		background: var(--bg, var(--background));

		&:focus-visible {
			outline: 0.125rem solid var(--color-accent);
			outline-offset: 0.25rem;
		}

		& > div {
			top: 0;
			left: 0;
			bottom: 0;
			width: 53px;
			position: absolute;
			overflow: hidden;
			border-radius: spacing(close-related) 0 0 spacing(close-related);
			background: var(--background-left);
		}

		&__folder {
			width: 23px;
			height: 27px;
			position: absolute;
			left: 15px;
			top: 13px;

			&:before,
			&:after,
			.folder-button__paper {
				content: '';
				position: absolute;
				left: var(--l, 0);
				top: var(--t, 0);
				width: var(--w, 100%);
				height: var(--h, 100%);
				border-radius: 1px;
				background: var(--b, var(--folder-inner));
			}

			&:before {
				box-shadow:
					0 1.5px 3px var(--shadow),
					0 2.5px 5px var(--shadow),
					0 3.5px 7px var(--shadow);
				transform: translateX(var(--fx, 0));
				transition: transform 0.4s ease var(--fd, 0.3s);
			}

			&:after {
				--l: 1px;
				--t: 1px;
				--w: 21px;
				--h: 25px;
				--b: var(--paper-behind);
				transform: translate(var(--pbx, 0), var(--pby, 0));
				transition: transform 0.4s ease var(--pbd, 0s);
			}
		}

		&__top {
			left: 0;
			top: 0;
			z-index: 2;
			position: absolute;
			transform: translateX(var(--fx, 0));
			transition: transform 0.4s ease var(--fd, 0.3s);

			svg {
				width: 24px;
				height: 27px;
				display: block;
				fill: var(--folder);
				transform-origin: 0 50%;
				transition: transform 0.3s ease var(--fds, 0.45s);
				transform: perspective(120px) rotateY(var(--fr, 0deg));
			}
		}

		&__paper {
			z-index: 1;
			--l: 1px;
			--t: 1px;
			--w: 21px;
			--h: 25px;
			--b: var(--paper);

			&:before,
			&:after {
				content: '';
				width: var(--wp, 14px);
				height: 2px;
				border-radius: 1px;
				transform: scaleY(0.5);
				left: 3px;
				top: var(--tp, 3px);
				position: absolute;
				background: var(--paper-lines);
				box-shadow:
					0 12px 0 0 var(--paper-lines),
					0 24px 0 0 var(--paper-lines);
			}

			&:after {
				--tp: 6px;
				--wp: 10px;
			}
		}

		&__pencil {
			height: 2px;
			width: 3px;
			border-radius: 1px 1px 0 0;
			top: 8px;
			left: 105%;
			position: absolute;
			z-index: 3;
			transform-origin: 50% 19px;
			background: var(--pencil-cap);
			transform: translateX(var(--pex, 0)) rotate(35deg);
			transition: transform 0.4s ease var(--pbd, 0s);

			&:before,
			&:after {
				content: '';
				position: absolute;
				display: block;
				background: var(
					--b,
					linear-gradient(
						var(--pencil-top) 55%,
						var(--pencil-middle) 55.1%,
						var(--pencil-middle) 60%,
						var(--pencil-bottom) 60.1%
					)
				);
				width: var(--w, 5px);
				height: var(--h, 20px);
				border-radius: var(--br, 2px 2px 0 0);
				top: var(--t, 2px);
				left: var(--l, -1px);
			}

			&:before {
				-webkit-clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
				clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
			}

			&:after {
				--b: none;
				--w: 3px;
				--h: 6px;
				--br: 0 2px 1px 0;
				--t: 3px;
				--l: 3px;
				border-top: 1px solid var(--pencil-top);
				border-right: 1px solid var(--pencil-top);
			}
		}

		&:before,
		&:after {
			content: '';
			position: absolute;
			width: 10px;
			height: 2px;
			border-radius: 1px;
			background: var(--color);
			transform-origin: 9px 1px;
			transform: translateX(var(--cx, 0)) scale(0.5) rotate(var(--r, -45deg));
			top: 26px;
			right: 16px;
			transition: transform var(--transition-duration);
		}

		&:after {
			--r: 45deg;
		}

		&:hover {
			--cx: 2px;
			--bg: var(--background-hover);
			--fx: -40px;
			--fr: -60deg;
			--fd: 0.15s;
			--fds: 0s;
			--pbx: 3px;
			--pby: -3px;
			--pbd: 0.15s;
			--pex: -24px;
			transform: translateY(-0.25rem);
			box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.2);
		}

		&:active {
			transform: translateY(0.125rem);
			box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
		}

		// A11Y: Add reduced motion support
		@media (prefers-reduced-motion: reduce) {
			&,
			&:before,
			&:after,
			*,
			*::before,
			*::after {
				animation-duration: 0.01ms !important;
				animation-iteration-count: 1 !important;
				transition-duration: 0.01ms !important;
				scroll-behavior: auto !important;
			}
		}
	}
</style>
