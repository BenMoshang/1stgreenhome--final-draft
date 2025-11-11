<script lang="ts">
  import { base } from '$app/paths';
  // Data for navigation links
  const homeResources = [
    {
      href: 'https://homeenergysavings.pepco.com/home-performance-with-energy-star-program',
      text: 'Pepco Home Performance',
    },
    {
      href: 'https://bgesmartenergy.com/business/business-programs/',
      text: 'BGE Smart Business Programs',
    },
  ];

  const businessSolutions = [
    {
      href: 'https://homeenergysavings.pepco.com/md/business/overview',
      text: 'Pepco Energy Savings for Business',
    },
    {
      href: 'https://www.smeco.coop/save-energy-and-money/business-solutions',
      text: 'SMECO Business Solutions',
    },
    {
      href: 'https://homeenergysavings.delmarva.com/md/business/overview',
      text: 'Delmarva Energy Savings for Business',
    },
  ];

  // SVG logo path data
  const logoPathMain = 'M284.521790,707.478821 ...'; // truncated for brevity
  const logoPathSecondary = 'M722.200195,590.021973 ...'; // truncated
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer u_p-inline__md u_p-block__xl">
  <div class="footer__container u_container__sm ">

          <!-- Logo & Company Name -->
    <div class="footer__name-container">
      <div class="footer__logo--background">
        <img
          src={base + '/assets/footer/old-logo.webp'}
          alt="1stgreenhome logo"
          class="footer__logo-svg"
          width="150"
          height="150"
        />
      </div>
      <p
       class="footer__company-name">1stGreenHome<br>
</p>
      <span id="footer-address-line" class="footer__address-line">10630 Riggs Hill Rd. Unit A, <br> Jessup, MD 20794</span>

    </div>

      <address class="footer__address">
          <h3 class="footer__nav-title" id="footer-nav-home-title">
        Contact
      </h3>

        <a
          class="footer__contact-link footer__address-email"
          href="mailto:info@1stgreenhome.com"
          >info@1stgreenhome.com</a
        >
        <a
          class="footer__contact-link footer__address-phone"
          href="tel:+14432169169"
          >(443) 216-9169</a
        >
      </address>

    <!-- Home Resources Nav -->
    <nav
      class="footer__nav footer__nav--home"
      aria-labelledby="footer-nav-home-title"
    >
      <h3 class="footer__nav-title" id="footer-nav-home-title">
        Home Resources
      </h3>
      <ul class="footer__nav-list">
        {#each homeResources as link}
          <li class="footer__nav-item">
            <a
              class="footer__nav-link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Business Solutions Nav -->
    <nav
      class="footer__nav footer__nav--business"
      aria-labelledby="footer-nav-business-title"
    >
      <h3 class="footer__nav-title" id="footer-nav-business-title">
        Business Solutions
      </h3>
      <ul class="footer__nav-list">
        {#each businessSolutions as link}
          <li class="footer__nav-item">
            <a
              class="footer__nav-link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>


    <!-- Copyright -->
       <small class="footer__copyright">
        &copy; {currentYear} 1st Green Home, All Rights Reserved.
      </small>

  </div>

</footer>
