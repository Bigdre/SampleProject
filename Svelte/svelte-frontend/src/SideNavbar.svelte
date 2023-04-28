<!-- SideNavbar.svelte -->
<script>
    import { writable, get } from "svelte/store";
    import { navbarColor } from "./navbarStore";
    import { auth0ClientStore, isAuthenticatedStore } from "./auth0Store.js";
    import { push } from "svelte-spa-router";

    let navColor;
    navbarColor.subscribe((navbarColor) => {
        navColor = navbarColor;
    });

    let auth0Store;
    auth0ClientStore.subscribe((auth0ClientStore) => {
        auth0Store = auth0ClientStore;
    });

    let isAuthenticated;
    isAuthenticatedStore.subscribe((isAuthenticatedStore) => {
        isAuthenticated = isAuthenticatedStore;
    });

    function logout() {
        auth0Store.logout({
            returnTo: window.location.origin,
        });
    }

    async function login() {
        await auth0Store.loginWithRedirect({
            redirect_uri: window.location.origin,
        });
    }

    const baseLinks = [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Profile", url: "/profile" },
        { title: "Settings", url: "/settings" },
        { title: "Tasks", url: "/tasks" },
    ];
    const sideLinks = writable(baseLinks);

    function updateSideLinks(authenticated) {
        if (authenticated) {
            sideLinks.set([
                ...baseLinks,
                { title: "Logout", url: "#", func: logout },
            ]);
        } else {
            sideLinks.set([
                ...baseLinks,
                { title: "Login", url: "#", func: login },
            ]);
        }
    }

    $: {
        updateSideLinks(isAuthenticated);
    }

    let navbarElement; // Add a reference for the navbar element

    $: {
        if (navColor && navbarElement) {
            navbarElement.style.backgroundColor = navColor;
        }
    }
</script>

<nav class="side-navbar" bind:this={navbarElement}>
    {#each $sideLinks as link}
        <a
            href="javascript:void(0);"
            class="side-nav-link"
            on:click={() => {
                if (link.func) {
                    link.func();
                } else {
                    push(link.url);
                }
            }}
        >
            {link.title}
        </a>
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

    .side-nav-link {
        color: white;
        text-decoration: none;
        padding: 8px 16px;
        margin-bottom: 10px;
    }

    .side-nav-link:hover {
        background-color: #555;
        cursor: pointer;
    }
</style>
