import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import moonTexture from "./assets/moon-texture.jpg";
import moonDisplacementMap from "./assets/moon-displacement.jpg";

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(moonTexture);
const displacementMap = textureLoader.load(moonDisplacementMap);

const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    displacementMap: displacementMap,
    displacementScale: 0.05,
    bumpMap: displacementMap,
    bumpScale: 0.04,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let w, h;
function setRendererSize() {
    w = window.innerWidth < 800 ? window.innerWidth : window.innerWidth / 2;
    h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

if (document.readyState === 'complete') {
    setRendererSize();
} else {
    window.addEventListener('load', setRendererSize);
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(100, 10, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(25, w / h, 0.1, 1000);
camera.position.z = 20;
scene.add(camera);

let canvas = document.querySelector("canvas");
if (!canvas) {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
}

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
setRendererSize();
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

window.addEventListener("resize", setRendererSize);

const loop = () => {
    mesh.rotation.y += 0.001;
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

loop();
