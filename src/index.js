import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const heroBackgroundElement = document.getElementById("hero-bg");
heroBackgroundElement.appendChild(renderer.domElement);

// Load Object
const loader = new GLTFLoader();

let pendant;
loader.load(
    "/portfolio/assets/abstract_rainbow_translucent_pendant-BnOTgKC3.glb",
    function (gltf) {
        pendant = gltf.scene;
        scene.add(pendant);
        pendant.position.z = 0;
        pendant.position.x = 0;
        pendant.position.y = -1;
        pendant.scale.set(4, 4, 4);
    }
);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Physics parameters
let velocityX = 0;
let velocityY = 0;
const acceleration = 0.0001;
const friction = 0.98;
const maxVelocity = 0.1;
const minVelocity = 0.001;
let autoRotationVelocity = 0.0008;

// Mouse movement tracking
let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    const deltaX = mouseX - prevMouseX;
    const deltaY = mouseY - prevMouseY;

    velocityX += deltaY * acceleration;
    velocityY += deltaX * acceleration;

    prevMouseX = mouseX;
    prevMouseY = mouseY;
});

// Animation
function animate() {
    requestAnimationFrame(animate);

    if (pendant) {
        velocityX *= friction;
        velocityY *= friction;

        velocityX =
            Math.sign(velocityX) * Math.max(Math.abs(velocityX), minVelocity);
        velocityY =
            Math.sign(velocityY) * Math.max(Math.abs(velocityY), minVelocity);

        velocityX = Math.max(Math.min(velocityX, maxVelocity), -maxVelocity);
        velocityY = Math.max(Math.min(velocityY, maxVelocity), -maxVelocity);

        pendant.rotation.x += velocityX;
        pendant.rotation.y += velocityY + autoRotationVelocity;
    }

    renderer.render(scene, camera);
}
animate();

// Clean up
window.addEventListener("beforeunload", () => {
    scene.dispose();
    renderer.dispose();
});
