const UI={

init(){

this.sidebar();

this.theme();

},

const fab=document.getElementById("fab");

if(fab){

fab.onclick=()=>{

Router.open("chat");

};

}

pageLoaded(page){

console.log(page);

if(page==="chat"){

this.chat();

}

},

document

.querySelectorAll(".card[data-page]")

.forEach(card=>{

card.onclick=()=>{

Router.open(card.dataset.page);



};

});

document

.querySelectorAll("[data-page]")

.forEach(item=>{

item.classList.remove("active");

if(item.dataset.page===page){

item.classList.add("active");

}

});

sidebar(){

const menu=document.getElementById("menuBtn");

const sidebar=document.getElementById("sidebar");

if(menu){

menu.onclick=()=>{

sidebar.classList.toggle("active");

};

}

},

theme(){

const btn=document.getElementById("themeBtn");

if(btn){

btn.onclick=()=>Theme.toggle();

}

},

chat(){

const input=document.getElementById("prompt");

const send=document.getElementById("sendBtn");

const chat=document.getElementById("chatWindow");

if(!send)return;

send.onclick=()=>{

const text=input.value.trim();

if(!text)return;

chat.innerHTML+=`

<div class="message user">

${text}

</div>

`;

input.value="";

chat.scrollTop=chat.scrollHeight;

setTimeout(()=>{

chat.innerHTML+=`

<div class="message ai">

Thinking...

</div>

`;

chat.scrollTop=chat.scrollHeight;

},500);

};

}

};
