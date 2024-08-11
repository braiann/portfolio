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

let currentProjectIndex = 0;
const projectImage = document.querySelector(".current-project img");
const projectTitle = document.querySelector(".current-project .legend h3");
const indicators = document.querySelectorAll(".progress-indicators .indicator");

function switchProject() {
    if (currentProjectIndex === projects.length - 1) {
        indicators.forEach(indicator => {
            indicator.querySelector(".progress").classList.remove("current");
        });
    }

    setTimeout(() => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;

        projectImage.src = projects[currentProjectIndex].image;
        projectTitle.textContent = projects[currentProjectIndex].title;
        indicators[currentProjectIndex].querySelector(".progress").classList.add("current")
    }, 1);

    
}

setInterval(switchProject, 9000);

function previous() {
    switchProject();
}