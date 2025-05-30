import * as THREE from "three";

// 1. Create a scene
const scene: THREE.Scene = new THREE.Scene();

// 2. Create objects
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // Add the mesh to the scene

// 3. Create a camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.z = 5;
scene.add(camera); // Add the camera to the scene

// 4. Create a renderer
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// 5. Render the scene
renderer.render(scene, camera);
