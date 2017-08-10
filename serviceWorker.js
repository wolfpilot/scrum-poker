/**
 * @TODO: Lint and Babelify this file as well, make those paths pretty!
 * Since the Service Worker's fired up before the DOM loads, we need a different way to determine the base path
 * Also, maybe add another URLHelper for the location
 * @returns {string} - The real base URL of the site
 */
const getPath = () => {
    const url = new URL(location);
    const basePath = (url.pathname.split('/')[1] || '');

    return (basePath === 'ScrumPoker' ? '/' + basePath : '');
};

const basePath = getPath();
const CACHE_NAME = 'my-app-0-1';
const filesToCache = [
    basePath + '/',
    basePath + '/index.html',
    basePath + '/static/css/all.css',
    basePath + '/static/fonts/BrandoSans-Light.woff',
    basePath + '/static/fonts/BrandoSans-Light.woff2',
    basePath + '/static/fonts/BrandoSans-SemiBold.woff',
    basePath + '/static/fonts/BrandoSans-SemiBold.woff2',
    basePath + '/static/js/babel-helpers.js',
    basePath + '/static/js/main.js',
    basePath + '/static/js/polyfill.js',
    basePath + '/templates/home.html'
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
