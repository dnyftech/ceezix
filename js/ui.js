/*
========================================
 UI Manager
========================================
*/

const UI = {

    init() {

        this.menu();

        this.theme();

    },

    menu() {

        const menu =
            document.getElementById("menuBtn");

        const sidebar =
            document.getElementById("sidebar");

        if (!menu || !sidebar)
            return;

        menu.onclick = () => {

            sidebar.classList.toggle("active");

        };

    },

    theme() {

        const button =
            document.getElementById("themeBtn");

        if (!button)
            return;

        button.onclick = () => {

            Theme.toggle();

        };

    }

};
