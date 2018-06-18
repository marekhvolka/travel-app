// const cacheName = 'DevCache'
//
// self.addEventListener('install', (e) => {
//   console.log('installing service worker')
//
//   const timeStamp = Date.now()
//   e.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll([
//         '/',
//         '/static/index.html',
//         '/static/js/bundle.js'
//       ])
//         .then(() => {
//           self.skipWaiting()
//         })
//     })
//   )
// })
//
// self.addEventListener('activate', (event) => {
//   console.log('Activating service worker')
//   event.waitUntil(self.clients.claim())
// })
//
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       var fetchRequest = event.request.clone()
//
//       fetch(fetchRequest).then((response) => {
//         if (!response || response.status !== 200 || response.type !== 'basic') {
//           return response
//         }
//
//         var responseToCache = response.clone()
//
//         caches.open(cacheName).then((cache) => {
//           cache.put(event.request, responseToCache)
//         })
//
//         return response
//       }).catch((e) => {
//         if (response) {
//           return response
//         }
//       })
//     })
//   )
// })
