let CACHE_STATIC_NAME = "static-v9";
let CACHE_DYNAMIC_NAME = "dynamic-v6";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function (cache) {
      console.log("[SW] Precaching App Shell");
      cache.addAll([
        "/",
        "/index.html",
        "/offline.html",
        "/data/src/js/app.js",
        "/data/src/js/feed.js",
        "/data/src/js/promise.js",
        "/data/src/js/fetch.js",
        "/data/src/js/material.min.js",
        "/data/src/css/app.css",
        "/data/src/css/feed.css",
        "/data/src/images/main-image.jpg",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
      ]);
      // cache.add("/index.html");
      // cache.add("/data/src/js/app.js");
    })
  );

  // console.log("[Service Worker] Installing service worker...", event);
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[SW] Delete old cache");
            return caches.delete(key); // returns promises
          }
        })
      );
    })
  );

  // console.log("[Service Worker] Activating service worker...", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  // console.log("[Service Worker] fetching somth ...", event);
  // event.respondWith();

  // console.log(event.request);

  event.respondWith(
    caches
      .match(event.request) //even if event.request has nothing it gives then (return null)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(function (err) {
              return caches.open(CACHE_STATIC_NAME).then(function (cache) {
                return cache.match("/offline.html");
              });
            });
        }
      })
  );
});
