/* Lumière Analytics service worker (10 Okt 2026, v2): selalu ambil versi terbaru dari jaringan; cache hanya cadangan offline */
const V='lumiere-20261010b';
self.addEventListener('install',()=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{try{for(const k of await caches.keys())if(k!==V)await caches.delete(k)}catch(x){}await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith((async()=>{try{const n=await fetch(r,{cache:'no-cache'});if(n&&n.ok){const c=await caches.open(V);c.put(r,n.clone()).catch(()=>{})}return n}
    catch(x){const m=await caches.match(r);if(m)return m;if(r.mode==='navigate'){const i=await caches.match('index.html');if(i)return i}throw x}})())});
