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

// The main purpose of this service worker in this app is to exist,
// allowing the main application thread to use navigator.serviceWorker.ready
// to schedule notifications via the Notification Triggers API.
