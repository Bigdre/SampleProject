// auth0Store.ts
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import jwt_decode from 'jwt-decode';

export const auth0ClientStore: Writable<any> = writable(null); // Replace 'any' with the appropriate type for your Auth0 client
export const isAuthenticatedStore: Writable<boolean | null> = writable(null);
export const userProfileStore: Writable<any> = writable({}); // Replace 'any' with the appropriate type for the user profile
export const userPermissionsStore: Writable<string[]> = writable([]);

interface DecodedAccessToken {
    permissions?: string[];
    // Add any other properties from the decoded access token that you need
}

export async function initializeAuth0Client(client: any): Promise<void> { // Replace 'any' with the appropriate type for your Auth0 client
    console.log('initializeAuth0Client');
    auth0ClientStore.set(client);
    if (await client.isAuthenticated()) {
        updateUser(client);
    }
}

async function updateUser(client: any): Promise<void> { // Replace 'any' with the appropriate type for your Auth0 client
    console.log('updateUser');
    const user = await client.getUser();
    userProfileStore.set(user);

    const token = await client.getTokenSilently();
    const decodedAccessToken: DecodedAccessToken = jwt_decode(token);
    console.log('token :', decodedAccessToken);
    console.log('tokenpermissions :', decodedAccessToken.permissions);
    if (decodedAccessToken && decodedAccessToken.permissions) {
        console.log('User permissions:', decodedAccessToken.permissions);
        userPermissionsStore.set(decodedAccessToken.permissions);
    }
}
