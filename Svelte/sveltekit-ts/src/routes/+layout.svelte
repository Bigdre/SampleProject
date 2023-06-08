<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Auth from '$lib/Auth.svelte';
</script>

<Auth />
<Navbar />

<main>
	<section class="main-content">
		<slot />
	</section>
</main>

<style>
	main {
		display: flex;
	}
	.main-content {
		padding: 20px;
		width: calc(100% - 200px);
	}
</style>
