const cache_version = '0.0.1';
const cacheList = [
    'favicon.ico',
    'manifest.json',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cache_version).then(cache => {
            return cache.addAll(cacheList);
        })
    );
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheList => {
            console.log(cacheList)
            return Promise.all(
                cacheList.map(data => {
                    if (data !== cache_version) {
                        return caches.delete(data);
                    }
                    return Promise.resolve();
                })
            )
        }).then(() => {
            // 更新 serviceWorker
            clients.claim();
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            console.log(response)
            if (response != null) {
                return response
            }
            return caches.open(cache_version).then(cache => {
                return cache.add(event.request);
            })
        })
    )
})