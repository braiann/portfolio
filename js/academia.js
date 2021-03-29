const intro = document.querySelector('.intro');
const introVideo = intro.querySelector('video');
const title = intro.querySelector('h1');
console.log(title);

// ScrollMagic
const controller = new ScrollMagic.Controller();

// scenes
let sceneIntroVideo = new ScrollMagic.Scene({
    duration: 6000,
    triggerElement: intro,
    triggerHook: 0
})
    .addIndicators()
    .setPin(intro)
    .addTo(controller);

// intro text animation
const textAnim = TweenMax.fromTo(title, 3, {opacity: 0}, {opacity: 1});

let introTextScene = new ScrollMagic.Scene({
    duration: 1000,
    triggerElement: intro,
    triggerHook: 0,
    offset: 5000
})
.addIndicators()
.setTween(textAnim)
.addTo(controller);

// video animation
let accelamount = .5;
let scrollpos = 0;
let delay = 0;

sceneIntroVideo.on('update', e => {
    scrollpos = e.scrollPos / 700;
});

setInterval(() => {
    introVideo.currentTime = scrollpos;
}, 6);

