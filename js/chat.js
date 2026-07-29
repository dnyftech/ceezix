/* ==========================================
   CEEZIX Chat Engine
========================================== */

const Chat={

messages:[],

window:null,

input:null,

button:null,

init(){

this.window=document.getElementById("chatWindow");
this.input=document.getElementById("prompt");
this.button=document.getElementById("sendBtn");

if(!this.window||!this.input||!this.button){

return;

}

this.restore();

this.bind();

},

bind(){

this.button.onclick=()=>this.send();

this.input.addEventListener("keydown",e=>{

if(e.key==="Enter"&&!e.shiftKey){

e.preventDefault();

this.send();

}

});

},

send(){

const text=this.input.value.trim();

if(!text) return;

this.add("user",text);

this.input.value="";

this.reply(text);

},

reply(prompt){

this.typing(true);

setTimeout(()=>{

this.typing(false);

this.add(

"ai",

"Received: "+prompt+"\n\nAI provider integration will be connected later."

);

},800);

},

add(role,text){

const div=document.createElement("div");

div.className="message "+role;

div.textContent=text;

this.window.appendChild(div);

this.window.scrollTop=this.window.scrollHeight;

this.messages.push({role,text});

this.save();

},

typing(show){

let node=document.getElementById("typingIndicator");

if(show){

if(node) return;

node=document.createElement("div");

node.id="typingIndicator";

node.className="typing";

node.innerHTML="<span></span><span></span><span></span>";

this.window.appendChild(node);

this.window.scrollTop=this.window.scrollHeight;

}else if(node){

node.remove();

}

},

save(){

localStorage.setItem(

"ceezix.chat",

JSON.stringify(this.messages)

);

},

restore(){

const data=localStorage.getItem("ceezix.chat");

if(!data) return;

try{

this.messages=JSON.parse(data);

this.window.innerHTML="";

this.messages.forEach(m=>{

const div=document.createElement("div");

div.className="message "+m.role;

div.textContent=m.text;

this.window.appendChild(div);

});

}catch(e){

console.error(e);

}

}

};

window.Chat=Chat;
