// 缓存版本
var CACHE_NAME = 'MZJF_CACHE_'+CACHE_VERSION;
// 缓存文件
var urlsToCache = global.serviceWorkerOption.assets;

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// sw文件有改动会触发activate 删除缓存文件
self.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if(cacheName.indexOf('MZJF_CACHE')>-1){
                return caches.delete(cacheName);
            }
        }));
    }));
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        // 去缓存中查询对应的请求
        caches.match(event.request).then(function (response) {
            // 如果命中本地缓存，就直接返回本地的资源 
            if (response) {
                return response;
            }
            // 否则就用 fetch 下载资源
            return fetch(event.request);
        })
    );
});
