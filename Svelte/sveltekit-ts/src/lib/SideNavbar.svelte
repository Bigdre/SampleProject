<!-- SideNavbar.svelte -->
<script lang="ts">
	import { writable, get } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { navbarColor } from './navbarStore';
	import { auth0ClientStore, isAuthenticatedStore } from './auth0Store.js';
	import { push } from 'svelte-spa-router';
	import BaseButton from '$lib/components/common/components/BaseButton/BaseButton.svelte';
	import {
		type IBaseButtonProps,
		ButtonVariants,
		ButtonSizes,
		ButtonTags
	} from '$lib/components/common/components/BaseButton/BaseButton';
	import BaseNavlink from './components/common/components/BaseNavlink/BaseNavlink.svelte';

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

	let navbarElement: HTMLElement; // Add a reference for the navbar element

	$: {
		if (navColor && navbarElement) {
			navbarElement.style.backgroundColor = navColor;
		}
	}
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

	const props: IBaseButtonProps = {
		variant: ButtonVariants.Primary,
		size: ButtonSizes.Medium,
		tag: ButtonTags.Button,
		isOutline: false,
		isDisabled: false
	};

	interface Link {
		title: string;
		href: string;
		func?: () => void;
		sublinks?: Link[];
		needsAuth?: boolean;
	}

	const testLinks: Link[] = [
		{ title: 'sublink1', href: '/dashboard' },
		{ title: 'sublink2', href: '/test' }
	];

	const baseLinks: Link[] = [
		{ title: 'Dashboard', href: '/dashboard', sublinks: testLinks },
		{ title: 'Profile', href: '/profile' },
		{ title: 'Settings', href: '/settings', needsAuth: true },
		{ title: 'Tasks', href: '/tasks' },
		{ title: 'Test', href: '/test' },
		{ title: 'Auth', href: '#' }
	];
</script>

<nav class="side-navbar" bind:this={navbarElement}>
	{#each baseLinks as link}
		<BaseNavlink {link} />
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
		color: rgb(26, 226, 0);
		font: inherit;
		padding: 8px 16px;
		margin-bottom: 10px;
	}
	.link-button:hover {
		background-color: #555;
		cursor: pointer;
	}
</style>
