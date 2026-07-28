/*
========================================
 Theme Manager
========================================
*/

const Theme = {

    init() {

        const saved =
            Storage.get("theme", "dark");

        this.set(saved);

    },

    set(theme) {

        document.body.dataset.theme = theme;

        Storage.set("theme", theme);

    },

    toggle() {

        const current =
            document.body.dataset.theme;

        this.set(
            current === "dark"
                ? "light"
                : "dark"
        );

    }

};
