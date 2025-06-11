"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
// 1. Create a scene
var scene = new THREE.Scene();
// 2. Create objects
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // Add the mesh to the scene
// 3. Create a camera
var fov = 75;
var aspectRatio = window.innerWidth / window.innerHeight;
var near = 0.1;
var far = 100;
var camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.z = 5;
scene.add(camera); // Add the camera to the scene
// 4. Create a renderer
var canvas = document.querySelector("canvas.webgl");
if (!canvas) {
    throw new Error("Canvas element not found");
}
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// 5. Render the scene
renderer.render(scene, camera);
