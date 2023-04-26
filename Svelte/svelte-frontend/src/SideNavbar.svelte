<!-- SideNavbar.svelte -->
<script>
    import { writable } from "svelte/store";
    import { navbarColor } from "./navbarStore";

    let navColor;
    navbarColor.subscribe((navbarColor) => {
        navColor = navbarColor;
    });

    // Write your JavaScript logic here, if needed
    const sideLinks = writable([
        { title: "Dashboard", url: "/dashboard" },
        { title: "Profile", url: "/profile" },
        { title: "Settings", url: "/settings" },
        { title: "Tasks", url: "/tasks" },
        { title: "Logout", url: "/logout" },
    ]);

    let navbarElement; // Add a reference for the navbar element

    $: {
        if (navColor && navbarElement) {
            navbarElement.style.backgroundColor = navColor;
        }
    }
</script>

<nav class="side-navbar" bind:this={navbarElement}>
    {#each $sideLinks as link}
        <a href={link.url} class="side-nav-link">{link.title}</a>
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
