<!-- SideNavbar.svelte -->
<script lang="ts">
	import { writable, get } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { navbarColor } from './navbarStore';
	import { auth0ClientStore, isAuthenticatedStore } from './auth0Store.js';
	import { push } from 'svelte-spa-router';

	let navColor: string;
	navbarColor.subscribe((navbarColor: string) => {
		navColor = navbarColor;
	});

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
		url: string;
		func?: () => void;
	}

	const baseLinks: Link[] = [
		{ title: 'Dashboard', url: '/dashboard' },
		{ title: 'Profile', url: '/profile' },
		{ title: 'Settings', url: '/settings' },
		{ title: 'Tasks', url: '/tasks' },
		{ title: 'Test', url: '/test' }
	];
	const sideLinks: Writable<Link[]> = writable(baseLinks);

	function updateSideLinks(authenticated: boolean): void {
		if (authenticated) {
			sideLinks.set([...baseLinks, { title: 'Logout', url: '#', func: logout }]);
		} else {
			sideLinks.set([...baseLinks, { title: 'Login', url: '#', func: login }]);
		}
	}

	$: {
		updateSideLinks(isAuthenticated);
	}

	let navbarElement: HTMLElement; // Add a reference for the navbar element

	$: {
		if (navColor && navbarElement) {
			navbarElement.style.backgroundColor = navColor;
		}
	}
</script>

<nav class="side-navbar" bind:this={navbarElement}>
	{#each $sideLinks as link}
		{#if link.func}
			<button class="link-button" on:click={() => link.func?.()}>
				{link.title}
			</button>
		{:else}
			<a class="link-button" href={link.url}>
				{link.title}
			</a>
		{/if}
	{/each}
</nav>

<style>
	.side-navbar {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: #333;
		padding: 10px 20px;
		width: 200px;
		height: 100%;
		position: fixed;
	}

	.link-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		text-decoration: none;
		color: white;
		font: inherit;
		padding: 8px 16px;
		margin-bottom: 10px;
	}
	.link-button:hover {
		background-color: #555;
		cursor: pointer;
	}
</style>
