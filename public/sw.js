self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open("rosequi-static-v1").then((cache) => {
            cache.put(event.request, cloned);
          });
          return response;
        })
        .catch(
          () =>
            new Response("Offline. Please reconnect to continue browsing.", {
              status: 503,
              statusText: "Offline",
            }),
        );
    }),
  );
});
