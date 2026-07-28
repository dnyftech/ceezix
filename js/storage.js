/* ==========================================
   CEEZIX Storage Manager
========================================== */

const Storage={

prefix:"ceezix.",

set(key,value){

try{

localStorage.setItem(

this.prefix+key,

JSON.stringify(value)

);

return true;

}catch(e){

console.error(e);

return false;

}

},

get(key,fallback=null){

try{

const value=localStorage.getItem(

this.prefix+key

);

return value

?JSON.parse(value)

:fallback;

}catch{

return fallback;

}

},

remove(key){

localStorage.removeItem(

this.prefix+key

);

},

clear(){

Object.keys(localStorage)

.forEach(key=>{

if(key.startsWith(this.prefix))

localStorage.removeItem(key);

});

},

has(key){

return localStorage.getItem(

this.prefix+key

)!==null;

}

};

window.Storage=Storage;
