const Router={

content:null,

async init(){

this.content=document.getElementById("content");

this.open("dashboard");

document

.querySelectorAll("[data-page]")

.forEach(item=>{

item.onclick=()=>{

this.open(item.dataset.page);

};

});

},

async open(page){

try{

const html=

await fetch(`pages/${page}.html`);

this.content.innerHTML=

await html.text();

if(window.UI){

UI.pageLoaded(page);

}

}catch(e){

this.content.innerHTML=`

<h2>Page not found</h2>

`;

}

}

};
