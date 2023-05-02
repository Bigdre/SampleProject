// export const navbarColor = writable("");

// navbarStore.js
import { writable } from 'svelte/store';

const isSSR = typeof window === 'undefined';

const storedNavbarColor = !isSSR ? localStorage.getItem('navbarColor') || '#333' : '#333';
const navbarColorStore = writable(storedNavbarColor);

// Custom store to handle updates and localStorage
const navbarColor = {
    subscribe: navbarColorStore.subscribe,
    set: (color: string) => {
        if (!isSSR) {
            localStorage.setItem('navbarColor', color);
        }
        navbarColorStore.set(color);
    },
};

export { navbarColor };