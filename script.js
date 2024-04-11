const controlTexto = document.getElementById('controlTexto');
const resultDiv = document.getElementById('result');

document.addEventListener('DOMContentLoaded', function () {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.continuous = true; //Para que se active constantemente

    //Evento para cuando la voz es detectada
    recognition.onresult = function (event) {
        const transcript = event.results[event.results.length -1][0].transcript;

        resultDiv.innerHTML = `<p>Orden identificada: <strong>${transcript}</strong></p>`;

        //Ejecutar acciones correspondientes
        executeActions(transcript);
    };

    //Evento de error
    recognition.onerror = function (event) {
        resultDiv.innerHTML = '<p>Error en el reconocimiento de voz. Intenta nuevamente.</p>';
    };

    recognition.start();

    //Set interval para asegurar que la aplicación siga escuchando
    setInterval(function() {
        if (recognition.status === 'idle') {
            recognition.start();
        }
    }, 5000); //Cada 5 segundos
});

//Función para ejecutar las acciones correspondientes
function executeActions(transcript) {
    const keyword = 'tamaño 3';
    const abrirPestaña = 'abrir';
    const irPagina = 'canva.com';
    const tamañoVentana = 'tamaño de la ventana';
    const cerrarPestaña = 'cerrar';
    const aumentarZoom = 'aumentar';
    const reducirZoom = 'reducir';
        
    let enviarMockapi = false;

    const fecha = new Date();
    const formatFecha = fecha.toLocaleString(); //Para convertir la fecha a la zona horaria del usuario

    //Para cambiar tamaño del texto
    if(transcript.includes(keyword)) { //Para encontrar palabra en específico
        controlTexto.classList.add('fs-3');
        console.log("Sí se encontró la palabra...");
        enviarMockapi = true;
    }

    //Para abrir una nueva pestaña en el navegador
    if(transcript.includes(abrirPestaña)) {
        window.open("https://www.google.com/" , "_blank");
        console.log("Nueva pestaña del navegador abierta");
        enviarMockapi = true;
    }

    //Para visitar la página de canva
    if(transcript.includes(irPagina)) {
        window.open("https://www.canva.com" , "_blank");
        console.log("Se ha visitado Canva");
        enviarMockapi = true;
    }

    //Para modificar el tamaño de la ventana del navegador
    if(transcript.includes(tamañoVentana)) {
        //window.resizeTo(800,600);
        window.open("https://jackyher.github.io/web-app-voice-git/", "_blank", "width=800,height=600");
        console.log("El tamaño de la ventana del navegador ha cambiado a 800, 600");
        enviarMockapi = true;
    }

    //Para cerrar la pestaña del navegador actual
    if(transcript.includes(cerrarPestaña)) {
        window.close();
        console.log("Todas las pestañas del navegador se han cerrado");
        enviarMockapi = true;
    }

    //Para aumentar el zoom de la ventana
    if(transcript.includes(aumentarZoom)) {
        document.body.style.zoom = "150%";
        console.log("Zoom aumentado al 150%");
        enviarMockapi = true;
    }

    //Para restablecer el zoom de la ventana
    if(transcript.includes(reducirZoom)) {
        document.body.style.zoom = "100%";
        console.log("Zoom aumentado al 100%");
        enviarMockapi = true;
    }

    //Para enviar a Mockapi
    if(enviarMockapi) {
        const orden = { orden: transcript, fecha: formatFecha }; //Agregamos datos al objeto
        axios.post('https://660f6f5a356b87a55c51616a.mockapi.io/orden', orden)
        .then(response => {
            console.log("Orden enviada: ", response.data);
        })
        .catch(error => {
            console.error("Error al enviar la orden: ", error);
        });
    }
}
