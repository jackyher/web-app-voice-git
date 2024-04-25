let ultimaFechaHora = null;

function executeActions(ultimaOrden) {
    const abrirPestaña = 'abrir';
    const irPagina = 'canva.com';
    const tamañoVentana = 'tamaño de la ventana';
    const cerrarPestaña = 'cerrar';
    const aumentarZoom = 'aumentar';
    const reducirZoom = 'reducir';

    let mostrarOrden = ultimaOrden; // Guardar la última orden para mostrarla en el recuadro

    const fecha = new Date();
    const formatFecha = fecha.toLocaleString(); // Para convertir la fecha a la zona horaria del usuario

    // Resto del código para ejecutar las acciones basadas en la última orden obtenida...
    if (ultimaOrden.includes(abrirPestaña)) {
        window.open("https://www.google.com/", "_blank");
        console.log("Nueva pestaña del navegador abierta");
    }

    // Para visitar la página de Canva
    if (ultimaOrden.includes(irPagina)) {
        window.open("https://www.canva.com", "_blank");
        console.log("Se ha visitado Canva");
    }

    // Para modificar el tamaño de la ventana del navegador
    if (ultimaOrden.includes(tamañoVentana)) {
        window.open("https://jackyher.github.io/web-app-voice-git/", "_blank", "width=800,height=600");
        console.log("El tamaño de la ventana del navegador ha cambiado a 800x600");
    }

    // Para cerrar la pestaña del navegador actual
    if (ultimaOrden.includes(cerrarPestaña)) {
        window.close();
        console.log("Todas las pestañas del navegador se han cerrado");
    }

    // Para aumentar el zoom de la ventana
    if (ultimaOrden.includes(aumentarZoom)) {
        document.body.style.zoom = "150%";
        console.log("Zoom aumentado al 150%");
    }

    // Para restablecer el zoom de la ventana
    if (ultimaOrden.includes(reducirZoom)) {
        document.body.style.zoom = "100%";
        console.log("Zoom restablecido al 100%");
    }

    // Mostrar la última orden en el recuadro
    document.getElementById('orden').innerText = mostrarOrden;
    console.log("Ejecutando acciones para:", ultimaOrden);
}

function obtenerUltimaOrden() {
    axios.get('https://660f6f5a356b87a55c51616a.mockapi.io/orden')
        .then(function(response) {
            if (response.data.length > 0) { // Verificar si hay registros
                const ultimaOrden = response.data[response.data.length - 1].orden; // Obtener el contenido de la última orden
                const ultimaFechaHoraOrden = response.data[response.data.length - 1].fecha; // Obtener la fecha y hora de la última orden
                console.log("Última orden:", ultimaOrden); // Mostrar el contenido en la consola
                console.log("Fecha y hora de la última orden:", ultimaFechaHoraOrden); // Mostrar la fecha y hora en la consola

                // Verificar si la última fecha y hora son diferentes a la última fecha y hora consultadas
                if (ultimaFechaHora !== ultimaFechaHoraOrden) {
                    executeActions(ultimaOrden); // Ejecutar la última orden obtenida
                    ultimaFechaHora = ultimaFechaHoraOrden; // Actualizar la última fecha y hora consultadas
                } else {
                    console.log("La última orden es la misma que la anterior. No se ejecutan acciones.");
                }
            } else {
                console.log("No hay registros disponibles");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Llamar a la función para obtener la última orden cada 2 segundos
setInterval(obtenerUltimaOrden, 2000);