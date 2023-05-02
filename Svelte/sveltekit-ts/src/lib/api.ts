// api.ts
import axios from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"; // Modify import statement
import type { Auth0Client } from "@auth0/auth0-spa-js";
import { auth0ClientStore } from "./auth0Store";


let client: Auth0Client;
auth0ClientStore.subscribe(($auth0Client: Auth0Client) => {
    client = $auth0Client;
});

const api = axios.create({
    baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        if (client) {
            const token = await client.getTokenSilently();
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config as InternalAxiosRequestConfig; // Add type assertion here
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
