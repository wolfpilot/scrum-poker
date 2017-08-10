const CACHE_NAME = 'my-app-0-1';
const filesToCache = [
    '/',
    '/index.html',
    '/static/css/all.css',
    '/static/fonts/BrandoSans-Light.woff',
    '/static/fonts/BrandoSans-Light.woff2',
    '/static/fonts/BrandoSans-SemiBold.woff',
    '/static/fonts/BrandoSans-SemiBold.woff2',
    '/static/js/babel-helpers.js',
    '/static/js/main.js',
    '/static/js/polyfill.js',
    '/templates/home.html'
];

/**
 * Install Service Worker
 */
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

/**
 * Activate worker
 */
self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

/**
 * Fetch from cache
 */
self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
