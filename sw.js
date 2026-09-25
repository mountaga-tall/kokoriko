const CACHE='kokoriko-v4';
const ASSETS=[
  './',
  './index.html',
  './menu.html',
  './a-propos.html',
  './contact.html',
  './panier.html',
  './styles.css',
  './js/app.js',
  './js/menuData.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/logokok.webp',
  './assets/logokok-cropped.webp'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(response=>{
        if(!response || !response.ok) return response;
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        return response;
      }).catch(()=>caches.match('./index.html'));
    })
  );
});
