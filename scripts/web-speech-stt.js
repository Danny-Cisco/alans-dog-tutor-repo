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

    startButton.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        recognition.start();
    });
    
    startButton.addEventListener('pointerup', (event) => {
        event.preventDefault();
        recognition.stop();
    });
    

    // Key events for "push-to-talk" with spacebar
document.addEventListener('keydown', (event) => {
    if (event.key === 'Space') { // 32 is the keyCode for Spacebar
        recognition.start();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Space') { // 32 is the keyCode for Spacebar
        recognition.stop();
    }
});
    
} else {
    startButton.textContent = 'Speech recognition not available';
}
