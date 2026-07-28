/*
========================================
 API
========================================
*/

const API = {

    BASE: "./data",

    async json(file) {

        const response = await fetch(
            `${this.BASE}/${file}`
        );

        return await response.json();

    }

};
