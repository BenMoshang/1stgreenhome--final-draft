<script lang="ts">
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
    { href: 'https://powur.com/1stgreenhome', text: 'Powur Solar Solutions' },
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
  const logoPathMain =
    'M284.521790,707.478821   C258.999023,682.141479 237.891769,653.958252 222.020111,622.052307   C206.577835,591.009705 196.077209,558.317383 190.681122,524.011658   C187.335220,502.739990 186.006226,481.346588 186.713257,459.851624   C188.597458,402.569336 203.144363,348.805725 232.192917,299.225830   C261.537506,249.140671 301.275177,209.374954 351.525665,180.239929   C387.359100,159.463821 425.984161,146.519455 466.764069,139.825607   C490.872406,135.868347 515.235718,135.754944 539.485168,136.908615   C588.207520,139.226562 634.183105,152.275772 677.442261,174.845032   C735.666443,205.221970 780.505310,249.306870 812.408142,306.632599   C817.681213,316.107605 821.981628,326.035034 826.090759,336.062897   C827.719055,340.036469 826.884583,342.798981 823.412659,345.002930   C808.181152,354.671753 791.899536,358.944427 773.917725,354.775269   C762.509155,352.130127 751.670959,347.966797 741.132996,342.920868   C732.080811,338.586334 724.708679,332.478699 718.847839,324.191956   C693.924377,288.952393 661.207764,262.970856 622.366943,244.647354   C598.719666,233.491592 573.711609,227.069992 547.681458,224.069656   C539.092285,223.079636 530.405945,222.809753 521.986572,222.806122   C485.766602,222.790527 450.695374,229.316223 417.574524,244.826447   C372.937897,265.729401 337.198303,296.741791 310.805542,338.344269   C294.661163,363.792358 284.279572,391.582001 278.662659,421.170746   C278.405396,422.525879 278.373047,423.502930 279.563080,424.699280   C281.571808,426.718597 280.765472,433.236511 278.533142,434.907471   C278.162415,435.184906 277.316254,434.827087 276.268433,434.719635   C270.469055,488.375641 278.280884,539.584778 304.018433,587.339661   C325.580231,627.346619 356.013367,659.247192 394.947784,682.876282   C424.281708,700.679077 456.142151,711.406921 490.097107,715.484619   C535.211182,720.902466 578.718506,714.665100 619.794983,694.778381   C640.802917,684.607666 659.815247,671.451477 674.519897,652.902954   C686.474487,637.823303 690.981567,620.475220 689.688110,601.457275   C689.558533,599.551697 689.504883,599.555359 685.930542,596.319885   C689.225708,594.681824 688.642761,592.139526 688.049622,589.141235   C680.532837,551.144348 658.847656,522.205383 629.946411,497.865295   C612.897095,483.506653 593.913513,472.180756 574.065308,462.153503   C569.060242,459.624908 564.763794,459.210297 559.721619,463.392578   C594.064575,491.088593 628.069641,519.129150 656.265686,553.490051   C656.099426,556.171570 657.510620,558.641052 659.230835,561.123779   C663.605591,567.437744 667.067749,574.266113 670.363159,581.196899   C672.149658,584.954163 671.189209,586.649109 667.138062,587.340454   C608.584595,597.332642 554.837097,585.486450 506.842987,550.536804   C465.979645,520.779846 437.080872,481.803833 421.422668,433.406525   C415.584930,415.362946 412.814880,396.834106 412.876251,377.919830   C412.895020,372.141388 414.080261,366.372345 414.609436,360.587860   C414.927704,357.108643 416.590240,356.599426 419.711090,357.459656   C433.503510,361.261200 447.428101,364.520447 461.690552,365.976654   C478.224884,367.664825 494.749512,369.331055 511.440033,368.144684   C526.605530,367.066742 541.694519,368.713745 556.698425,370.731323   C580.323303,373.908203 602.777222,381.027039 623.977234,391.929199   C668.729858,414.943390 698.286682,450.559448 712.195618,498.987091   C719.717957,525.178345 721.230225,552.023438 720.190979,579.070251   C719.854309,587.832947 718.796326,596.567810 718.066101,605.341064   C720.505920,605.804626 721.051270,604.243042 721.802979,603.060669   C738.832886,576.278625 749.543945,547.117676 754.661194,515.842346   C757.202332,500.311554 757.121521,484.638885 756.527222,469.027191   C756.085510,457.424347 759.916016,448.235870 768.458740,440.718811   C788.854248,422.772003 812.727112,412.651703 839.604309,409.807404   C847.505066,408.971252 849.524292,410.916443 850.463501,418.694946   C853.580933,444.513336 854.194580,470.394226 852.461060,496.376160   C850.134399,531.246887 842.077087,564.716370 828.544312,596.842651   C802.467957,658.747437 762.137329,709.263550 706.718933,747.419250   C666.042053,775.425293 621.304810,793.300598 572.331116,800.534546   C550.191650,803.804810 527.950745,805.352417 505.667419,804.149658   C441.616425,800.692627 382.525055,781.949280 329.568451,745.210022   C313.522400,734.077881 298.487335,721.677002 284.521790,707.478821';
  const logoPathSecondary =
    'M722.200195,590.021973   C726.609314,590.768494 723.032837,593.760986 723.808044,595.652283   C721.572632,594.393188 720.774902,592.668274 722.200195,590.021973   z';

  const currentYear = new Date().getFullYear();
</script>

