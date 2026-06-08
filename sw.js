/* RUMI 3D service worker — network-first for the page (so updates always land),
   cache-first for static assets, cached fallback when offline. */
const CACHE = "rumi3d-v9";
const ASSETS = ["./", "index.html", "manifest.webmanifest", "icon.svg"];

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

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isPage = req.mode === "navigate" || req.destination === "document";
  if (isPage) {
    // network-first: get the freshest HTML when online, fall back to cache offline
    e.respondWith(
      fetch(req)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put("index.html", copy));
          return resp;
        })
        .catch(() => caches.match("index.html").then(r => r || caches.match("./")))
    );
    return;
  }
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
