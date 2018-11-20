const version = "0.0.6";
const cacheName = `balta-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/images/logo-2-branco.png`,
        `/images/icons/icon-72x72.png`,
        `/images/icons/icon-96x96.png`,
        `/images/icons/icon-128x128.png`,
        `/images/icons/icon-144x144.png`,
        `/images/icons/icon-152x152.png`,
        `/images/icons/icon-192x192.png`,
        `/images/icons/icon-384x384.png`,
        `/images/icons/icon-512x512.png`,
        `/favicon.ico`,
        `/index.html`,
        `/styles.css`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});