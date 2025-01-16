const projects = [
    {
        title: "Modi",
        image: "/resources/images/project-screenshots/modi.webp",
    },
    {
        title: "Bobii Leads",
        image: "/resources/images/project-screenshots/bobii.webp",
    },
    {
        title: "Go Beyond",
        image: "/resources/images/project-screenshots/gobeyond.webp",
    },
    {
        title: "Digital Executive",
        image: "/resources/images/project-screenshots/digitalexecutive.webp",
    },
    {
        title: "Define Beauty",
        image: "/resources/images/project-screenshots/definebeauty.webp",
    },
    {
        title: "STEM Muse",
        image: "/resources/images/project-screenshots/stemmuse.webp",
    },
    {
        title: "MoveMatch",
        image: "/resources/images/project-screenshots/movematch.webp",
    },
];

const projectSection = document.getElementById("projects");
const projectImage = document.querySelector(".current-project img");
const projectTitle = document.querySelector(".current-project .legend h3");
const indicators = document.querySelectorAll(".progress-indicators .indicator");
let currentProjectIndex = 0;
let projectInterval;

function preloadImages(images, callback) {
    let loadedCount = 0;

    images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                callback();
            }
        };
        img.onerror = () => {
            // Handle the case where the image fails to load
            loadedCount++;
            if (loadedCount === images.length) {
                callback();
            }
        };
    });
}

function switchProject(direction) {
    setTimeout(() => {
        if (direction === "back") {
            currentProjectIndex =
                (currentProjectIndex - 1 + projects.length) % projects.length;
        } else {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        }

        projectImage.src = projects[currentProjectIndex].image;
        projectTitle.textContent = projects[currentProjectIndex].title;
        indicators.forEach((indicator, index) => {
            indicator.querySelector(".progress").classList.remove("current");
            indicator.querySelector(".progress").classList.remove("filled");

            if (currentProjectIndex > index) {
                indicator.querySelector(".progress").classList.add("filled");
            }
        });
        indicators[currentProjectIndex]
            .querySelector(".progress")
            .classList.add("current");
    }, 1);

    clearInterval(projectInterval);
    projectInterval = setInterval(switchProject, 5000);
}

function previous() {
    switchProject("back");
}

function next() {
    switchProject("forward");
}

projectInterval = setInterval(switchProject, 5000);

// Preload images and then show the projects section
const projectImages = projects.map((project) => project.image);
preloadImages(projectImages, () => {
    projectSection.classList.remove("hidden");
    projectSection.classList.add("visible");
});
