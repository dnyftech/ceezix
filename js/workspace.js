/* ==========================================
   CEEZIX Workspace Pro
   Part 1
========================================== */

const Workspace={

files:{},

tabs:[],

active:null,

editor:null,

terminal:null,

autosaveTimer:null,

init(){

this.editor=document.getElementById("codeEditor");

this.terminal=document.getElementById("terminalOutput");

if(!this.editor) return;

this.restore();

this.bind();

this.log("Workspace initialized");

},

bind(){

const save=document.getElementById("saveBtn");
const run=document.getElementById("runBtn");
const format=document.getElementById("formatBtn");

if(save){

save.onclick=()=>this.save();

}

if(run){

run.onclick=()=>this.run();

}

if(format){

format.onclick=()=>this.format();

}

this.editor.addEventListener(

"input",

()=>{

clearTimeout(this.autosaveTimer);

this.autosaveTimer=setTimeout(

()=>this.save(),

800

);

}

);

document.addEventListener(

"keydown",

e=>{

if(e.ctrlKey&&e.key==="s"){

e.preventDefault();

this.save();

}

if(e.ctrlKey&&e.key==="r"){

e.preventDefault();

this.run();

}

if(e.ctrlKey&&e.key==="f"){

e.preventDefault();

this.find();

}

}

);

},

save(){

localStorage.setItem(

"workspace.editor",

this.editor.value

);

this.log("Saved");

if(window.Utils){

Utils.toast("Saved");

}

},

restore(){

const code=

localStorage.getItem(

"workspace.editor"

);

if(code){

this.editor.value=code;

this.log("Session restored");

}

},

run(){

this.log("Running project...");

setTimeout(()=>{

this.log("Execution completed.");

},600);

},

format(){

this.editor.value=

this.editor.value

.replace(/\t/g,"    ")
.trim();

this.log("Formatting complete");

},

find(){

const term=

prompt("Find");

if(!term) return;

const pos=

this.editor.value.indexOf(term);

if(pos<0){

this.log("Not found");

return;

}

this.editor.focus();

this.editor.setSelectionRange(

pos,

pos+term.length

);

this.log("Found: "+term);

},

log(message){

if(!this.terminal) return;

const time=

new Date()

.toLocaleTimeString();

this.terminal.textContent+=

"\n["+time+"] "+message;

this.terminal.scrollTop=

this.terminal.scrollHeight;

}

};

window.Workspace=Workspace;

document.addEventListener(

"DOMContentLoaded",

()=>{

Workspace.init();

});


/* ==========================================
   CEEZIX Workspace Pro
   Part 2
   Tabs & Explorer
========================================== */

Object.assign(Workspace,{

openFile(name,content=""){

if(!this.files[name]){

this.files[name]=content;

}

if(!this.tabs.includes(name)){

this.tabs.push(name);

}

this.active=name;

this.renderTabs();

this.editor.value=this.files[name];

this.log("Opened "+name);

},

closeFile(name){

const index=this.tabs.indexOf(name);

if(index>-1){

this.tabs.splice(index,1);

}

if(this.active===name){

this.active=this.tabs[0]||null;

}

this.renderTabs();

if(this.active){

this.editor.value=this.files[this.active];

}else{

this.editor.value="";

}

},

renderTabs(){

const bar=document.querySelector(".editor-tabs");

if(!bar) return;

bar.innerHTML="";

this.tabs.forEach(name=>{

const tab=document.createElement("button");

tab.className="tab";

if(name===this.active){

tab.classList.add("active");

}

tab.innerHTML=`

<span>${name}</span>

<span class="close-tab"

data-close="${name}">

×</span>

`;

tab.onclick=()=>{

this.active=name;

this.editor.value=this.files[name];

this.renderTabs();

};

bar.appendChild(tab);

});

document

.querySelectorAll(".close-tab")

.forEach(button=>{

button.onclick=(event)=>{

event.stopPropagation();

this.closeFile(

button.dataset.close

);

};

});

},

bindExplorer(){

document

.querySelectorAll(".file")

.forEach(file=>{

file.onclick=()=>{

const name=

file.textContent

.trim();

this.openFile(

name,

this.files[name]||

""

);

document

.querySelectorAll(".file")

.forEach(item=>{

item.classList.remove("active");

});

file.classList.add("active");

};

});

document

.querySelectorAll(".folder>span")

.forEach(folder=>{

folder.onclick=()=>{

folder.parentElement

.classList.toggle("open");

};

});

},

rememberActive(){

if(this.active){

localStorage.setItem(

"workspace.active",

this.active

);

}

},

restoreActive(){

const active=

localStorage.getItem(

"workspace.active"

);

if(active){

this.openFile(active);

}

}

});

const originalInit=Workspace.init.bind(Workspace);

Workspace.init=function(){

originalInit();

this.bindExplorer();

this.restoreActive();

if(this.tabs.length===0){

this.openFile(

"index.html",

this.editor.value

);

}

};

const originalSave=Workspace.save.bind(Workspace);

Workspace.save=function(){

if(this.active){

this.files[this.active]=

this.editor.value;

this.rememberActive();

localStorage.setItem(

"workspace.files",

JSON.stringify(this.files)

);

}

originalSave();

};

const storedFiles=

localStorage.getItem(

"workspace.files"

);

if(storedFiles){

try{

Workspace.files=

JSON.parse(storedFiles);

}catch(e){

console.error(e);

}

}


/* ==========================================
   CEEZIX Workspace Pro
   Part 3
   Search • History • Shortcuts
========================================== */

