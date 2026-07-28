const UI={

init(){

this.sidebar();

this.theme();

},

pageLoaded(page){

console.log(page);

if(page==="chat"){

this.chat();

}

},

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
