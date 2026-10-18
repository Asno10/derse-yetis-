// Offline support for Derse Yetiş. Caches only the app's own files; the live bus API is never cached.
const CACHE = 'derse-yetis-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest?v=2',
  './icons/apple-touch-icon.png?v=2',
  './icons/icon-192.png?v=2',
  './icons/icon-512.png?v=2',
  './icons/icon-maskable-512.png?v=2',
  './icons/favicon-64.png?v=2',
  './fonts/barlow-condensed-latin-500-normal.woff2',
  './fonts/barlow-condensed-latin-600-normal.woff2',
  './fonts/barlow-condensed-latin-ext-500-normal.woff2',
  './fonts/barlow-condensed-latin-ext-600-normal.woff2',
  './fonts/overpass-latin-400-normal.woff2',
  './fonts/overpass-latin-600-normal.woff2',
  './fonts/overpass-latin-700-normal.woff2',
  './fonts/overpass-latin-ext-400-normal.woff2',
  './fonts/overpass-latin-ext-600-normal.woff2',
  './fonts/overpass-latin-ext-700-normal.woff2',
  './fonts/dotgothic16-latin-400-normal.woff2',
  './fonts/dotgothic16-latin-ext-400-normal.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // live bus data and links go straight to the network

  // The page itself: network first so updates arrive, cached copy when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Fonts, icons, manifest: cache first.
  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
