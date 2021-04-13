// Projects .segmented-control controller
const segmentedControl = document.querySelector('.segmented-control').querySelectorAll('button')
const projectsContainers = document.querySelectorAll('.projects-container');
for (let i = 0; i < segmentedControl.length; i++) {
    const button = segmentedControl[i];
    const projectsContainer = projectsContainers[i];
    button.addEventListener('click', () => {
        document.querySelector('.segmented-btn.active').classList.remove('active');
        document.querySelector('.projects-container.active').classList.remove('active');
        button.classList.add('active');
        projectsContainer.classList.add('active');
        const segmentedIndicator = document.querySelector('#segmented-indicator');
        segmentedIndicator.style.transform = `translateX(calc(-70px + ${70*i}px))`;
    });
}


// Card shining animation trigger
const cardContainer = document.querySelector('.card-container');
const cardFront = cardContainer.querySelector('.card-front');
window.addEventListener('scroll', () => {
    if (inView(cardContainer)) {
        console.log("yes");
        cardFront.style.animation = 'shining-card 1.5s forwards';
        cardTitle.style.animation = 'shining-card 1.5s forwards';
    }
})

function inView(element) {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageXOffset;
    const scrollPosition = scrollY + windowHeight;
    const elementPosition = element.getBoundingClientRect().top + scrollY + element.clientHeight;
    if (scrollPosition > elementPosition) {
        return true;
    }
    return false;
}