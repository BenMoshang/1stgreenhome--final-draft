<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="home"></div>

<style lang="scss">
	.home {
		text-align: center;
		padding: 2rem 0;

		h1 {
			margin-bottom: 2rem;
			font-size: 2.5rem;
		}

		.content {
			max-width: 600px;
			margin: 0 auto;

			p {
				font-size: 1.2rem;
				margin-bottom: 2rem;
			}
		}

		.action-buttons {
			display: flex;
			justify-content: center;
			gap: 1rem;
			margin-top: 2rem;

			.button {
				@include button-small;
				font-size: 1.125rem;
				text-decoration: none;
				padding: 0.75rem 1.5rem;
			}
		}
	}
</style>
