/* RUMI 3D service worker — network-first for the page (so updates always land) with a short
   timeout so a flaky connection falls back to the cached game instead of hanging;
   cache-first for static assets; cached fallback when offline. */
const CACHE = "rumi3d-v20";
const ASSETS = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const PAGE_TIMEOUT_MS = 3000;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function cachedPage() {
  return caches.match("index.html").then(r => r || caches.match("./"));
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  const isPage = req.mode === "navigate" || req.destination === "document";
  if (isPage) {
    // network-first with a timeout: fresh HTML when the network answers quickly, cached game otherwise
    e.respondWith(new Promise(resolve => {
      let settled = false;
      const timer = setTimeout(() => {
        cachedPage().then(hit => { if (hit && !settled) { settled = true; resolve(hit); } });
      }, PAGE_TIMEOUT_MS);
      fetch(req).then(resp => {
        clearTimeout(timer);
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put("index.html", copy));
        if (!settled) { settled = true; resolve(resp); }
      }).catch(() => {
        clearTimeout(timer);
        if (settled) return;
        cachedPage().then(hit => { settled = true; resolve(hit || Response.error()); });
      });
    }));
    return;
  }
  // third-party scripts (analytics) are never cached: they'd be served stale forever
  if (!sameOrigin) return;
  // static assets: cache-first, then network (and cache it)
  e.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return resp;
      }).catch(() => hit)
    )
  );
});
