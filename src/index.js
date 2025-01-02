import * as THREE from "three";
import { BokehPass, RenderPass } from "three/examples/jsm/Addons.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

let boundWheelHandler = null;

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
    },
];

// 3D gallery
// Camera
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Config
const config = {
    zoom: {
        minDistance: 2,
        maxDistance: 10,
        zoomSpeed: 0.1,
    },
    movement: {
        acceleraton: 0.05,
        friction: 0.93,
        maxVelocity: 0.3,
        horizontalSpeed: 0.5,
        fadeSpeed: 0.05,
        startX: 0,
        endX: -5,
        startZ: 0,
        endZ: 3,
        startY: 0,
        endY: -5,
        startYRotation: 0,
        endYRotation: Math.PI / 4,
        initialOpacity: 1,
    },
    dof: {
        focus: 5,
        aperture: 0.002,
        maxBlur: 0.02,
    },
    depthFade: {
        focalDistance: 5,
        fadeRange: 3,
        minOpacity: 0.7,
    },
};

const state = {
    velocity: 0,
    isMoving: false,
    targetZ: 5,
    lerpFactor: 0.1,
};

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const galleryElement = document.getElementById("gallery-3d");
galleryElement.appendChild(renderer.domElement);

// Gradient Shader Material
const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color1: { value: new THREE.Color(0x231b42) }, // Dark gray
        color2: { value: new THREE.Color(0x3c1b7d) }, // Blue
        color3: { value: new THREE.Color(0x231b42) }, // Dark gray
    },
    vertexShader: `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
    fragmentShader: `
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
varying vec2 vUv;
void main() {
    float gradient = smoothstep(0.0, 0.5, vUv.y) - smoothstep(0.5, 1.0, vUv.y);
    vec3 color = mix(color1, color2, vUv.y) + color3 * gradient;
    gl_FragColor = vec4(color, 1.0);
}
`,
    side: THREE.DoubleSide,
});

// Large background plane
const backgroundGeometry = new THREE.PlaneGeometry(100, 100);
const backgroundMesh = new THREE.Mesh(backgroundGeometry, gradientMaterial);

backgroundMesh.renderOrder = -1;

backgroundMesh.position.z = -50;
scene.add(backgroundMesh);

// Planes
const planes = [];
for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: config.movement.initialOpacity,
    });

    planes[i] = new THREE.Mesh(planeGeometry, planeMaterial);
    planes[i].position.x = config.movement.startX + i * 3;
    planes[i].position.z = config.movement.startZ - i * 3;
    planes[i].position.y = config.movement.startY + i * 3;
    scene.add(planes[i]);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(project.image, (texture) => {
        const imageAspect = texture.image.width / texture.image.height;

        // Calculate desired width based on camera FOV and distance
        const vFov = THREE.MathUtils.degToRad(camera.fov);
        const viewHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
        const viewWidth = viewHeight * camera.aspect;

        // Make plane width 80% of view width, but cap at 900
        let planeWidth = Math.min(viewWidth * 0.8, 700 / 100); // Divide by 100 to scale to Three.js units
        const planeHeight = planeWidth / imageAspect;

        planes[i].geometry.dispose();
        planes[i].geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

        planeMaterial.map = texture;
        planeMaterial.needsUpdate = true;
    });
}

// Post Processing
const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bokehPass = new BokehPass(scene, camera, {
    focus: config.dof.focus,
    aperture: config.dof.aperture,
    maxblur: config.dof.maxBlur,
});
composer.addPass(bokehPass);

const chromaticAberrationShader = {
    uniforms: {
        tDiffuse: { value: null },
        distortion: { value: 0.0 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float distortion;
        varying vec2 vUv;
        
        void main() {
            vec2 center = vec2(0.5);
            vec2 dir = vUv - center;
            float dist = length(dir);
            
            vec2 offset = dir * (dist * distortion);
            
            vec4 red = texture2D(tDiffuse, vUv + offset);
            vec4 green = texture2D(tDiffuse, vUv);
            vec4 blue = texture2D(tDiffuse, vUv - offset);
            
            gl_FragColor = vec4(red.r, green.g, blue.b, 1.0);
        }
    `,
};
const chromaticAberrationPass = new ShaderPass(chromaticAberrationShader);
chromaticAberrationPass.uniforms.distortion.value = 0.02;
composer.addPass(chromaticAberrationPass);

