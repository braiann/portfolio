/*** MOBILE MENU ***/

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    function changeLinkState() {
        let index = sections.length;

        const aboutLinkIndex = 3

        while(--index && window.scrollY + 200 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.parentNode.classList.remove('current'));
        if (index === 0 || index === 1) { // Assuming 'Hero' is 0 and 'About' is 1
            navLinks[aboutLinkIndex].parentNode.classList.add('current');
        } else {
            navLinks[index + 2] && navLinks[index + 2].parentNode.classList.add('current');
        }
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    function changeLinkState() {
        let index = sections.length;
        const aboutLinkIndex = 3
        while(--index && window.scrollY + 200 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.parentNode.classList.remove('current'));
        if (index === 0 || index === 1) { // Assuming 'Hero' is 0 and 'About' is 1
            navLinks[aboutLinkIndex].parentNode.classList.add('current');
        } else {
            navLinks[index + 2] && navLinks[index + 2].parentNode.classList.add('current');
        }
    }
    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMobileSidebar);
    });
});

function toggleMobileSidebar() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('toggled');
    const menuButton = document.getElementById('mobile-menu-button');
    menuButton.classList.toggle('toggled');
}


/*** END MOBILE MENU ***/

/*** PROJECTS CAROUSEL ***/

document.addEventListener('DOMContentLoaded', function() {
    fetch('carousel-data.json')
        .then(response => response.json())
        .then(data => {
            initializeCarousel(data);
            startCarousel(data);
        })
        .catch(error => console.error('Error:', error));
});

function initializeCarousel(data) {
    const buttonsContainer = document.querySelector('.index');
    const activeProject = document.querySelector('.active-project');

    data.forEach((project, index) => {
        const button = document.createElement('button');
        button.textContent = project.title;
        button.classList.add(index === 0 ? 'active' : 'inactive');
        button.addEventListener('click', () => {
            updateCarouselContent(project, index);
        });
        buttonsContainer.appendChild(button);

        if (index === 0) {
            updateCarouselContent(project, index);
        }
    });
}

function updateCarouselContent(project, index) {
    const activeProject = document.querySelector('.active-project');
    activeProject.innerHTML = `
        <img src=${project.imgSrc} alt=${project.title}>
        <div class="details">
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">
                <span>View website</span>
            </a>
        </div>
    `;

    const buttons = document.querySelectorAll('.index button');
    buttons.forEach((button, i) => {
        button.classList.remove('active');
        button.classList.add('inactive');
        if (i === index) {
            button.classList.add('active');
        }
    });
}

function startCarousel(data) {
    let currentIndex = 0;
    const carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % data.length;
        const project = data[currentIndex];
        updateCarouselContent(project, currentIndex);
    }, 5000);

    const buttons = document.querySelectorAll('.index button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(carouselInterval);
        });
    });
}