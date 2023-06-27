const btn = document.querySelector('a')
const stateName = document.querySelector('p')

const r = new rive.Rive({
    src: 'https://assets.codepen.io/2621168/new_file_1.riv',
    canvas: document.getElementById('canvas'),
    autoplay: true,
    stateMachines: 'State Machine 1',
    fit: rive.Fit.cover,
    onLoad: (_) => {
        const inputs = r.stateMachineInputs('State Machine 1');
        const bumpTrigger = inputs.find(i => i.name === 'Trigger 2');
        bumpTrigger.fire();
        btn.onclick = (e) => {
            e.preventDefault();
            bumpTrigger.fire()
        };
    },
    onStateChange: (event) => {
        //btn.innerHTML = event.data[0];
        
        if(event.data[0] == 'Fireup' || event.data[0] == 'Flying') {
            btn.innerHTML = 'Uploading..'
            btn.style.backgroundColor = 'rgba(255,255,255,.5)'
            document.querySelector('body').style.backgroundColor = '#8cbdff'
        }

        else if(event.data[0] == 'Firedown') {
            btn.innerHTML = 'Finished!'

            setTimeout(() => {
                btn.style.backgroundColor = 'white'
                btn.innerHTML = 'Upload File'
                document.querySelector('body').style.backgroundColor = 'rgb(0, 110, 255)'
            }, 1000)
        }
    },
});