Object.assign(Workspace,{

history:[],

historyIndex:-1,

modified:false,

record(){

if(!this.editor) return;

const value=this.editor.value;

if(

this.historyIndex>=0 &&

this.history[this.historyIndex]===value

){

return;

}

this.history=

this.history.slice(

0,

this.historyIndex+1

);

this.history.push(value);

this.historyIndex=

this.history.length-1;

},

undo(){

if(this.historyIndex<=0) return;

this.historyIndex--;

this.editor.value=

this.history[this.historyIndex];

this.log("Undo");

},

redo(){

if(

this.historyIndex>=

this.history.length-1

) return;

this.historyIndex++;

this.editor.value=

this.history[this.historyIndex];

this.log("Redo");

},

copy(){

navigator.clipboard.writeText(

this.editor.value

);

this.log("Copied");

},

search(text){

if(!text) return;

const items=

document.querySelectorAll(

".file"

);

items.forEach(item=>{

const show=

item.textContent

.toLowerCase()

.includes(

text.toLowerCase()

);

item.style.display=

show

?"flex"

:"none";

});

},

updateStatus(){

const status=

document.getElementById(

"workspaceStatus"

);

if(!status) return;

status.textContent=

this.modified

?"Modified"

:"Saved";

}

});

const previousBind=

Workspace.bind.bind(Workspace);

Workspace.bind=function(){

previousBind();

this.record();

this.editor.addEventListener(

"input",

()=>{

this.modified=true;

this.record();

this.updateStatus();

}

);

document.addEventListener(

"keydown",

e=>{

if(e.ctrlKey&&e.key==="z"){

e.preventDefault();

this.undo();

}

if(e.ctrlKey&&e.key==="y"){

e.preventDefault();

this.redo();

}

if(e.ctrlKey&&e.shiftKey&&e.key==="C"){

e.preventDefault();

this.copy();

}

}

);

};

const oldSave=

Workspace.save.bind(Workspace);

Workspace.save=function(){

oldSave();

this.modified=false;

this.updateStatus();

};


/* ==========================================
   CEEZIX Workspace Pro
   Part 4
   Command Palette • Recovery • Performance
========================================== */

Object.assign(Workspace,{

palette:null,

createPalette(){

if(document.getElementById("commandPalette")) return;

const palette=document.createElement("div");

palette.id="commandPalette";

palette.className="modal";

palette.innerHTML=`

<div class="modal-content">

<h3>Command Palette</h3>

<input id="commandInput"

class="input"

placeholder="Type a command...">

<div id="commandResults"></div>

</div>

`;

document.body.appendChild(palette);

this.palette=palette;

const input=palette.querySelector("#commandInput");

const results=palette.querySelector("#commandResults");

const commands=[

{label:"Save File",action:()=>this.save()},

{label:"Run Project",action:()=>this.run()},

{label:"Format Code",action:()=>this.format()},

{label:"Undo",action:()=>this.undo()},

{label:"Redo",action:()=>this.redo()},

{label:"Open Dashboard",action:()=>Router.open("dashboard")},

{label:"Open Chat",action:()=>Router.open("chat")},

{label:"Open Files",action:()=>Router.open("files")},

{label:"Open Models",action:()=>Router.open("models")},

{label:"Open Settings",action:()=>Router.open("settings")}

];

function render(filter=""){

results.innerHTML="";

commands

.filter(cmd=>cmd.label.toLowerCase().includes(filter.toLowerCase()))

.forEach(cmd=>{

const button=document.createElement("button");

button.className="btn";

button.style.width="100%";

button.style.marginTop="8px";

button.textContent=cmd.label;

button.onclick=()=>{

palette.classList.remove("active");

cmd.action();

};

results.appendChild(button);

});

}

render();

input.oninput=()=>render(input.value);

},

togglePalette(){

if(!this.palette){

this.createPalette();

}

this.palette.classList.toggle("active");

const input=document.getElementById("commandInput");

if(input){

setTimeout(()=>input.focus(),50);

}

},

bindShortcuts(){

document.addEventListener("keydown",e=>{

if(e.ctrlKey&&e.key.toLowerCase()==="k"){

e.preventDefault();

this.togglePalette();

}

if(e.key==="Escape"&&this.palette){

this.palette.classList.remove("active");

}

});

},

recover(){

const session=localStorage.getItem("workspace.editor");

if(session&&!this.editor.value){

this.editor.value=session;

this.log("Recovered previous session");

}

},

updateCursor(){

const info=document.getElementById("cursorInfo");

if(!info||!this.editor) return;

const pos=this.editor.selectionStart;

const text=this.editor.value.substring(0,pos);

const lines=text.split("\n");

const line=lines.length;

const col=lines[lines.length-1].length+1;

info.textContent=`Ln ${line}, Col ${col}`;

},

optimize(){

window.addEventListener("beforeunload",()=>{

this.save();

});

setInterval(()=>{

if(this.modified){

this.save();

}

},30000);

}

});

const originalWorkspaceInit=Workspace.init.bind(Workspace);

Workspace.init=function(){

originalWorkspaceInit();

this.createPalette();

this.bindShortcuts();

this.recover();

this.optimize();

this.editor.addEventListener("keyup",()=>this.updateCursor());

this.editor.addEventListener("click",()=>this.updateCursor());

this.updateCursor();

this.log("Workspace Pro Ready");

};


const originalOpenFile=Workspace.openFile.bind(Workspace);

Workspace.openFile=function(name,content){

originalOpenFile(name,content);

if(window.Files){

this.files[name]=Files.read(name);

this.editor.value=this.files[name];

}

};

const originalSaveWorkspace=Workspace.save.bind(Workspace);

Workspace.save=function(){

if(this.active&&window.Files){

Files.write(

this.active,

this.editor.value

);

}

originalSaveWorkspace();

};

