<script>
	import { marked } from 'marked';
	let text = `Some words are *italic*, some are **bold**`;
</script>

<form>
	<div class="container vh-100">
		<div class="row">
			<div class="col-11" />
			<div class="col-1">
				<button type="submit">Submit</button>
			</div>
		</div>
		<div class="row h-100">
			<div class="col-6 w-50 h-auto">
				<textarea class="w-100 h-100" bind:value={text} />
			</div>
			<div class="col-6 w-50 border">
				{@html marked(text)}
			</div>
		</div>
	</div>
</form>

<style>
</style>
