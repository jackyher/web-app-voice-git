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

            resultDiv.innerHTML = `<p>Orden identificada: <strong>${transcript}</strong></p>`;

            if(transcript.includes(keyword)) { //Para encontrar palabra en específico
                controlTexto.classList.add('fs-3');
                console.log("Sí se encontró la palabra...");
            }
        };

        // Evento de error
        recognition.onerror = function (event) {
            resultDiv.innerHTML = '<p>Error en el reconocimiento de voz. Intenta nuevamente.</p>';
        };

        recognition.start();
    }
});
