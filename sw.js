/**
 * AURA AI SOVEREIGN OS - SERVICE WORKER v6.0.0
 * Motor de Caché Atómica, PWA Offline-First y Control de Enclave
 */

const CACHE_VERSION = 'aura-v6.0.0';
const STATIC_CACHE = `aura-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `aura-dynamic-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './aura-engine.js',
  './agent-studio.js',
  './logo-studio.js',
  './optical-studio.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Fase de Instalación: Cacheo atómico del App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Fase de Activación: Purgado de cachés obsoletas y control inmediato
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fase de Interceptación (Fetch): Estrategia Cache-First con respaldo de red
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Manejo de navegación SPA
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          return caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match('./index.html') || caches.match(request))
    );
    return;
  }

  // Activos locales del mismo origen
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Peticiones externas por defecto
  event.respondWith(
    caches.match(request).then((response) => response || fetch(request))
  );
});
