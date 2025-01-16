import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

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
    "./resources/models/abstract_rainbow_translucent_pendant.glb",
    function (gltf) {
        pendant = gltf.scene;
        scene.add(pendant);
        pendant.position.z = 0;
        pendant.position.x = 0;
        pendant.position.y = -1;
        pendant.scale.set(7, 7, 7);
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
