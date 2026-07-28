/* ==========================================
   CEEZIX UI
========================================== */

const UI={

init(){

this.sidebar();

this.theme();

this.fab();

this.network();

},

pageLoaded(page){

console.log(

"Loaded:",

page

);

this.bindCards();

this.chat();

},

sidebar(){

const menu=$("#menuBtn");

const sidebar=$("#sidebar");

if(!menu||!sidebar)return;

menu.onclick=()=>{

sidebar.classList.toggle(

"active"

);

};

},

theme(){

const btn=$("#themeBtn");

if(!btn)return;

btn.onclick=()=>{

Theme.toggle();

};

},

fab(){

const fab=$("#fab");

if(!fab)return;

fab.onclick=()=>{

Router.open("chat");

};

},

bindCards(){

$$("[data-page]")

.forEach(card=>{

card.onclick=()=>{

Router.open(

card.dataset.page

);

};

});

},

chat(){

const input=$("#prompt");

const send=$("#sendBtn");

const chat=$("#chatWindow");

if(!input||!send||!chat)

return;

send.onclick=()=>{

const text=input.value.trim();

if(!text)return;

chat.innerHTML+=`

<div class="message user">

${text}

</div>

`;

input.value="";

chat.scrollTop=

chat.scrollHeight;

setTimeout(()=>{

chat.innerHTML+=`

<div class="message ai">

Hello 👋

I'm CEEZIX AI.

</div>

`;

chat.scrollTop=

chat.scrollHeight;

},700);

};

},

network(){

window.addEventListener(

"online",

()=>Utils.toast(

"Back Online"

)

);

window.addEventListener(

"offline",

()=>Utils.toast(

"Offline"

)

);

}

};

window.UI=UI;

document

.addEventListener(

"click",

e=>{

const page=

e.target.closest("[data-page]");

if(!page)return;

e.preventDefault();

Router.open(

page.dataset.page

);

}

);

