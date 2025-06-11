import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Cursor
**/

const cursor: { x: number, y: number } = {
  x: 0,
  y: 0
}

const sizes: { width: number, height: number } = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Mouse move
// window.addEventListener('mousemove', (event) =>
// {
//   cursor.x = event.clientX / sizes.width - 0.5 // -0.5 to 0.5
//   cursor.y = -(event.clientY / sizes.height - 0.5) // -0.5 to 0.5

//   console.log(cursor.x, cursor.y)

//   // Update the camera
//   // camera.position.x = cursor.x * 5
//   // camera.position.y = cursor.y * 5
//   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
//   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
//   camera.position.y = cursor.y * 3
//   camera.lookAt(mesh.position)
// })




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
// 3.1 Perspective Camera
const fov: number = 75;
const aspectRatio: number = sizes.width / sizes.height;
const perspectiveNear: number = 0.1;
const perspectiveFar: number = 100;
const perspectiveCamera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio,
  perspectiveNear,
  perspectiveFar,
);

// 3.2 Orthographic Camera
const left: number = -1;
const right: number = 1;
const top: number = 1;
const bottom: number = -1;
const orthographicNear: number = 0.1;
const orthographicFar: number = 100;
const orthographicCamera: THREE.OrthographicCamera = new THREE.OrthographicCamera(
  left * aspectRatio,
  right * aspectRatio,
  top,
  bottom,
  orthographicNear,
  orthographicFar,
);




// 3.3 Set the camera
const camera = perspectiveCamera; // perspectiveCamera or orthographicCamera
camera.position.z = 5;
camera.lookAt(mesh.position)
scene.add(camera); // Add the camera to the scene

// 4. Create a renderer
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);


/**
 * Orbit Controls
 */

// Controls
const controls: OrbitControls = new OrbitControls(camera, canvas)
// controls.target.y = 2 
controls.enableDamping = true
// controls.update()

// 5. Render the scene
renderer.render(scene, camera);
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock: THREE.Clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime: number = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()