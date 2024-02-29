document.addEventListener('DOMContentLoaded', function () {
    const voiceBtn = document.getElementById('voiceBtn');
    const resultDiv = document.getElementById('result');

    voiceBtn.addEventListener('click', function () {
        recognizeSpeech();
    });

    function recognizeSpeech() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES';

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            resultDiv.innerHTML = `<p>Orden identificada: <strong>${transcript}</strong></p>`;
        };

        recognition.onerror = function (event) {
            resultDiv.innerHTML = '<p>Error en el reconocimiento de voz. Intenta nuevamente.</p>';
        };

        recognition.start();
    }
});
