/*
========================================
 Router
========================================
*/

const Router = {

    current: "dashboard",

    init() {

        this.bind();

    },

    bind() {

        document
            .querySelectorAll("[data-page]")
            .forEach(button => {

                button.onclick = () => {

                    this.open(
                        button.dataset.page
                    );

                };

            });

    },

    open(page) {

        this.current = page;

        Utils.toast(page);

        console.log("Open:", page);

    }

};
