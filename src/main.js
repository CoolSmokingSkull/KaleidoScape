// src/main.js
import * as THREE from 'three';
import { GUI } from 'dat.gui';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

// Geometry and Material
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

camera.position.z = 30;

// dat.gui Controls
const gui = new GUI();
const params = {
  rotationSpeed: 0.01,
  color: '#ff0000',
  wireframe: false
};

gui.add(params, 'rotationSpeed', 0, 0.1).name('Rotation Speed');
gui.addColor(params, 'color').name('Color').onChange((value) => {
  material.color.set(value);
});
gui.add(params, 'wireframe').name('Wireframe').onChange((value) => {
  material.wireframe = value;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += params.rotationSpeed;
  knot.rotation.y += params.rotationSpeed;
  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
