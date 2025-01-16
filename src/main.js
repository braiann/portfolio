const projects = [
    {
        title: "Modi",
        image: "/portfolio/assets/modi-DMPraqOM.webp",
    },
    {
        title: "Bobii Leads",
        image: "/portfolio/assets/bobii-D9NG0ttu.webp",
    },
    {
        title: "Go Beyond",
        image: "/portfolio/assets/gobeyond-Cnem_Yzr.webp",
    },
    {
        title: "Digital Executive",
        image: "/portfolio/assets/digitalexecutive-B6L7lgSg.webp",
    },
    {
        title: "Define Beauty",
        image: "/portfolio/assets/definebeauty-BWupOryR.webp",
    },
    {
        title: "STEM Muse",
        image: "/portfolio/assets/stemmuse-Bsx-rKKz.webp",
    },
    {
        title: "MoveMatch",
        image: "/portfolio/assets/movematch-18fk4l1A.webp",
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
