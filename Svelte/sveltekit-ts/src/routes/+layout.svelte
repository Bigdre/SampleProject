<script lang="ts">
    import Test from "$lib/Test.svelte";
</script>

<main>
    <Test />
    <slot></slot>
</main>

<style>
    main {
        display: flex;
    }
</style>