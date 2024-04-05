const controlTexto = document.getElementById('controlTexto');

document.addEventListener('DOMContentLoaded', function () {
    const voiceBtn = document.getElementById('voiceBtn');
    const resultDiv = document.getElementById('result');

    // Botón para el reconocimiento
    voiceBtn.addEventListener('click', function () {
        recognizeSpeech();
    });

    function recognizeSpeech() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES';

        //Evento cuando la voz es detectada
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            const keyword = 'tamaño 3';
            const abrirPestaña = 'abrir';
            const irPagina = 'canva.com';
            const tamañoVentana = 'tamaño de la ventana';
            const cerrarPestaña = 'cerrar';
            const aumentarZoom = 'aumentar';
            const reducirZoom = 'reducir';

            resultDiv.innerHTML = `<p>Orden identificada: <strong>${transcript}</strong></p>`;

            //Para cambiar tamaño del texto
            if(transcript.includes(keyword)) { //Para encontrar palabra en específico
                controlTexto.classList.add('fs-3');
                console.log("Sí se encontró la palabra...");
            }

            //Para abrir una nueva pestaña en el navegador
            if(transcript.includes(abrirPestaña)) {
                window.open("https://www.google.com/" , "_blank");
                console.log("Nueva pestaña del navegador abierta");
            }

            //Para visitar la página de canva
            if(transcript.includes(irPagina)) {
                window.open("https://www.canva.com" , "_blank");
                console.log("Se ha visitado Canva");
            }

            //Para modificar el tamaño de la ventana del navegador
            if(transcript.includes(tamañoVentana)) {
                //window.resizeTo(800,600);
                window.open("https://jackyher.github.io/web-app-voice-git/", "_blank", "width=800,height=600");
                console.log("El tamaño de la ventana del navegador ha cambiado a 800, 600");
            }

            //Para cerrar la pestaña del navegador actual
            if(transcript.includes(cerrarPestaña)) {
                window.close();
                console.log("Todas las pestañas del navegador se han cerrado");
            }

            //Para aumentar el zoom de la ventana
            if(transcript.includes(aumentarZoom)) {
                document.body.style.zoom = "150%";
                console.log("Zoom aumentado al 150%");
            }

            //Para restablecer el zoom de la ventana
            if(transcript.includes(reducirZoom)) {
                document.body.style.zoom = "100%";
                console.log("Zoom aumentado al 100%");
            }
        };

        // Evento de error
        recognition.onerror = function (event) {
            resultDiv.innerHTML = '<p>Error en el reconocimiento de voz. Intenta nuevamente.</p>';
        };

        recognition.start();
    }
});
