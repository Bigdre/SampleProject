<!-- Auth.svelte -->

<script>
    import { onMount } from "svelte";
    import { Auth0Client } from "@auth0/auth0-spa-js";
    import Tasks from "./Tasks.svelte";
    import ColorPicker from "./ColorPicker.svelte";
    import {
        auth0ClientStore,
        isAuthenticatedStore,
        userPermissionsStore,
        initializeAuth0Client,
    } from "./auth0Store.js";
    import NavColorPicker from "./NavColorPicker.svelte";

    let auth0Client;
    auth0ClientStore.subscribe(($auth0Client) => {
        auth0Client = $auth0Client;
    });

    let isAuthenticated = false;
    isAuthenticatedStore.subscribe(($isAuthenticated) => {
        isAuthenticated = $isAuthenticated;
    });
    let accessToken = "";
    let userProfile = "";
    let nickname = "";

    let permissionsLoaded = false;
    userPermissionsStore.subscribe(($userPermissions) => {
        if ($userPermissions && $userPermissions.length > 0) {
            permissionsLoaded = true;
        }
    });

    onMount(async () => {
        auth0Client = new Auth0Client({
            domain: "dev-znph8s0me1vxsurp.us.auth0.com",
            client_id: "6pZES3G7n6histIJNFBI1WGsDPUKu3zD",
            audience: "http://localhost",
            scope: "openid profile email permissions",
        });
        auth0ClientStore.set(auth0Client);

        if (new URLSearchParams(window.location.search).has("code")) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, "/");
        }

        isAuthenticated = await auth0Client.isAuthenticated();
        isAuthenticatedStore.set(isAuthenticated);

        if (isAuthenticated) {
            accessToken = await auth0Client.getTokenSilently();
            let authUserProfile = await auth0Client.getUser();
            userProfile = JSON.stringify(authUserProfile, null, 2);
            nickname = authUserProfile.nickname;
            const tokenClaims = await auth0Client.getTokenSilently();
            if (tokenClaims && tokenClaims.permissions) {
                userPermissionsStore.set(tokenClaims.permissions);
            }
        } else {
            await checkSession();
        }
        await initializeAuth0Client(auth0Client);
    });

    async function checkSession() {
        try {
            await auth0Client.getTokenSilently();
            let authUserProfile = await auth0Client.getUser();
            nickname = authUserProfile.nickname;
            isAuthenticated = true;
            isAuthenticatedStore.set(isAuthenticated);
            userProfile = JSON.stringify(await auth0Client.getUser(), null, 2);
        } catch (err) {
            console.log("Failed to retrieve session:", err);
        }
    }

    async function login() {
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.origin,
        });
    }

    function logout() {
        auth0Client.logout({
            returnTo: window.location.origin,
        });
    }
</script>

<div class="auth">
    <h2>SPA Authentication Sample</h2>
    <p>Welcome to our page!</p>
    {#if isAuthenticated}
        <button on:click={logout}>Log out</button>
        <ColorPicker bind:nicknameProp={nickname} />
        <NavColorPicker />
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
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
                User profile:
                <pre>{@html userProfile}</pre>
            </label>
        </div>
        {#if isAuthenticated && permissionsLoaded}
            <Tasks />
        {/if}
    {:else}
        <button on:click={login}>Log in</button>
    {/if}
</div>

<style>
    /* Your app styles here */
    .auth {
        margin-left: 230px; /* same as the width of the side navbar */
        padding: 20px;
    }
</style>
