//let btn = document.querySelector("input[type='submit']");

let woofTrigger;
let talkingBool;

const r = new rive.Rive({
    src: 'rive/dog_head.riv',
    canvas: document.getElementById('canvas'),
    autoplay: true,
    stateMachines: 'State Machine',
    fit: rive.Fit.cover,
    onLoad: (_) => {
        const inputs = r.stateMachineInputs('State Machine');
        woofTrigger = inputs.find(i => i.name === 'Woof');
        talkingBool = inputs.find(i => i.name === 'Talking');
    },
});

window.onload = function() {
    document.getElementById('prompt-input-box').focus();
};

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted!');
});

function begin() {
    document.getElementById('modal').style.display = "none";
    var welcomeAudio = document.getElementById('welcomeAudio');

    welcomeAudio.onplay = function() {
        // Ensure rive.Rive onLoad has completed
        if (talkingBool) {
            talkingBool.value = true;
        }
    };
    
    welcomeAudio.onended = function() {
        // Ensure rive.Rive onLoad has completed
        if (talkingBool) {
            talkingBool.value = false;
        }
    };

    welcomeAudio.play();
}
