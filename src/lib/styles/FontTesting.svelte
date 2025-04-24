<script>
  // Demo text for typography previews
  const demoText = 'The quick brown fox jumps over the lazy dog.';

  // Semantic color tokens for testing
  const semanticColors = [
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'error',
    'warning',
    'info',
    'success',
  ];

  // Color variants for each semantic color
  const colorVariants = [
    '', // base color
    '-variant',
    '-container',
  ];
</script>

<main class="font-testing bg--background text--surface">
  <h1 class="text--primary">Typography Utility Classes</h1>

  <section>
    <h2 class="text--primary">Display</h2>
    <p class="u_display-1 u_display-1--bold">{demoText}</p>
    <p class="u_display-1">{demoText}</p>
    <p class="u_display-2">{demoText}</p>
    <p class="u_display-2 u_display-2--bold">{demoText}</p>
  </section>

  <section>
    <h2 class="text--secondary">Titles</h2>
    <p class="u_title-a u_title-a--bold">{demoText}</p>
    <p class="u_title-a">{demoText}</p>
    <p class="u_title-b">{demoText}</p>
    <p class="u_title-c">{demoText}</p>
  </section>

  <section>
    <h2 class="text--secondary">Heading & Subheading</h2>
    <p class="u_heading u_heading--bold">{demoText}</p>
    <p class="u_heading">{demoText}</p>
    <p class="u_subheading">{demoText}</p>
  </section>

  <section>
    <h2 class="text--secondary">Body Text</h2>
    <p class="u_paragraph">{demoText}</p>
    <p class="u_callout">{demoText}</p>
  </section>

  <section>
    <h2 class="text--secondary">Labels & Captions</h2>
    <p class="u_label u_label--bold">{demoText}</p>
    <p class="u_label">{demoText}</p>
    <p class="u_caption">{demoText}</p>
    <p class="u_overline">{demoText}</p>
  </section>

  <h1 class="text--primary">Color Utility Classes</h1>

  <section>
    <h2 class="text--secondary">Tone Utilities</h2>
    <p class="typography--primary">{demoText} (typography--primary)</p>
    <p class="typography--secondary">{demoText} (typography--secondary)</p>
    <p class="typography--tertiary">{demoText} (typography--tertiary)</p>
  </section>

  <section>
    <h2 class="text--secondary">Text Colors</h2>
    <div class="color-grid">
      {#each semanticColors as color}
        <div class="color-family">
          <h3>{color}</h3>
          <p class={`text--${color}`}>text--{color}</p>
          <p class={`text--on-${color}`}>text--on-{color}</p>
          <p class={`text--on-${color}-container`}>
            text--on-{color}-container
          </p>
        </div>
      {/each}
      <div class="color-family">
        <h3>surface</h3>
        <p class="text--surface">text--surface</p>
      </div>
    </div>
  </section>

  <section>
    <h2 class="text--secondary">Background Colors</h2>
    <div class="color-grid">
      {#each semanticColors as color}
        <div class="color-family">
          <h3>{color} & variants</h3>
          {#each colorVariants as variant}
            <p class={`color-box bg--${color}${variant}`}>
              bg--{color}{variant}
            </p>
          {/each}
        </div>
      {/each}
      <div class="color-family">
        <h3>surface</h3>
        <p class="color-box bg--surface">bg--surface</p>
        <p class="color-box bg--background">bg--background</p>
      </div>
    </div>
  </section>

  <section>
    <h2 class="text--secondary">Combined Text & Background</h2>
    <div class="color-grid">
      {#each semanticColors as color}
        <div class="color-family">
          <h3>{color} combinations</h3>
          <p class={`color-box bg--${color} text--on-${color}`}>
            bg--{color} with text--on-{color}
          </p>
          <p
            class={`color-box bg--${color}-container text--on-${color}-container`}
          >
            bg--{color}-container with text--on-{color}-container
          </p>
        </div>
      {/each}
    </div>
  </section>

  <section>
    <h2 class="text--secondary">Semantic Colors (Text & Background)</h2>
    <p class="text--surface">
      This is standard body text using <code>.text--surface</code> (applies
      <code>--on-surface</code>).
    </p>

    <div class="box bg--primary">
      <p>This box uses <code>.bg--primary</code>.</p>
      <p class="text--on-primary">
        This text uses <code>.text--on-primary</code> (correct contrast).
      </p>
      <p class="text--primary">
        This text uses <code>.text--primary</code> (<strong
          >likely poor contrast</strong
        >).
      </p>
    </div>

    <div class="box bg--secondary-container">
      <p>This box uses <code>.bg--secondary-container</code>.</p>
      <p class="text--on-secondary-container">
        This text uses <code>.text--on-secondary-container</code> (correct contrast).
      </p>
      <p class="text--secondary">
        This text uses <code>.text--secondary</code> (<strong
          >likely poor contrast</strong
        >).
      </p>
    </div>

    <div class="box bg--error">
      <p>This box uses <code>.bg--error</code>.</p>
      <p class="text--on-error">
        This text uses <code>.text--on-error</code> (correct contrast).
      </p>
      <p class="text--error">
        This text uses <code>.text--error</code> (<strong
          >potentially poor contrast, especially on this background</strong
        >).
      </p>
    </div>

    <h3>Potentially Problematic Usage (Directly on Default Background)</h3>
    <p class="text--primary">
      This text uses <code>.text--primary</code> directly on the default background.
      Contrast might be insufficient.
    </p>
    <p class="text--secondary">
      This text uses <code>.text--secondary</code> directly on the default background.
      Contrast might be insufficient.
    </p>
    <p class="text--tertiary">
      This text uses <code>.text--tertiary</code> directly on the default background.
      Contrast might be insufficient.
    </p>
    <p class="text--neutral">
      This text uses <code>.text--neutral</code> directly on the default background.
      Contrast might be insufficient.
    </p>
  </section>

  <section>
    <h2 class="text--secondary">Comprehensive Utility Test</h2>
    {#each ['primary', 'secondary', 'tertiary', 'neutral', 'error', 'warning', 'info', 'success'] as name}
      <div class="box bg--{name}">
        <p>
          <code>.bg--{name}</code>
          <span class="text--on-{name}">{name} on-background text</span>
        </p>
        <p>
          <code>.text--{name}</code>
          <span class="text--{name}">This is {name} text</span>
        </p>
      </div>
    {/each}
    <div class="box">
      <p>
        <code>.text--surface</code>
        <span class="text--surface">This is surface text</span>
      </p>
    </div>
    <div class="box bg--background">
      <p>
        <code>.bg--background</code>
        <span class="text--on-surface">Background with on-surface text</span>
      </p>
    </div>
  </section>

  <section>
    <h2 class="text--secondary">Focus States</h2>
    <div class="focus-examples">
      <button class="focus-ring">Default Focus Ring</button>
      <button class="focus-ring--primary">Primary Focus Ring</button>
      <button class="focus-ring--secondary">Secondary Focus Ring</button>
      <button class="focus-ring--tertiary">Tertiary Focus Ring</button>
    </div>
  </section>

  <section>
    <h2 class="text--secondary">Light/Dark Mode Switch</h2>
    <p class="note">
      This site uses the CSS light-dark() function to automatically switch
      between color modes based on system preference.
    </p>
    <p class="note">
      Open your system settings to toggle between light and dark mode to see the
      changes.
    </p>
  </section>
</main>

<style lang="scss">
  .font-testing {
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  section {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    border-bottom: 1px solid var(--neutral-container);
    padding-bottom: var(--spacing-md);
  }
  h1,
  h2 {
    margin: 0 0 var(--spacing-sm) 0;
  }
  h3 {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 1rem;
    text-transform: capitalize;
  }
  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-md);
  }
  .color-family {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
  }
  .color-box {
    padding: var(--spacing-sm);
    border-radius: 4px;
    margin-bottom: var(--spacing-xs);
  }
  .focus-examples {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }
  button {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--neutral);
    border-radius: 4px;
    background: var(--surface);
    color: var(--on-surface);
    cursor: pointer;
  }
  .note {
    opacity: 0.8;
    font-style: italic;
  }
  .box {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding: var(--spacing-s);
    border-radius: var(--radius-2);
    margin: var(--spacing-s) 0;
  }
</style>
