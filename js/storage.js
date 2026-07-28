/*
========================================
 Local Storage Manager
========================================
*/

const Storage = {

    set(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },

    get(key, fallback = null) {

        const value = localStorage.getItem(key);

        if (!value)
            return fallback;

        try {

            return JSON.parse(value);

        } catch {

            return fallback;

        }

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }

};
