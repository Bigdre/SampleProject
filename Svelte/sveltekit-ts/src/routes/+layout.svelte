<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import SideNavbar from '$lib/SideNavbar.svelte';
	import Auth from '$lib/Auth.svelte';
</script>

<Auth />
<Navbar />
<SideNavbar />
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
		margin-left: 240px;
		padding: 20px;
		width: calc(100% - 200px);
	}
</style>
