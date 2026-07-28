/*
========================================
 CEEZIX Utility Library
========================================
*/

const Utils = {

    $(selector) {
        return document.querySelector(selector);
    },

    $$(selector) {
        return document.querySelectorAll(selector);
    },

    create(tag, className = "") {

        const element = document.createElement(tag);

        if (className)
            element.className = className;

        return element;
    },

    on(element, event, callback) {

        if (!element) return;

        element.addEventListener(event, callback);

    },

    show(element) {

        if (!element) return;

        element.classList.remove("hidden");

    },

    hide(element) {

        if (!element) return;

        element.classList.add("hidden");

    },

    toggle(element) {

        if (!element) return;

        element.classList.toggle("hidden");

    },

    toast(message, duration = 2500) {

        let toast = document.getElementById("toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.id = "toast";

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, duration);

    },

    uuid() {

        return crypto.randomUUID();

    },

    time() {

        return new Date().toLocaleTimeString();

    },

    date() {

        return new Date().toLocaleDateString();

    },

    copy(text) {

        navigator.clipboard.writeText(text);

    }

};
