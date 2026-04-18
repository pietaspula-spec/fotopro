// FotoKalk Service Worker — v1.0
// Cache-first strategija za offline upotrebu

const CACHE_NAME = 'fotokalkpro-v2.';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// XLSX library — pokušaj cachirati ako dostupna (online pri instalaciji)
const OPTIONAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// ─── Install ─────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Cache obvezne resurse
      await cache.addAll(ASSETS.filter(a => !a.startsWith('http')));
      // Cache opcionalne (XLSX) bez greške ako nedostupni
      for (const url of OPTIONAL_ASSETS) {
        try {
          const res = await fetch(url);
          if (res.ok) await cache.put(url, res);
        } catch (_) { /* nema interneta — preskočiti */ }
      }
    })
  );
  self.skipWaiting();
});

// ─── Activate ────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch ───────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  // Preskoči non-GET zahtjeve
  if (event.request.method !== 'GET') return;

  // Preskoči chrome-extension i sl.
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // Preskoči Google Calendar i Waze zahtjeve — neka idu direktno na mrežu
  if (url.hostname.includes('google.com') || url.hostname.includes('waze.com')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Nije u cacheu — probaj mrežu
      return fetch(event.request).then(response => {
        // Cache samo uspješne odgovore
        if (response && response.status === 200) {
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        }
        return response;
      }).catch(() => {
        // Offline fallback — vrati aplikaciju
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
