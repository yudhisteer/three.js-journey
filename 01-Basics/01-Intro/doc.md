## Intro
`Node.js` enables running JavaScript on our computer outside of a browser. 
When we installed `Node.js`, we automatically installed `NPM`. `NPM` stands for `Node Package Manager` and is a dependency manager that will fetch the packages we need such as `Three.js`, `Vite`, etc.

## Creating a Node.js project
1. Run `npm init -y` to create a `package.json` file
2. Install Vite with `npm install vite`
3. Create a `index.html` file
4. Modify `package.json` to include the following scripts:
```json
"scripts": {
    "dev": "vite",
    "build": "vite build"
}
```
5. Run `npm run dev` to start the development server

## Creating a Three.js project
1. Install Three.js with `npm install three`
2. Create a `index.html` file and add the following content in the body tag:
   This is because we are using the `type="module"` attribute in the `script.js` file.
   The `canvas` tag is used to create a canvas element.
```html
<body>
    <h1>Hello World</h1>
    <canvas class="webgl"></canvas>
    <script type="module" src="script.js"></script>
</body>
```
3. Create a `script.js` file and add your code in it.
4. Run `npm run dev` to start the development server


## Creating the first Three.js scene

To create a basic `Three.js` scene, you need 4 essential elements:
1. Scene
2. Objects
3. Camera
4. Renderer

### 1. Scene
The scene is like a container that holds all your objects, cameras, and lights.
```javascript
const scene = new THREE.Scene();
```

### 2. Objects
Objects are made up of geometry (the shape) and material (how it looks):
```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1); // Creates a 1x1x1 cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
const mesh = new THREE.Mesh(geometry, material); // Combines geometry and material
scene.add(mesh); // Add the mesh to the scene
```

### 3. Camera
The camera defines the viewpoint from which the scene is rendered. The camera is not visible. We can have multiple cameras just like on a movie set, and we can switch between those cameras.

The `field of view` is how large our vision angle is. If we use a very large angle, we'll be able to see in every direction at once but with much distortion, because the result will be drawn on a small rectangle. If we use a small angle, things will look zoomed in. The field of view (or `fov`) is expressed in degrees and corresponds to the vertical vision angle. For this exercise we will use a `75` degrees angle.

```javascript
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
// Parameters: field of view (75°), aspect ratio, near clipping plane, far clipping plane
camera.position.z = 5; // Move camera back to see the object
scene.add(camera); // Add camera to the scene
```

### 4. Renderer
The renderer draws the scene using WebGL:.
We ask the renderer to render our scene from the camera's point of view, and the result will be drawn into a canvas.

The `WebGLRenderer` is the renderer that will be used to render the scene.

The `canvas` is the element that will be used to display the scene.

```javascript
const canvas = document.querySelector('canvas.webgl'); // Get the canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); // Create renderer
renderer.setSize(window.innerWidth, window.innerHeight); // Set render size
```

### 5. Render
Finally, render the scene with the camera:
```javascript
renderer.render(scene, camera);
```

This creates a simple green cube that you can see in your browser when you run `npm run dev`.

![Green Cube in Three.js](assets/Screenshot%202025-05-29%20222930.png)

## For TypeScript
1. Install `@types/three` with `npm install @types/three` for type checking.
2. Create a `tsconfig.json` file and add the following content:
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
```
3. Create a `main.ts` file and add your code in it.
4. Update the `index.html` file to include the file in `main.ts` instead of `script.js` in src:
```html
<script type="module" src="./main.ts"></script>
```
5. Run `npm run dev` to start the development server.


## Linting
1. Install biome: `npm install --save-dev @biomejs/biome`
2. check a file with biome: `npx biome check src/main.ts`
3. Fix the errors: `npx biome check --write src/main.ts`
