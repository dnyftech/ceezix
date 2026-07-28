/* ==========================================
   CEEZIX Router
========================================== */

const Router={

current:"dashboard",

container:null,

async init(){

this.container=document.getElementById("content");

await this.open("dashboard");

this.bind();

},

bind(){

document

.querySelectorAll("[data-page]")

.forEach(button=>{

button.onclick=()=>{

this.open(

button.dataset.page

);

};

});

},

async open(page){

try{

this.current=page;

const response=

await fetch(

`pages/${page}.html`

);

const html=

await response.text();

this.container.innerHTML=html;

this.highlight(page);

if(window.UI){

UI.pageLoaded(page);

}

history.replaceState(

{page},

"",

"#"+page

);

}catch(e){

console.error(e);

this.container.innerHTML=`

<div class="card">

<h2>404</h2>

<p>

Unable to load page.

</p>

</div>

`;

}

},

highlight(page){

document

.querySelectorAll("[data-page]")

.forEach(item=>{

item.classList.remove("active");

if(item.dataset.page===page){

item.classList.add("active");

}

});

}

};

window.Router=Router;