// Resize
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
    bokehPass.setSize(width, height);

    camera.position.z = 5;
    camera.position.x = 0;
    camera.position.y = 0;
    planes.forEach((plane, i) => {
        const texture = plane.material.map;
        if (texture) {
            const imageAspect = texture.image.width / texture.image.height;
            const vFov = THREE.MathUtils.degToRad(camera.fov);
            const viewHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
            const viewWidth = viewHeight * camera.aspect;

            const planeWidth = viewWidth * 0.8;
            const planeHeight = planeWidth / imageAspect;

            plane.geometry.dispose();
            plane.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
        }
    });
}

// Controls
const handleWheel = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    if (
        (camera.position.z > 5.5 && delta > 0) ||
        (camera.position.z < -projects.length * 1.9 && delta < 0)
    ) {
        return;
    }

    console.log(camera.position.z);

    state.velocity -= delta * config.movement.acceleraton;
    state.velocity = Math.max(
        Math.min(state.velocity, config.movement.maxVelocity),
        -config.movement.maxVelocity
    );

    console.log(config);
};

// Animate
function animate() {
    requestAnimationFrame(animate);

    const newXPosition = camera.position.x + state.velocity;
    camera.position.x = newXPosition;

    const newZPosition = THREE.MathUtils.lerp(
        5,
        10,
        (newXPosition - config.movement.startX) /
            (config.movement.endX - config.movement.startX)
    );
    camera.position.z = newZPosition;

    const newYPosition = THREE.MathUtils.lerp(
        config.movement.startY,
        config.movement.endY,
        (newXPosition - config.movement.startX) /
            (config.movement.endX - config.movement.startX)
    );
    camera.position.y = newYPosition;

    state.velocity *= config.movement.friction;

    scene.traverse((object) => {
        if (object.isMesh) {
            updateObjectOpacity(object, camera);
        }
    });

    composer.render();
}

function resetGalleryState() {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;
    state.velocity = 0;
}

function updateObjectOpacity(object, camera) {
    const distance = camera.position.distanceTo(object.position);
    const distanceFromFocal = Math.abs(
        distance - config.depthFade.focalDistance
    );

    const opacity = Math.max(
        config.depthFade.minOpacity,
        1 - distanceFromFocal / config.depthFade.fadeRange
    );

    if (object.material) {
        object.material.transparent = true;
        object.material.opacity = opacity;
    }
}

function createParticleSystem() {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // Create a scattered field of particles
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100; // x
        positions[i + 1] = (Math.random() - 0.5) * 100; // y
        positions[i + 2] = (Math.random() - 0.5) * 100; // z
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create shimmering material
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            cameraPosition: { value: camera.position },
        },
        vertexShader: `
            uniform float time;
            varying float vDistance;
            
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vDistance = length(mvPosition.xyz);
                gl_Position = projectionMatrix * mvPosition;
                gl_PointSize = (300.0 / vDistance) * sin(time + position.x * 0.5);
            }
        `,
        fragmentShader: `
            varying float vDistance;
            void main() {
                float alpha = (1000.0 - vDistance) / 1000.0;
                gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.5);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);
    return particleSystem;
}

export function showGallery() {
    const galleryElement = document.getElementById("gallery-3d");
    galleryElement.classList.add("show");

    if (!boundWheelHandler) {
        boundWheelHandler = (e) => handleWheel(e);
        galleryElement.addEventListener("wheel", boundWheelHandler, {
            passive: false,
        });
    }

    animate();
}

export function hideGallery() {
    const galleryElement = document.getElementById("gallery-3d");
    galleryElement.classList.remove("show");

    planes.forEach((plane) => {
        if (plane.material.map) {
            plane.material.map.dispose();
        }
        plane.material.dispose();
        plane.geometry.dispose();
    });

    if (boundWheelHandler) {
        galleryElement.removeEventListener("wheel", boundWheelHandler);
        boundWheelHandler = null;
    }
    resetGalleryState();
}

document
    .getElementById("open-gallery-button")
    .addEventListener("click", showGallery);
window.addEventListener("resize", handleResize);
document
    .getElementById("close-gallery-button")
    .addEventListener("click", hideGallery);
