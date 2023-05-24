<script lang="ts">
	import { auth0ClientStore, isAuthenticatedStore } from '$lib/auth0Store.js';

	let auth0Store: any; // Replace 'any' with the appropriate type for your auth0ClientStore
	auth0ClientStore.subscribe((auth0ClientStore: any) => {
		auth0Store = auth0ClientStore;
	});

	let isAuthenticated: boolean;
	isAuthenticatedStore.subscribe((isAuthenticatedStore: boolean | null) => {
		isAuthenticated = isAuthenticatedStore ?? false;
	});

	function logout(): void {
		auth0Store.logout({
			returnTo: window.location.origin
		});
	}

	async function login(): Promise<void> {
		await auth0Store.loginWithRedirect({
			redirect_uri: window.location.origin
		});
	}
	interface Link {
		title: string;
		href: string;
		func?: () => void;
		sublinks?: Link[];
		needsAuth?: boolean;
	}

	export let link: Link;
</script>

{#if isAuthenticated || !(link.needsAuth ?? false)}
	{#if link.title == 'Auth'}
		{#if isAuthenticated}
			<button class="link-button auth" on:click={logout}> Logout </button>
		{:else}
			<button class="link-button auth" on:click={login}> Login </button>
		{/if}
	{:else if link.sublinks}
		<div class="dropdown">
			<a class="link-button dropdown-toggle" href={link.href} data-bs-toggle="dropdown"
				>{link.title}</a
			>
			<ul class="dropdown-menu">
				{#each link.sublinks as sublink (sublink.href)}
					<li><a class="link-button" href={sublink.href}>{sublink.title}</a></li>
				{/each}
			</ul>
		</div>
	{:else}
		<a class="link-button" href={link.href}>{link.title}</a>
	{/if}
{/if}

<style>
	.link-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		text-decoration: none;
		color: rgb(226, 15, 0);
		font: inherit;
		padding: 8px 16px;
		margin-bottom: 10px;
	}
	.link-button:hover {
		background-color: #555;
		cursor: pointer;
	}
</style>
