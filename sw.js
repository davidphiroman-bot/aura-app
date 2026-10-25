const CACHE_VERSION = 'aura-v5.2.0';
const STATIC_CACHE = `aura-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `aura-dynamic-${CACHE_VERSION}`;

// Recursos locales críticos (App Shell)
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './silicon-tee.js',
  './mesh-network.js',
  './vector-vault.js',
  './neural-agent.js'
];

// CDNs externas que deben cachearse dinámicamente
const EXTERNAL_ORIGINS = [
  'cdn.jsdelivr.net',
  'unpkg.com',
  'cdn-icons-png.flaticon.com'
];

// 1. INSTALACIÓN: Precaché de recursos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[AURA SW] Precaching App Shell');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVACIÓN: Limpieza de cachés antiguas y toma de control inmediata
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[AURA SW] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. INTERCEPTACIÓN (FETCH): Estrategia híbrida de almacenamiento
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignorar peticiones que no sean GET
  if (request.method !== 'GET') return;

  // A) Navegación HTML -> Network First (Garantiza siempre la última versión online, fallback a caché offline)
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

  // B) Archivos estáticos locales -> Cache First, Network Fallback
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

  // C) Recursos externos de CDNs confiables -> Stale-While-Revalidate
  if (EXTERNAL_ORIGINS.some(origin => url.hostname.includes(origin))) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // D) Fallback genérico de red
  event.respondWith(
    caches.match(request).then((response) => response || fetch(request))
  );
});

