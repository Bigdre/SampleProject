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
    async function getUserInfo(isAuthenticated) {
        accessToken = await auth0Client.getTokenSilently();
    }

    $: {
        getUserInfo(isAuthenticated);
    }
</script>

<div class="auth">
    <h2>SPA Authentication Sample</h2>
    <p>Welcome to our page!</p>
    {#if isAuthenticated}
        <div>
            <p>
                You're seeing this content because you're currently <strong
                    >logged in</strong
                >.
            </p>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
                Access token:
                <pre>{@html accessToken}</pre>
            </label>
        </div>
    {/if}
</div>

<style>
    /* Your app styles here */
</style>
