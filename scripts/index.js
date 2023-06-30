const btn = document.querySelector('a')
const stateName = document.querySelector('p')

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

window.onload = function() {
    document.getElementById('prompt-input-box').focus();
};




document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted!');
    woof.currentTime = 0;
    woof.play();
});






