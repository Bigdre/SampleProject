<!-- App.svelte -->

<script>
    import Router from "svelte-spa-router";
    import Auth from "./Auth.svelte";
    import Navbar from "./Navbar.svelte";
    import SideNavbar from "./SideNavbar.svelte";
    import Dashboard from "./Dashboard.svelte";
    import Profile from "./Profile.svelte";
    import Settings from "./Settings.svelte";
    import Tasks from "./Tasks.svelte";
    import { isAuthenticatedStore } from "./auth0Store.js";

    const routes = {
        "/": Dashboard,
        "/dashboard": Dashboard,
        "/profile": Profile,
        "/settings": Settings,
        "/tasks": Tasks,
    };

    let isAuthenticated = false;
    isAuthenticatedStore.subscribe(($isAuthenticated) => {
        isAuthenticated = $isAuthenticated;
    });
</script>

<Auth />
<Navbar />
<SideNavbar />
<main>
    {#if isAuthenticated}
        <section class="main-content">
            <Router {routes} />
        </section>
    {/if}
</main>

<style>
    main {
        display: flex;
    }

    .main-content {
        margin-left: 240px;
        padding: 20px;
        width: calc(100% - 200px);
    }
</style>
