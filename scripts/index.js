
let btn = document.querySelector("input[type='submit']");

const r = new rive.Rive({
    src: 'rive/dog_head.riv',
    canvas: document.getElementById('canvas'),
    autoplay: true,
    stateMachines: 'State Machine',
    fit: rive.Fit.cover,
    onLoad: (_) => {
        const inputs = r.stateMachineInputs('State Machine');
        const woofTrigger = inputs.find(i => i.name === 'woof');
        btn.onclick = (e) => {
            e.preventDefault();
            woofTrigger.fire();
        };
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






