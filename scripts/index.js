const btn = document.querySelector('a')
const stateName = document.querySelector('p')

let woofTrigger; 

/*
const r = new rive.Rive({
    src: 'rive/dog_head.riv',
    canvas: document.getElementById('canvas'),
    autoplay: true,
    stateMachines: 'State Machine',
    fit: rive.Fit.cover,
    onLoad: (_) => {
        const inputs = r.stateMachineInputs('State Machine');
   
    },
    
});
*/

const r = new rive.Rive({
    src: 'rive/dog_head.riv',
    canvas: document.getElementById('canvas'),
    autoplay: true,
    stateMachines: 'State Machine',
    fit: rive.Fit.cover,
    onLoad: (_) => {
        // Get the inputs via the name of the state machine
        const inputs = r.stateMachineInputs('State Machine');
        // Find the input you want to set a value for, or trigger
        woofTrigger = inputs.find(i => i.name === 'woof');

    },
});



window.onload = function() {
    document.getElementById('prompt-input-box').focus();
};




document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted!');
    woof.currentTime = 0;
    woof.play();
    woofTrigger.fire();
});






