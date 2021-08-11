import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { FontLoader } from "three";

/**
 * Fonts
 */

const fontLoader = new THREE.FontLoader();
console.time("create");
fontLoader.load("/fonts/Masterpiece_Regular.json", (font) => {
  const textGeometry = new THREE.TextBufferGeometry("- Mukhul Menon", {
    font: font,
    size: 0.25,
    height: 0.1,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const textGeometry1 = new THREE.TextBufferGeometry("Hello Everyone", {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const textMaterial = new THREE.MeshMatcapMaterial({
    // wireframe: true,
    matcap: matcapTexture,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  textGeometry.computeBoundingBox();
  textGeometry.center();
  text.position.x = 0.75;
  scene.add(text);

  const text1 = new THREE.Mesh(textGeometry1, textMaterial);
  textGeometry.computeBoundingBox();
  textGeometry1.center();
  scene.add(text1);
  text1.position.x = -1;
  text1.position.y = 0.5;
});

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture1 = textureLoader.load("/textures/matcaps/8.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/matcap cube.png");

/**
 * Object
 */
const torusGeometry = new THREE.TorusBufferGeometry(0.2, 0.12, 20, 45);
const objMaterial1 = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture1,
});
for (let i = 0; i < 200; i++) {
  const torus = new THREE.Mesh(torusGeometry, objMaterial1);

  torus.position.x = (Math.random() - 0.5) * 18;
  torus.position.y = (Math.random() - 0.5) * 18;
  torus.position.z = (Math.random() - 0.5) * 18;

  torus.rotation.x = Math.random() * Math.PI;
  torus.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  torus.scale.set(scale, scale, scale);
  scene.add(torus);
}
const boxGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5, 4, 4, 4);
const objMaterial2 = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture2,
});
for (let i = 0; i < 200; i++) {
  const box = new THREE.Mesh(boxGeometry, objMaterial2);

  box.position.x = (Math.random() - 0.5) * 18;
  box.position.y = (Math.random() - 0.5) * 18;
  box.position.z = (Math.random() - 0.5) * 18;

  box.rotation.x = Math.random() * Math.PI;
  box.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  box.scale.set(scale, scale, scale);
  scene.add(box);
}
console.timeEnd("create");
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 1.5;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
