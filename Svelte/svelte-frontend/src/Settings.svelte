<script>
    import ColorPicker from "./ColorPicker.svelte";
    import NavColorPicker from "./NavColorPicker.svelte";
    import { auth0ClientStore } from "./auth0Store.js";

    let auth0Client;
    auth0ClientStore.subscribe(($auth0Client) => {
        auth0Client = $auth0Client;
    });
    let authUserProfile;
    let nickname = "";
    $: {
        authUserProfile = auth0Client.getUser();
        nickname = authUserProfile.nickname;
    }
</script>

<ColorPicker bind:nicknameProp={nickname} />
<NavColorPicker />
