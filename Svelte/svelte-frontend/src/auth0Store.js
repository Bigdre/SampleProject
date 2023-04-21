// auth0Store.js
import { writable } from "svelte/store";
import jwt_decode from "jwt-decode";

export const auth0ClientStore = writable(null);
export const isAuthenticatedStore = writable(null);
export const userProfileStore = writable({});
export const userPermissionsStore = writable([]);

export async function initializeAuth0Client(client) {
    console.log("initializeAuth0Client");
    auth0ClientStore.set(client);
    if (await client.isAuthenticated()) {
        updateUser(client);
    }
}

async function updateUser(client) {
    console.log("updateUser");
    const user = await client.getUser();
    userProfileStore.set(user);

    const token = await client.getTokenSilently();
    const decodedAccessToken = jwt_decode(token);
    console.log("token :", decodedAccessToken);
    console.log("tokenpermissions :", decodedAccessToken.permissions);
    if (decodedAccessToken && decodedAccessToken.permissions) {
        console.log("User permissions:", decodedAccessToken.permissions);
        userPermissionsStore.set(decodedAccessToken.permissions);
    }
}
