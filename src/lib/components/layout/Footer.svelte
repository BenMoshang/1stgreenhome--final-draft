<script>
	// Import the footer data from a separate file

	// Props (equivalent to @Input in Angular)
	export const footerData = [
		{
			aboutText: `1st Green Home is an energy efficiency firm in MD that has one simple
          mission: to help lower energy usage. We are committed to providing
          services to save energy in residential and commercial properties.`
		}
	];

	// Using $state rune for reactive state management (if needed)
	// If the data is static, you can omit $state
	const footer = $state(footerData);
</script>

<footer>
	<div class="footer__top">
		<div class="footer__block">
			<div class="block__header">
				<div id="step-03" class="footer__circle">
					<img src="../assets/header/logo4.png" alt="Logo" width="48" height="48" />
				</div>

				<h2>1st Green Home</h2>
			</div>
			<a class="email" href="mailto:info@1stgreenhome.com">info&#64;1stgreenhome.com</a>
			<a class="email" href="tel:+14432169169">(443) 216-9169</a>
			<p>10630 Riggs Hill Rd. Unit A</p>
			<p>Jessup, MD 20794</p>
		</div>

		<div class="footer__block">
			<h2>Home Resources</h2>
			<ul>
				<li>
					<a
						href="https://homeenergysavings.pepco.com/home-performance-with-energy-star-program"
						target="_blank">Pepco Home Performance</a
					>
				</li>
				<li>
					<a href="https://bgesmartenergy.com/business/business-programs/" target="_blank"
						>BGE Smart Business Programs</a
					>
				</li>
				<li>
					<a href="https://powur.com/1stgreenhome" target="_blank">Powur Solar Solutions</a>
				</li>
			</ul>
		</div>

		<div class="footer__block">
			<h2>Business Solutions</h2>
			<ul>
				<li>
					<a
						href="https://homeenergysavings.pepco.com/md/business/overview"
						target="_blank"
						rel="noopener noreferrer">Pepco Energy Savings for Business</a
					>
				</li>
				<li>
					<a
						href="https://www.smeco.coop/save-energy-and-money/business-solutions"
						target="_blank"
						rel="noopener noreferrer">SMECO Business Solutions</a
					>
				</li>
				<li>
					<a
						href="https://homeenergysavings.delmarva.com/md/business/overview"
						target="_blank"
						rel="noopener noreferrer">Delmarva Energy Savings for Business</a
					>
				</li>
			</ul>
		</div>
	</div>
	<hr />
	<div class="footer__bottom">
		<p class="footer__copyright">©2018 1st Green Home, All Rights Reserved.</p>
	</div>
</footer>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		z-index: 3;
	}

	/* Layout */
	footer {
		display: flex;
		flex-direction: column;
		background-size: 8rem 8rem;
		gap: 1rem;
		padding: 1rem;
		z-index: 2;
		position: relative;
	}

	footer::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--footer-background);
		background-size: 8rem 8rem;
		z-index: -1;
		filter: brightness(0.5);
	}

	.footer__top {
		display: flex;
		justify-content: space-between;
		padding-inline: 5%;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.block__header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.footer__block,
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		justify-content: left;
		text-align: left;
	}

	.footer__bottom {
		text-align: center;
	}

	.footer__block p {
		font-family: var(--font-family-bold);
	}

	/* Styling */
	h2 {
		font-size: 1.25rem;
		color: var(--color-light);
		padding-block: 0.75rem;
		font-weight: 600;
	}

	.footer__copyright {
		filter: brightness(1);
	}

	a,
	p,
	li {
		text-decoration: none;
		font-size: var(--label-p);
		line-height: var(--label-line-height);
		list-style: none;
		text-wrap: balance;
		font-family: var(--font-family-regular);
		color: var(--color-neutral);
		filter: brightness(0.9);
	}

	hr {
		height: 0.1875rem; /* Thickness */
		background-color: var(--color-secondary); /* Dark green color */
		border-radius: 100%;
		border: none;
		width: 100%;
		opacity: 0.55;
	}

	/* Interactions */
	a:hover,
	a:focus {
		color: var(--color-primary);
		transition:
			color 0.3s ease-in-out,
			text-shadow 0.3s ease-in-out;
		text-shadow: 0 0 5px var(--color-primary);
	}

	.footer__circle {
		--z-index: 3;
		--stepper-circle-size: 3.5rem;
		justify-self: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: var(--stepper-circle-size);
		height: var(--stepper-circle-size);
		background: var(--convex-light);
		border-radius: 50%;
		border: 0.0625rem solid var(--color-primary);
		z-index: var(--z-index);
		box-shadow: var(--shadow-medium--secondary);
		overflow: hidden;
	}

	.footer__circle img {
		margin-top: -0.1875rem;
		aspect-ratio: 1/1;
		width: 70%;
		object-fit: contain;
		height: 70%;
	}

	.email {
		text-decoration: underline;
	}

	.email:hover {
		color: var(--color-primary);
		transition:
			color 0.3s ease-in-out,
			text-shadow 0.3s ease-in-out;
		text-shadow: 0 0 5px var(--color-primary);
	}
</style>
