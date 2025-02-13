import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

import bobiiImg from "./resources/images/project-screenshots/bobii.webp";
import modiImg from "./resources/images/project-screenshots/modi.webp";
import gobeyondImg from "./resources/images/project-screenshots/gobeyond.webp";
import digitalexecutiveImg from "./resources/images/project-screenshots/digitalexecutive.webp";
import definebeautyImg from "./resources/images/project-screenshots/definebeauty.webp";
import stemmuseImg from "./resources/images/project-screenshots/stemmuse.webp";
import movematchImg from "./resources/images/project-screenshots/movematch.webp";

import pendantObject from "./resources/models/abstract_rainbow_translucent_pendant.glb";

const projects = [
    {
        title: "Modi",
        image: modiImg,
    },
    {
        title: "Bobii Leads",
        image: bobiiImg,
    },
    {
        title: "Go Beyond",
        image: gobeyondImg,
    },
    {
        title: "Digital Executive",
        image: digitalexecutiveImg,
    },
    {
        title: "Define Beauty",
        image: definebeautyImg,
    },
    {
        title: "STEM Muse",
        image: stemmuseImg,
    },
    {
        title: "MoveMatch",
        image: movematchImg,
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

document.getElementById("previous").addEventListener("click", previous);
document.getElementById("next").addEventListener("click", next);

projectInterval = setInterval(switchProject, 5000);

// Preload images and then show the projects section
const projectImages = projects.map((project) => project.image);
preloadImages(projectImages, () => {
    projectSection.classList.remove("hidden");
    projectSection.classList.add("visible");
});

// THREEJS
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
loader.load(pendantObject, function (gltf) {
    pendant = gltf.scene;
    scene.add(pendant);
    pendant.position.z = 0;
    pendant.position.x = 0;
    pendant.position.y = -1;
    pendant.scale.set(3, 3, 3);
});
heroBackgroundElement.classList.add("loaded");

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
const acceleration = 0.00003;
const scrollAcceleration = 0.00005;
const friction = 0.98;
const maxVelocity = 0.1;
const minVelocity = 0.001;
let autoRotationVelocity = 0.0008;

// Mouse movement tracking
let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let normalizedMouseX = 0;
let normalizedMouseY = 0;

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Convert to normalized coordinates (-1 to 1)
    normalizedMouseX = (mouseX / window.innerWidth) * 2 - 1;
    normalizedMouseY = -(mouseY / window.innerHeight) * 2 + 1;

    const deltaX = mouseX - prevMouseX;
    const deltaY = mouseY - prevMouseY;

    velocityX += deltaY * acceleration;
    velocityY -= deltaX * acceleration;

    prevMouseX = mouseX;
    prevMouseY = mouseY;
});

// Scroll position tracking
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollDelta = scrollTop - lastScrollTop;

    velocityX += scrollDelta * scrollAcceleration;

    lastScrollTop = scrollTop;
});

// Add these variables after other declarations
let currentLightX = 5;
let currentLightY = 5;
const lightLerpFactor = 0.1; // Adjust between 0 and 1 for different smoothing amounts

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

        // Smooth light position updates
        currentLightX +=
            (normalizedMouseX * 10 - currentLightX) * lightLerpFactor;
        currentLightY +=
            (normalizedMouseY * 10 - currentLightY) * lightLerpFactor;

        directionalLight.position.set(currentLightX, currentLightY, 5);
    }

    renderer.render(scene, camera);
}
animate();

// Clean up
window.addEventListener("beforeunload", () => {
    scene.dispose();
    renderer.dispose();
});
