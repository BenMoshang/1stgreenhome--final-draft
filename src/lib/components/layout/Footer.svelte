<script>
  // Import the footer data from a separate file

  // Props (equivalent to @Input in Angular)
  export const footerData = [
    {
      aboutText: `1st Green Home is an energy efficiency firm in MD that has one simple
          mission: to help lower energy usage. We are committed to providing
          services to save energy in residential and commercial properties.`,
    },
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
          <img
            src="../assets/header/logo4.png"
            alt="Logo"
            width="48"
            height="48"
          />
        </div>

        <h2>1st Green Home</h2>
      </div>
      <a class="email" href="mailto:info@1stgreenhome.com"
        >info&#64;1stgreenhome.com</a
      >
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
          <a
            href="https://bgesmartenergy.com/business/business-programs/"
            target="_blank">BGE Smart Business Programs</a
          >
        </li>
        <li>
          <a href="https://powur.com/1stgreenhome" target="_blank"
            >Powur Solar Solutions</a
          >
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
    z-index: 3;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  /* Layout */
  footer {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-size: 8rem 8rem;
    gap: 1rem;
  }

  footer::after {
    position: absolute;
    z-index: -1;
    background: var(--footer-background);
    background-size: 8rem 8rem;
    block-size: 100%;
    content: '';
    filter: brightness(0.5);
    inline-size: 100%;
    inset-block-start: 0;
    inset-inline-start: 0;
  }

  .footer__top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    padding-inline: 5%;
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
    justify-content: left;
    gap: 0.75rem;
    text-align: start;
  }

  .footer__bottom {
    text-align: center;
  }

  .footer__block p {
    font-family: var(--font-family-bold);
  }

  /* Styling */
  h2 {
    color: var(--color-light);
    font-size: 1.25rem;
    font-weight: 600;
    padding-block: 0.75rem;
  }

  .footer__copyright {
    filter: brightness(1);
  }

  a,
  p,
  li {
    color: var(--color-neutral);
    filter: brightness(0.9);
    font-family: var(--font-family-regular);
    font-size: var(--label-p);
    line-height: var(--label-line-height);
    list-style: none;
    text-decoration: none;
    text-wrap: balance;
  }

  hr {
    border: none;
    border-radius: 100%;
    background-color: var(--color-secondary); /* Dark green color */
    block-size: 0.1875rem; /* Thickness */
    inline-size: 100%;
    opacity: 0.55;
  }

  /* Interactions */
  a:hover,
  a:focus {
    color: var(--color-primary);
    text-shadow: 0 0 5px var(--color-primary);
    transition:
      color 0.3s ease-in-out,
      text-shadow 0.3s ease-in-out;
  }

  .footer__circle {
    --z-index: 3;
    --stepper-circle-size: 3.5rem;

    z-index: var(--z-index);
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.0625rem solid var(--color-primary);
    border-radius: 50%;
    background: var(--convex-light);
    block-size: var(--stepper-circle-size);
    box-shadow: var(--shadow-medium--secondary);
    inline-size: var(--stepper-circle-size);
    justify-self: center;
  }

  .footer__circle img {
    aspect-ratio: 1/1;
    block-size: 70%;
    inline-size: 70%;
    margin-block-start: -0.1875rem;
    object-fit: contain;
  }

  .email {
    text-decoration: underline;
  }

  .email:hover {
    color: var(--color-primary);
    text-shadow: 0 0 5px var(--color-primary);
    transition:
      color 0.3s ease-in-out,
      text-shadow 0.3s ease-in-out;
  }
</style>
