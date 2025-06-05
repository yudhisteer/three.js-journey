import * as THREE from "three";
import gsap from "gsap";

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

// Time
let time: number = Date.now();

// Clock
const clock: THREE.Clock = new THREE.Clock();

// gsap
gsap.to(mesh.position, {
  x: 2,
  duration: 1,
  delay: 1,
  ease: "power2.inOut",
});

// 6. Animate the scene
function tick() {
  // Time
  const currentTime: number = Date.now();
  const deltaTime: number = currentTime - time;
  time = currentTime;
  console.log(deltaTime);

  // Clock
  const elapsedTime: number = clock.getElapsedTime();
  console.log(elapsedTime);

  // Update objects

  // mesh.rotation.y += 0.01; // Rotate the mesh by 0.01 radians
  // mesh.rotation.y += deltaTime * 0.01; // Cube is rotating at the same speed regardless of the frame rate
  //mesh.rotation.y = elapsedTime * Math.PI * 2; // Cube does 1 full rotation every second
  //mesh.position.y = Math.sin(elapsedTime); // Cube is going up and down in a sin wave

  // Render
  renderer.render(scene, camera);

  // Request the next frame
  window.requestAnimationFrame(tick);

  // Log the tick
  console.log("tick");
}

// Call the tick function
tick();