<footer class="footer u_p-inline__md u_p-block__xl">
  <div class="footer__container u_container__sm">
    <div class="footer__content">
      <!-- Contact Block -->
      <section class="footer__contact">
        <a href="/" aria-label="Homepage">
          <img
            src="../../../../static/1stgreenhome--old-logo.webp"
            alt="1stgreenhome"
            class="footer__logo"
          />
        </a>
        <h2 class="footer__company-name">1st Green Home</h2>
        <address class="footer__address">
          <a
            class="footer__contact-link footer__address-email"
            href="mailto:info@1stgreenhome.com">info&#64;1stgreenhome.com</a
          >
          <a
            class="footer__contact-link footer__address-phone"
            href="tel:+14432169169">(443) 216-9169</a
          >
          <p class="footer__address-line">10630 Riggs Hill Rd. Unit A</p>
          <p class="footer__address-line">Jessup, MD 20794</p>
        </address>
      </section>

      <!-- Home Resources Navigation -->
      <nav
        class="footer__nav footer__nav--home"
        aria-labelledby="footer-nav-home-title"
      >
        <h3 class="footer__nav-title" id="footer-nav-home-title">
          Home Resources
        </h3>
        <ul class="footer__nav-list">
          {#each homeResources as item (item.href)}
            <li class="footer__nav-item">
              <a
                class="footer__nav-link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Business Solutions Navigation -->
      <nav
        class="footer__nav footer__nav--business"
        aria-labelledby="footer-nav-business-title"
      >
        <h3 class="footer__nav-title" id="footer-nav-business-title">
          Business Solutions
        </h3>
        <ul class="footer__nav-list">
          {#each businessSolutions as item (item.href)}
            <li class="footer__nav-item">
              <a
                class="footer__nav-link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>

    <hr class="footer__divider" />

    <div class="footer__bottom">
      <small class="footer__copyright">
        &copy; {currentYear} 1st Green Home, All Rights Reserved.
      </small>
    </div>
  </div>
</footer>

<style lang="scss">
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: -10;
    height: var(--footer-height);
    color: var(--on-surface-container);
    will-change: transform, opacity;
    transform: translateZ(0); /* Force hardware acceleration */
    backface-visibility: hidden; /* Improve performance */
    background:
      radial-gradient(
          oklch(98% 0 0) 4%,
          oklch(95% 0 0) 9%,
          oklch(95% 0 0 / 0%) 9%
        )
        0 0,
      radial-gradient(
          oklch(98% 0 0) 4%,
          oklch(95% 0 0) 8%,
          oklch(95% 0 0 / 0%) 10%
        )
        50px 50px,
      radial-gradient(oklch(98% 0 0 / 80%) 20%, oklch(95% 0 0 / 0%)) 50px 0,
      radial-gradient(oklch(98% 0 0 / 80%) 20%, oklch(95% 0 0 / 0%)) 0 50px,
      radial-gradient(oklch(95% 0 0) 35%, oklch(95% 0 0 / 0%) 60%) 50px 0,
      radial-gradient(oklch(95% 0 0) 35%, oklch(95% 0 0 / 0%) 60%) 100px 50px,
      radial-gradient(oklch(92% 0 0 / 70%), oklch(95% 0 0 / 0%)) 0 0,
      radial-gradient(oklch(92% 0 0 / 70%), oklch(95% 0 0 / 0%)) 50px 50px,
      linear-gradient(
          45deg,
          oklch(95% 0 0 / 0%) 49%,
          oklch(88% 0 0) 50%,
          oklch(95% 0 0 / 0%) 70%
        )
        0 0,
      linear-gradient(
          -45deg,
          oklch(95% 0 0 / 0%) 49%,
          oklch(88% 0 0) 50%,
          oklch(95% 0 0 / 0%) 70%
        )
        0 0;
    background-color: oklch(99% 0 0);
    background-size: 6.25rem 6.25rem;

    &__container {
      display: flex;
      flex-direction: column;
      gap: size('xl');
    }

    &__content {
      display: grid;
      // Adjust grid columns based on screen size
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: size('lg');

      @include respond-to('tablet-start') {
        // Example: Maybe logo takes more space on larger screens
        grid-template-columns: 1.5fr repeat(3, 1fr) 1fr; // logo, nav, nav, nav, social
        gap: size('xl');
      }
    }

    &__logo {
      // Styles for the logo link itself, if needed

      mix-blend-mode: multiply;
      display: inline-block; // Example
    }

    &__logo-svg {
      // Styles specific to the SVG logo inside the link
      display: block; // Example
      width: 150px; // Adjust as needed
      height: auto;
    }

    &__address {
      // Styles for the address block
    }

    &__address-line {
      // Styles for individual lines in the address
      margin: 0;
      @extend %typography--secondary;
      @extend %u_paragraph;
    }

    &__contact-link {
      @extend %a-link;
      @extend %u_callout;
    }

    &__nav {
      // Container styles if needed, but direct element styles moved out
    }

    &__nav-title {
      @extend %u_heading;
      @extend %typography--primary;
      margin-bottom: size('md');
    }

    &__nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: size('sm');
    }

    &__nav-item {
      // Styles for list items if needed
    }

    &__nav-link {
      @extend %a-link;
      @extend %u_callout;
      display: inline-block;
    }

    &__divider {
      border: none;
      border-top: 1px solid var(--outline-variant);
      margin: 0; // Reset default hr margin
    }

    &__bottom {
      // border-top: 1px solid var(--outline-variant); // Handled by divider now
      padding-top: size('lg');
      // margin-top: size('lg'); // Gap handled by container
      text-align: center;
    }

    &__copyright {
      @extend %typography--tertiary;
      @extend %u_caption;
    }
  }
</style>
