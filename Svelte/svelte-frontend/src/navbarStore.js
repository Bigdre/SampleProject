// export const navbarColor = writable("");

// navbarStore.js
import { writable } from "svelte/store";

const storedNavbarColor = localStorage.getItem("navbarColor") || "#333";
const navbarColorStore = writable(storedNavbarColor);

// Custom store to handle updates and localStorage
const navbarColor = {
    subscribe: navbarColorStore.subscribe,
    set: (color) => {
        localStorage.setItem("navbarColor", color);
        navbarColorStore.set(color);
    },
};

export { navbarColor };
