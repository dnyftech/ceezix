const VERSION = "v1";

const CACHE = `ceezix-${VERSION}`;

const FILES = [

"./",

"./index.html",

"./manifest.json",

"./css/style.css",

"./css/layout.css",

"./css/components.css",

"./css/mobile.css",

"./css/themes.css",

"./css/animations.css",

"./js/app.js",

"./js/router.js",

"./js/ui.js",

"./js/utils.js",

"./js/storage.js",

"./js/theme.js",

"./js/api.js",

"./js/search.js",

"./js/command.js"

];

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE)

.then(c=>c.addAll(FILES))

);

self.skipWaiting();

});

self.addEventListener("activate",e=>{

e.waitUntil(

caches.keys()

.then(keys=>

Promise.all(

keys

.filter(k=>k!==CACHE)

.map(k=>caches.delete(k))

)

)

);

});

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request)

.then(r=>r||fetch(e.request))

);

});
