var woof = new Audio('sounds/woof1.mp3');

canvas.addEventListener('mousedown', function() {
    woof.currentTime = 0;
    woof.play();
});
