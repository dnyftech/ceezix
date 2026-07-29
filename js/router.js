/* ==========================================
   CEEZIX Router v2
========================================== */

const Router={

cache:{},

current:null,

container:null,

async init(){

this.container=document.getElementById("content");

window.addEventListener(

"hashchange",

()=>{

const page=

location.hash.replace("#","")

||"dashboard";

this.open(page);

}

);

const start=

location.hash.replace("#","")

||"dashboard";

await this.open(start);

},

async fetch(page){

if(this.cache[page]){

return this.cache[page];

}

const response=

await fetch(`pages/${page}.html`);

if(!response.ok){

throw new Error(page);

}

const html=

await response.text();

this.cache[page]=html;

return html;

},

async open(page){

try{

const html=

await this.fetch(page);

this.container.classList.add("fade");

this.container.innerHTML=html;

this.current=page;

this.highlight(page);

if(window.UI){

UI.pageLoaded(page);

switch(page){

case "dashboard":

Dashboard?.init();

break;

case "workspace":

case "chat":

Chat?.init();

break;


Workspace?.init();

break;

}

}

history.replaceState(

{},

"",

"#"+page

);

}catch(error){

console.error(error);

this.container.innerHTML=`

<div class="card">

<h2>404</h2>

<p>

Page not found.

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
