<script lang="ts">
	import type { Auth0Client } from '@auth0/auth0-spa-js';
	import { auth0ClientStore, isAuthenticatedStore } from './auth0Store';

	let isAuthenticated: boolean;
	isAuthenticatedStore.subscribe((isAuthenticatedStore: boolean | null) => {
		isAuthenticated = isAuthenticatedStore ?? false;
	});

	let auth0Client: Auth0Client;
	auth0ClientStore.subscribe(($auth0Client: Auth0Client) => {
		auth0Client = $auth0Client;
	});

	let accessToken: string;
	let userProfile: string;
	async function getUserInfo(isAuthenticated: boolean) {
		accessToken = await auth0Client.getTokenSilently();
		userProfile = JSON.stringify(await auth0Client.getUser(), null, 2);
	}

	$: {
		getUserInfo(isAuthenticated);
	}
</script>

<div class="auth">
	<div>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			User profile:
			<pre>{@html userProfile}</pre>
		</label>
	</div>
</div>

<style>
	/* Your app styles here */
</style>
