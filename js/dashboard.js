/* ==========================================
   CEEZIX Dashboard Engine
========================================== */

const Dashboard={

timer:null,

init(){

this.clock();

this.network();

this.stats();

},

clock(){

const clock=document.getElementById("clock");

const today=document.getElementById("today");

if(!clock) return;

const update=()=>{

const now=new Date();

clock.textContent=

now.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit",

second:"2-digit"

});

today.textContent=

now.toDateString();

};

update();

this.timer=setInterval(update,1000);

},

network(){

const state=document.getElementById("networkState");

if(!state) return;

const update=()=>{

state.textContent=

navigator.onLine

?"🟢 Online"

:"🔴 Offline";

};

update();

window.addEventListener("online",update);

window.addEventListener("offline",update);

},

stats(){

const model=

localStorage.getItem(

"ceezix.activeModel"

)||"Gemma3";

const label=

document.getElementById("statModel");

if(label){

label.textContent=model;

}

}

};

window.Dashboard=Dashboard;
