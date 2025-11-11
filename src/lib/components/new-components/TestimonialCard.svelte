<script lang="ts">
  // Use Svelte 5 runes syntax for props
  const props = $props();

  // Extract and derive props
  let statement = $derived(props.statement || '');
  let pfp = $derived(props.pfp || '');
  let name = $derived(props.name || '');
  let company = $derived(props.company || '');
</script>

<article class="card">
  <p class="card__message max-ch-65">{@html statement}</p><!-- max-ch-65 applied to control text width -->
  <header class="card__header">
    <img class="card__pfp" src={pfp} alt={`${name} from ${company}`} />
    <h3 class="card__name">{name}</h3>
    <p class="card__company">{@html company}</p>
  </header>
</article>
