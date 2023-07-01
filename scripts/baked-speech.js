var letmethink = new Audio('sounds/hmmm-let-me-think-about-that.mp3');
var letssee = new Audio('sounds/lets-see.mp3');
var greatquestion = new Audio('sounds/that-was-a-great-question.mp3');

letmethink.onended = function() {
    console.log("The audio has finished playing");
    talkingBool.value = false;
    // Place your function here.
};


letssee.onended = function() {
    console.log("The audio has finished playing");
    talkingBool.value = false;
    // Place your function here.
};


greatquestion.onended = function() {
    console.log("The audio has finished playing");
    talkingBool.value = false;
    // Place your function here.
};