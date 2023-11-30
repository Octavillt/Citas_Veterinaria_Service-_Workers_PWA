// Define el nombre de la caché y los archivos a almacenar
const nombreCache = 'apv-v5';
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];

// Evento 'install' para instalar el Service Worker
self.addEventListener('install', e => {
    // Espera hasta que la caché esté abierta y los archivos sean almacenados
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                // Añade todos los archivos definidos a la caché
                cache.addAll(archivos)
            })
            // Maneja errores en caso de que la caché falle
            .catch(error => console.log('Hubo un Error al Cachar los archivos...', error))
    )
});

// Evento 'activate' para activar el Service Worker
self.addEventListener('activate', e => {
    // Limpia cachés antiguas
    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    // Filtra y elimina cualquier caché que no coincida con el nombre actual
                    keys.filter(key => key !== nombreCache)
                        .map(key => caches.delete(key)) // Borra las cachés antiguas
                )
            })
    )
});

// Evento 'fetch' para interceptar las solicitudes de red
self.addEventListener('fetch', e => {
    // Responde con un recurso almacenado en caché o realiza una solicitud de red
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                // Devuelve la respuesta de la caché o realiza una solicitud de red si no está en caché
                return respuestaCache || fetch(e.request);
            })
            // En caso de error, muestra una página de error
            .catch(() => caches.match('/error.html'))
    );
});
