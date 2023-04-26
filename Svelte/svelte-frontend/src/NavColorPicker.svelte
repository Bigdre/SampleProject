<!-- NavColorPicker.svelte -->
<script>
    import { navbarColor } from "./navbarStore";
    let navColor;

    function updateNavbarColor() {
        navbarColor.set(navColor);
    }
</script>

<label for="colorPicker">Choose a Navbar color:</label>
<input
    type="color"
    id="colorPicker"
    bind:value={navColor}
    on:input={updateNavbarColor}
/>
