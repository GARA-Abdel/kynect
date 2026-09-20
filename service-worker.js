const CACHE_NAME = "kynect-pwa-v1";
const STATIC_ASSETS = [
  "./", "./index.html", "./offres.html", "./offre.html", "./soumettre.html", "./trouver.html", "./cv.html", "./formations.html", "./admin-login.html", "./admin.html",
  "./css/style.css", "./css/responsive.css", "./js/main.js", "./js/ui.js", "./js/pwa.js", "./js/home.js", "./js/filters.js", "./js/matching.js", "./js/matching-page.js", "./js/offres.js", "./js/offres-page.js", "./js/offre-page.js", "./js/soumettre-page.js", "./js/ressources.js", "./js/resources-page.js", "./js/auth.js", "./js/login-page.js", "./js/admin-page.js", "./js/admin-offres.js", "./js/supabase-client.js", "./js/supabase-config.js",
  "./assets/logo.svg", "./assets/icons/icon-192.png", "./assets/icons/icon-512.png"
];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (new URL(event.request.url).origin === self.location.origin) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => caches.match("./index.html"))));
});
