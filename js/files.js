/* ==========================================
   CEEZIX File Engine
========================================== */

const Files={

storageKey:"ceezix.files",

data:{},

init(){

this.load();

this.render();

},

load(){

const saved=localStorage.getItem(this.storageKey);

if(saved){

try{

this.data=JSON.parse(saved);

return;

}catch(e){

console.error(e);

}

}

this.data={

"index.html":"<!DOCTYPE html>\n<html>\n\n</html>",

"css/style.css":"",

"js/app.js":"",

"README.md":"# CEEZIX"

};

this.save();

},

save(){

localStorage.setItem(

this.storageKey,

JSON.stringify(this.data)

);

},

list(){

return Object.keys(this.data).sort();

},

exists(name){

return name in this.data;

},

read(name){

return this.data[name]||"";

},

write(name,content){

this.data[name]=content;

this.save();

},

remove(name){

delete this.data[name];

this.save();

this.render();

},

rename(oldName,newName){

if(!this.exists(oldName)) return;

this.data[newName]=this.data[oldName];

delete this.data[oldName];

this.save();

this.render();

},

create(name){

if(this.exists(name)){

Utils?.toast("File already exists");

return;

}

this.data[name]="";

this.save();

this.render();

},

render(){

const list=document.getElementById("fileList");

if(!list) return;

list.innerHTML="";

this.list().forEach(file=>{

const li=document.createElement("li");

li.className="file-item";

li.textContent="📄 "+file;

li.onclick=()=>{

Workspace?.openFile(

file,

this.read(file)

);

Router?.open("workspace");

};

list.appendChild(li);

});

}

};

window.Files=Files;
