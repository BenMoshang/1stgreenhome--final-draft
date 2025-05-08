<script lang="ts" runes>
  interface Service {
    title: string;
    description: string;
    icon?: string;
  }
  // Use $props() for declaring props in Svelte 5
  let { service } = $props<{ service: Service }>();
</script>

<div
  class="sticky-card bg--background u_p-block__md u_p-inline__md u_m-block__md"
>
  {#if service.icon}
    <img src={service.icon} alt={service.title} class="u_m-bottom__sm" />
  {/if}
  <h3 class="u_title-b typography--primary u_m-block__sm">{service.title}</h3>
  <p class="u_paragraph typography--tertiary">{service.description}</p>
</div>

<style lang="scss">
  .sticky-card {
    position: sticky;
    top: var(--size-lg);
    border-radius: var(--brute-border-radius);
    @include apply-shadow('md');
  }
</style>
