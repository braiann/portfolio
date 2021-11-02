// First Home paragraph animation
let helloTL = gsap.timeline();
helloTL.fromTo("h1", {
    opacity: 0,
    fontWeight: 100,
}, {
    opacity: .5,
    fontWeight: 100,
    duration: .5,
});
helloTL.fromTo("h1", {
    opacity: .5,
    fontWeight: 100,
}, {
    opacity: 1,
    fontWeight: 900,
    duration: .4,
    delay: 0,
    transform: "scale(1.1)"
});
helloTL.fromTo("h1", {
    transform: "scale(1.1)"
}, {
    opacity: 1,
    fontWeight: 900,
    duration: .2,
    delay: 0,
    transform: "scale(1)"
});
helloTL.to("#home0", {
    scrollTrigger: {
                trigger: "#home0",
                scrub: true,
                start: "70% center",
                end: "90% center",
                // markers: true,
            },
    opacity: 0,
    y: -50,
});

// Second Home paragraph animation
helloTL.fromTo("#home1", {opacity: 0},{
    scrollTrigger: {
        trigger: "#home1 p",
        scrub: true,
        start: "0% bottom",
        end: "300% bottom",
        // markers: true,
    },
    opacity: 1,
},);
helloTL.fromTo("#home1", {opacity: 1},{
    scrollTrigger: {
        trigger: "#home1 p",
        scrub: true,
        start: "0% top",
        end: "100% top",
        // markers: true,
    },
    opacity: 0,
    y: -50,
},);
helloTL.to("#home1 strong", {
    scrollTrigger: {
        trigger: "#home1 strong", 
        scrub: true,
        start: "50% center",
        end: "450% center",
        // markers: true,
    },
    backgroundPosition: 100,
})

// Third Home paragraph animation
helloTL.fromTo("#home2", {opacity: 0}, {
    scrollTrigger: {
        trigger: "#home2 p",
        scrub: true,
        start: "0% bottom",
        end: "300% bottom",
        delay: 3,
        // markers: true,
    },
    opacity: 1,
},);
helloTL.fromTo("#home2", {opacity: 1}, {
    scrollTrigger: {
        trigger: "#home2 p",
        scrub: true,
        start: "0% top",
        end: "100 top",
        // markers: true
    },
    opacity: 0,
    y: -50,
},);
helloTL.to("#home2 strong", {
    scrollTrigger: {
        trigger: "#home2 strong",
        scrub: true,
        start: "0% center",
        end: "500% center",
        // markers: true,
    },
    backgroundSize: 100
});

// Third Home paragraph animation
helloTL.fromTo("#home3", {opacity: 0}, {
    scrollTrigger: {
        trigger: "#home3 p",
        scrub: true,
        start: "0% center",
        end: "100% center",
        // markers: true,
    },
    opacity: 1,
},);
helloTL.fromTo("#home3", {opacity: 0}, {
    scrollTrigger: {
        trigger: "#home3 p",
        scrub: true,
        start: "0% center",
        end: "850vh center",
        pin: true,
        // markers: true,
    }
},);
helloTL.fromTo("#home3 strong:first-child", {
    opacity: 1,
    display: "block",
}, {
    scrollTrigger: {
        trigger: "#home3 strong",
        scrub: true,
        start: "200% center",
        end: "400% center",
        // markers: true,
    },
    opacity: 0,
    display: "none",
    y: -20
},);
helloTL.to("#home3 strong:first-child", {
    scrollTrigger: {
        trigger: "#home3 strong",
        scrub: true,
        start: "100% center",
        end: "200% center",
        // markers: true,
    },
    backgroundPosition: 50,
},);
helloTL.fromTo("#home3 strong:last-child", {
        opacity: 0,
        display: "none",
        y: 20
    }, {
        scrollTrigger: {
            trigger: "#home3 strong",
            scrub: true,
            start: "400% center",
            end: "500% center",
            // markers: true,
        },
        opacity: 1,
        display: "block",
        y: 0
},);
helloTL.to("#home3 strong:last-child", {
    scrollTrigger: {
        trigger: "#home3 strong",
        scrub: true,
        start: "400% center",
        end: "500% center",
        // markers: true,
    },
    backgroundPosition: 50,
},);


// Contact Card handler
function expandContactCard() {
    const contactCardContainer = document.getElementById("contact-card-container");
    contactCardContainer.style.display = "flex";
}

function hideContactCard() {
    const contactCardContainer = document.getElementById("contact-card-container");
    contactCardContainer.style.display = "none";
}
