<script>
    import { auth0ClientStore, isAuthenticatedStore } from "./auth0Store.js";

    let isAuthenticated = false;
    isAuthenticatedStore.subscribe(($isAuthenticated) => {
        isAuthenticated = $isAuthenticated;
    });
    let auth0Client;
    auth0ClientStore.subscribe(($auth0Client) => {
        auth0Client = $auth0Client;
    });
    let accessToken;
    let userProfile;
    async function getUserInfo(isAuthenticated) {
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
