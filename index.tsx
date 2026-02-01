import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Register service worker for PWA and notifications
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Using relative path './' is critical for GitHub Pages subpaths
    navigator.serviceWorker.register('./service-worker.js').catch((err) => {
      console.warn('Service Worker registration failed: ', err);
    });
  });
}