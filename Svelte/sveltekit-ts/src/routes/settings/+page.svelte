<script lang="ts">
	import type { Auth0Client } from '@auth0/auth0-spa-js';
	import ColorPicker from '$lib/ColorPicker.svelte';
	import NavColorPicker from '$lib/NavColorPicker.svelte';
	import { auth0ClientStore } from '$lib/auth0Store';

	let auth0Client: Auth0Client;
	auth0ClientStore.subscribe(($auth0Client) => {
		auth0Client = $auth0Client;
	});
	let authUserProfile: any;
	let nickname: string = '';
	$: {
		authUserProfile = auth0Client.getUser();
		nickname = authUserProfile.nickname;
	}
</script>

<ColorPicker bind:nicknameProp={nickname} />
<NavColorPicker />
