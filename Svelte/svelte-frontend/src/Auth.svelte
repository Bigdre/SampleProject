<!-- Auth.svelte -->

<script>
    import { onMount } from "svelte";
    import { Auth0Client } from "@auth0/auth0-spa-js";
    import {
        auth0ClientStore,
        isAuthenticatedStore,
        userPermissionsStore,
        initializeAuth0Client,
    } from "./auth0Store.js";

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
    let authUserProfile;

    let nickname = "";

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

        accessToken = await auth0Client.getTokenSilently();
        authUserProfile = await auth0Client.getUser();
        nickname = authUserProfile.nickname;

        if (isAuthenticated) {
            userProfile = JSON.stringify(authUserProfile, null, 2);
            const tokenClaims = await auth0Client.getTokenSilently();
            if (tokenClaims && tokenClaims.permissions) {
                userPermissionsStore.set(tokenClaims.permissions);
            }
        } else {
            try {
                userProfile = JSON.stringify(
                    await auth0Client.getUser(),
                    null,
                    2
                );
                isAuthenticated = true;
                isAuthenticatedStore.set(isAuthenticated);
            } catch (err) {
                console.log("Failed to retrieve session:", err);
            }
        }
        await initializeAuth0Client(auth0Client);
    });
</script>
