const resultDiv = document.getElementById('result');
let recognition; // Definir el objeto recognition fuera del alcance del evento
let isListening = false; // Bandera para controlar si el reconocimiento está activo

document.addEventListener('DOMContentLoaded', function () {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false; // Desactivar resultados intermedios para evitar errores 'no-speech'

    recognition.onstart = function () {
        console.log("Reconocimiento de voz iniciado");
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.trim();

        if (transcript.toLowerCase().includes("yaquis")) {
            console.log("Palabra clave 'Yaquis' detectada. Ejecutando acciones...");
            const textAfter = transcript.toLowerCase().split("yaquis")[1].trim();
            if (textAfter) {
                resultDiv.innerHTML = `<p>Orden identificada: <strong>${transcript}</strong></p>`;
                executeActions(textAfter);
            }
        }
    };

    recognition.onend = function () {
        console.log("Reconocimiento de voz detenido");
        if (isListening) {
            console.log("Reiniciando reconocimiento de voz...");
            recognition.start();
        }
    };

    recognition.onerror = function (event) {
        console.error("Error en el reconocimiento de voz:", event.error);
        if (event.error === 'no-speech') {
            if (!isListening) {
                console.log("Iniciando reconocimiento de voz debido a 'no-speech'...");
                recognition.start();
            }
        }
    };

    // Iniciar reconocimiento al cargar la página
    recognition.start();
    isListening = true;
});

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
    console.log("Ejecutando acciones para:", transcript);
}
