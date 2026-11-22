const V="deepcut-app-v3",SHELL=["./","index.html","deepcut.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin)return;
  // tudo do próprio site: busca sempre a versão mais nova na rede; o cache só serve quando está offline
  e.respondWith(fetch(r,{cache:"no-cache"}).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r.mode==="navigate"?"index.html":r,c))}return x}).catch(()=>caches.match(r.mode==="navigate"?"index.html":r)));
});
