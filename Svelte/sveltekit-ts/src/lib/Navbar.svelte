<!-- Navbar.svelte -->
<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { navbarColor } from './navbarStore';
	import { auth0ClientStore, isAuthenticatedStore } from './auth0Store.js';
	import BaseNavlink from './components/common/components/BaseNavlink/BaseNavlink.svelte';
	import type { IDropdownItemProps } from '$lib/components/common/components/BaseDropdown/DropdownItem/DropdownItem';
	import type { IBaseNavlinkProps } from '$lib/components/common/components/BaseNavlink/BaseNavlink';

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
	const testLinks: IDropdownItemProps[] = [
		{ value: 'sublink1', href: '/dashboard', isSelected: false, isVisible: true },
		{ value: 'sublink2', href: '/test', isSelected: false, isVisible: true }
	];

	const baseLinks: IBaseNavlinkProps[] = [
		{ title: 'Dashboard', href: '/dashboard', sublinks: testLinks },
		{ title: 'Profile', href: '/profile' },
		{ title: 'Settings', href: '/settings', needsAuth: true },
		{ title: 'Tasks', href: '/tasks' },
		{ title: 'Test', href: '/test' },
		{ title: 'About', href: '/about' },
		{ title: 'Contact', href: '/contact' },
		{ title: 'Blog', href: '/blog' },
		{ title: 'Auth', href: '#' }
	];
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary" bind:this={navbarElement}>
	<div class="container-fluid">
		<a href="/" class="navbar-brand">Logo</a>
		<div class="d-flex">
			{#each baseLinks as link}
				<BaseNavlink props={link} />
			{/each}
		</div>
		<form class="d-flex" role="search">
			<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
			<button class="btn btn-outline-success" type="submit">Search</button>
		</form>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		padding: 10px 20px;
	}

	.nav-link {
		color: white;
		text-decoration: none;
		padding: 8px 16px;
		margin-right: 10px;
	}

	.nav-link:last-child {
		margin-right: 0;
	}

	.nav-link:hover {
		background-color: #555;
		cursor: pointer;
	}
</style>
