const canvas = document.getElementById('canvas');

function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type) {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;        
        case "touchend":   type = "mouseup"; break;
        default: return;
    }

    // Initialize the mouse event
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                first.screenX, first.screenY,
                                first.clientX, first.clientY, false,
                                false, false, false, 0/*left*/, null);

    // Dispatch the created event
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    canvas.addEventListener("touchstart", touchHandler, true);
    canvas.addEventListener("touchmove", touchHandler, true);
    canvas.addEventListener("touchend", touchHandler, true);
    canvas.addEventListener("touchcancel", touchHandler, true);    
}

// Call the init function to start listening for touch events
init();