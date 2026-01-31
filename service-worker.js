// public/service-worker.js

// This event listener is fired when the service worker is first installed.
self.addEventListener('install', (event) => {
  // skipWaiting() forces the waiting service worker to become the active service worker.
  self.skipWaiting();
  console.log('Service Worker installing.');
});

// This event listener is fired when the service worker is activated.
self.addEventListener('activate', (event) => {
  // clients.claim() allows an active service worker to set itself as the controller for all clients within its scope.
  event.waitUntil(self.clients.claim());
  console.log('Service Worker activating.');
});

// The fetch event is required for the browser to consider the app "installable".
// For now, we perform a simple pass-through to the network.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});