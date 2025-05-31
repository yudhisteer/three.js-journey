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

// a. change the position of the mesh
mesh.position.y = 1;
mesh.position.x = -0.6;
mesh.position.z = 0.6;
mesh.position.set(0.7, -0.6, 0.6); // Set the position to a specific value at the same time

mesh.position.normalize(); // Normalize the position to 1. unit vector

// b. change the rotation of the mesh
mesh.rotation.reorder("YXZ"); // we rotate the mesh around the Y axis first, then the X axis, and then the Z axis
mesh.rotation.y = Math.PI / 4;
mesh.rotation.x = Math.PI / 4;
mesh.rotation.z = Math.PI / 4;
mesh.rotation.set(0, Math.PI / 4, 0); // Set the rotation to a specific value at the same time

// c. Change the scale of the mesh
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5); // Set the scale to a specific value at the same time

// d.Add axes helper
const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// e. Add group
const group: THREE.Group = new THREE.Group();

// create the cubes
const cube1: THREE.Mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
);
cube1.position.x = -2;
const cube2: THREE.Mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);
cube2.position.x = 2;
const cube3: THREE.Mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
cube3.position.x = 0;

// add the cubes to the group
group.add(cube1);
group.add(cube2);
group.add(cube3);

// move the group
group.position.y = 1;

scene.add(group); // add the group to the scene

// 3. Create a camera
const size = {
  width: 800,
  height: 600,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);
camera.position.z = 5;
scene.add(camera); // Add the camera to the scene

// f. make the camera look at the mesh
camera.lookAt(mesh.position);

// 4. Create a renderer
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);

// 5. Render the scene
renderer.render(scene, camera);
