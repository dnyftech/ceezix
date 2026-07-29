/* ==========================================
   CEEZIX GitHub Engine
========================================== */

const GitHub={

owner:"dnyftech",

repo:"ceezix",

branch:"main",

tokenKey:"ceezix.github.token",

api:"https://api.github.com",

headers(){

const token=localStorage.getItem(this.tokenKey);

const headers={

"Accept":"application/vnd.github+json"

};

if(token){

headers.Authorization="Bearer "+token;

}

return headers;

},

async request(path){

const response=await fetch(

this.api+path,

{

headers:this.headers()

}

);

if(!response.ok){

throw new Error(response.status);

}

return response.json();

},

async repoInfo(){

return this.request(

`/repos/${this.owner}/${this.repo}`

);

},

async branches(){

return this.request(

`/repos/${this.owner}/${this.repo}/branches`

);

},

async commits(){

return this.request(

`/repos/${this.owner}/${this.repo}/commits?per_page=10`

);

},

saveToken(token){

localStorage.setItem(

this.tokenKey,

token

);

},

logout(){

localStorage.removeItem(

this.tokenKey

);

},

async status(){

try{

const repo=await this.repoInfo();

return{

success:true,

stars:repo.stargazers_count,

forks:repo.forks_count,

watchers:repo.watchers_count,

defaultBranch:repo.default_branch,

pages:repo.homepage||

"https://dnyftech.github.io/ceezix/"

};

}catch(error){

return{

success:false,

message:error.message

};

}

}

};

window.GitHub=GitHub;
