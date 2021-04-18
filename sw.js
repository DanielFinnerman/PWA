'use strict';
const cacheName = 'hello-pwa';
const filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './css/font.css',
  './js/main.js',
  './fonts/Roboto-Regular-webfont.woff',
  './images/cat.jpg',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      return cache.addAll(filesToCache);
    } catch (error) {
      console.log(error.message);
    }
  })());
});

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    try {
      const response = await caches.match(e.request);
      return response || fetch(e.request);
    } catch (error) {
      console.log(error.message);
    }
  })());
});