const output = document.getElementById('prompt-input-box');
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
        // this is where i need to trigger the form submit event!!!
        recognition.onresult = (event) => {
            let transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
        
            output.value = transcript;
            
            // Triggering the form submit event
            const form = document.getElementById('myForm');
            
            // Create new event
            var event = new Event('submit');
            
            // Dispatch the event.
            form.dispatchEvent(event);
        };
        
    };

    recognition.onend = () => {
        startButton.textContent = 'Press to Talk';
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
