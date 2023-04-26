<!-- Navbar.svelte -->
<script>
    import { writable } from "svelte/store";
    import { navbarColor } from "./navbarStore";

    let navColor;
    navbarColor.subscribe((navbarColor) => {
        navColor = navbarColor;
    });
    // Write your JavaScript logic here, if needed
    const links = writable([
        { title: "Home", url: "/" },
        { title: "About", url: "/about" },
        { title: "Contact", url: "/contact" },
    ]);
    let navbarElement; // Add a reference for the navbar element

    $: {
        if (navColor && navbarElement) {
            navbarElement.style.backgroundColor = navColor;
        }
    }
</script>

<nav class="navbar" bind:this={navbarElement}>
    <a href="/" class="nav-link">Logo</a>
    <div>
        {#each $links as link}
            <a href={link.url} class="nav-link">{link.title}</a>
        {/each}
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
