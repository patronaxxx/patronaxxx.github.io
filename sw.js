/* PATRONAXXX — Service Worker v2 */
const CACHE = 'patronaxxx-v2';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;900&display=swap',
    'https://unpkg.com/aos@2.3.4/dist/aos.css',
    'https://unpkg.com/aos@2.3.4/dist/aos.js',
];

// Install — pre-cache static assets
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

// Activate — clear old caches
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch — stale-while-revalidate for static, network-first for YouTube API
self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);

    // YouTube API — always network, no cache
    if (url.hostname === 'www.googleapis.com') {
        e.respondWith(fetch(e.request).catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } })));
        return;
    }

    // Images — cache first
    if (e.request.destination === 'image') {
        e.respondWith(
            caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
                const clone = res.clone();
                caches.open(CACHE).then(c => c.put(e.request, clone));
                return res;
            }))
        );
        return;
    }

    // Everything else — stale-while-revalidate
    e.respondWith(
        caches.open(CACHE).then(cache =>
            cache.match(e.request).then(cached => {
                const network = fetch(e.request).then(res => {
                    cache.put(e.request, res.clone());
                    return res;
                }).catch(() => cached);
                return cached || network;
            })
        )
    );
});
