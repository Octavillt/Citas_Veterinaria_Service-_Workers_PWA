// Comprueba si el navegador soporta Service Workers
if ('serviceWorker' in navigator) {
    // Intenta registrar el Service Worker desde el archivo 'sw.js'
    navigator.serviceWorker.register('./sw.js')
        // Si el registro es exitoso, imprime un mensaje con la información del registro
        .then(registrado => console.log('Se registró correctamente', registrado))
        // Si el registro falla, imprime un mensaje de error
        .catch(error => console.log('Fallo en la instalación', error));
} else {
    // Si los Service Workers no están soportados, imprime un mensaje indicándolo
    console.log('Service Worker No soportado');
}
