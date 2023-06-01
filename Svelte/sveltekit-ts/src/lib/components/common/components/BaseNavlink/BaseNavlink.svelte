<script lang="ts">
	import { auth0ClientStore, isAuthenticatedStore } from '$lib/auth0Store.js';
	import {
		DropDirection,
		DropdownVariant,
		type IBaseDropdownProps
	} from '../BaseDropdown/BaseDropdown';
	import BaseDropdown from '../BaseDropdown/BaseDropdown.svelte';
	import type { IBaseNavlinkProps } from './BaseNavlink';

	export let props: IBaseNavlinkProps;

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

	const dropdownProps: IBaseDropdownProps = {
		variant: DropdownVariant.Single,
		direction: DropDirection.Right,
		isSplit: false,
		label: props.title,
		items: props.sublinks ?? []
	};
</script>

{#if isAuthenticated || !(props.needsAuth ?? false)}
	{#if props.title == 'Auth'}
		{#if isAuthenticated}
			<button class="link-button auth" on:click={logout}> Logout </button>
		{:else}
			<button class="link-button auth" on:click={login}> Login </button>
		{/if}
	{:else if props.sublinks}
		<BaseDropdown props={dropdownProps} />
		<!-- <div class="dropdown">
			<a class="link-button dropdown-toggle" href={link.href} data-bs-toggle="dropdown"
				>{link.title}</a
			>
			<ul class="dropdown-menu">
				{#each link.sublinks as sublink (sublink.href)}
					<li><a class="link-button" href={sublink.href}>{sublink.title}</a></li>
				{/each}
			</ul>
		</div> -->
	{:else}
		<a class="link-button" href={props.href}>{props.title}</a>
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
