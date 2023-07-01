var letmethink = new Audio('sounds/hmmm-let-me-think-about-that.mp3');


letmethink.onended = function() {
    console.log("The audio has finished playing");
    talkingBool.value = false;
    // Place your function here.
};