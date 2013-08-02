var leapMotionController = new Leap.Controller({enableGestures: true});
var slideReady = true;
var locked = false;

Reveal.addEventListener('slidechanged', function (event) {
    slideReady = true;
});

window.onkeydown = function(event) {
    if(event.keyCode == '71') {
        console.log("change lock");
        locked = !locked;
    }
}

leapMotionController.on('connect', function () {
    console.log("Successfully connected leap motion controller.");
});

leapMotionController.on('frame', function (event) {
    if(!locked) {
        if (event.gestures.length > 0) {
            var gesture = event.gestures[0];
            if (gesture.state === 'stop') {
                if (slideReady) {
                    if (gesture.direction[0] > gesture.direction[2]) {
                        goToPrevious();
                    } else {
                        goToNext();
                    }
                }
            }
        }
    }
});

function goToPrevious() {
    if (!Reveal.isFirstSlide()) {
        slideReady = false;
        Reveal.prev();
    }
};

function goToNext() {
    if (!Reveal.isLastSlide()) {
        slideReady = false;
        Reveal.next();
    }
};

leapMotionController.connect();