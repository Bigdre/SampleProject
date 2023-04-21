// api.js

import axios from "axios";
import { auth0ClientStore } from "./auth0Store.js";

let client;
auth0ClientStore.subscribe(($auth0Client) => {
    client = $auth0Client;
});

const api = axios.create({
    baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
    async (config) => {
        if (client) {
            const token = await client.getTokenSilently();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
