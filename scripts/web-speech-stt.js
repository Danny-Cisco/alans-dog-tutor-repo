const output = document.getElementById('output');
const startButton = document.getElementById('start');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.onstart = () => {
        startButton.textContent = 'Listening...';
        startButton.disabled = true;
    };

    recognition.onresult = (event) => {
        let transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        output.value = transcript;
        window.readOutLoud(transcript);  // This will automatically read out the message
    };

    recognition.onend = () => {
        startButton.textContent = 'Start';
        startButton.disabled = false;
    };

    recognition.onerror = (event) => {
        alert('Error occurred in recognition: ' + event.error);
    }

    startButton.addEventListener('click', () => {
        recognition.start();
    });
} else {
    startButton.textContent = 'Speech recognition not available';
    startButton.disabled = true;
}
