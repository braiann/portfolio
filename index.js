/* control stories-style project gallery, switching automatically from one to the next every 10 seconds  */
const projects = [
    {
        title: "Modi",
        image: "resources/images/project-screenshots/modi.webp",
    },
    {
        title: "Bobii Leads",
        image: "resources/images/project-screenshots/bobii.webp",
    },
    {
        title: "Go Beyond",
        image: "resources/images/project-screenshots/gobeyond.webp",
    },
    {
        title: "Digital Executive",
        image: "resources/images/project-screenshots/digitalexecutive.webp",
    },
    {
        title: "Define Beauty",
        image: "resources/images/project-screenshots/definebeauty.webp",
    },
    {
        title: "STEM Muse",
        image: "resources/images/project-screenshots/stemmuse.webp",
    },
    {
        title: "MoveMatch",
        image: "resources/images/project-screenshots/movematch.webp",
    }
]

let projectInterval;

let currentProjectIndex = 0;
const projectImage = document.querySelector(".current-project img");
const projectTitle = document.querySelector(".current-project .legend h3");
const indicators = document.querySelectorAll(".progress-indicators .indicator");

function switchProject(direction) {
    setTimeout(() => {
        if (direction === "back") {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        } else {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        }

        projectImage.src = projects[currentProjectIndex].image;
        projectTitle.textContent = projects[currentProjectIndex].title;
        indicators.forEach((indicator, index) => {
            indicator.querySelector(".progress").classList.remove("current");
            indicator.querySelector(".progress").classList.remove("filled");
    
            if (currentProjectIndex > index) {
                indicator.querySelector(".progress").classList.add("filled")  
            }
        });
        indicators[currentProjectIndex].querySelector(".progress").classList.add("current")
    }, 1);

    clearInterval(projectInterval)
    projectInterval = setInterval(switchProject, 5000)
}

projectInterval = setInterval(switchProject, 5000);

function previous() {
    switchProject("back");
}

function next() {
    switchProject("forward")
}