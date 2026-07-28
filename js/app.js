/*
========================================
 CEEZIX
========================================
*/

window.addEventListener("DOMContentLoaded", () => {

    Theme.init();

    Router.init();

    UI.init();

    Utils.toast("Welcome to CEEZIX");

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {

                console.log("Service Worker Ready");

            })
            .catch(console.error);

    }

});
