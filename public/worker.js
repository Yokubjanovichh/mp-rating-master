/* eslint-disable no-restricted-globals */
let CACHE_NAME = "mp-rating-v1";
let urlsToCache = ["/index.html"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
      .catch(function (err) {
        console.log(err);
      })
  );
});
