const output = document.getElementById('prompt-input-box');
const startButton = document.getElementById('start');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.onstart = () => {
        startButton.textContent = 'Listening...';
        startButton.style.backgroundColor = 'orange';  // Change color to orange when listening
    };

    recognition.onresult = (event) => {
        let transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        output.value = transcript;
        
        // Triggering the form submit event
        const form = document.getElementById('myForm');
        var event = new Event('submit');  // Create new event
        form.dispatchEvent(event);  // Dispatch the event.
    };

    recognition.onend = () => {
        startButton.textContent = 'Press to Talk';
        startButton.style.backgroundColor = '';  // Reset color when not listening
    };

    recognition.onerror = (event) => {
        alert('Error occurred in recognition: ' + event.error);
    }

    // Mouse events for desktop
    startButton.addEventListener('mousedown', () => {
        recognition.start();
    });

    startButton.addEventListener('mouseup', () => {
        recognition.stop();
    });

    // Touch events for mobile
    startButton.addEventListener('touchstart', () => {
       // event.preventDefault();
        recognition.start();
    });

    startButton.addEventListener('touchend', () => {
        recognition.stop();
    });
    
} else {
    startButton.textContent = 'Speech recognition not available';
}
