const CACHE='gym-logbook-v3';
const ASSETS=['./','./index.html','./css/style.css','./js/data.js','./js/database.js','./js/progression.js','./js/analytics.js','./js/backup.js','./js/app.js','./manifest.json','./icons/icon-192.svg','./icons/icon-512.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const copy=x.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return x}).catch(()=>caches.match('./index.html'))))});
