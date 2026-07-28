/* ==========================================
   CEEZIX Application
========================================== */

const App={

version:"1.0.0",

async start(){

console.log(

"Starting CEEZIX..."

);

Theme.init();

await Router.init();

UI.init();

this.serviceWorker();

this.events();

Utils.toast(

"Welcome to CEEZIX"

);

},

serviceWorker(){

if(

"serviceWorker"

in navigator

){

navigator.serviceWorker

.register(

"./service-worker.js"

)

.then(()=>{

console.log(

"SW Ready"

);

})

.catch(console.error);

}

},

events(){

window.addEventListener(

"resize",

()=>{

console.log(

window.innerWidth,

window.innerHeight

);

}

);

}

};

window.addEventListener(

"DOMContentLoaded",

()=>{

App.start();

});
