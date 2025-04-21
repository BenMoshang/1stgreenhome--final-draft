<script lang="ts">
	import FolderButton from './FolderButton.svelte';

	function handleClick() {
		alert('Button clicked!');
	}
</script>

<div class="example-container">
	<h2>Folder Button Example</h2>

	<div class="button-container">
		<FolderButton text="Get Started" onClick={handleClick} />

		<FolderButton text="Continue Application" />
	</div>
</div>

<style lang="scss">
  .example-container {
    @extend %flex-col-center;

    padding: spacing(not-related);
    gap: spacing(less-related);
  }

  .button-container {
    @extend %flex-center;

    flex-wrap: wrap;
    gap: spacing(less-related);
  }
</style>
