

## Perspective Camera
The perspective camera simulates a real-life camera with perspective.

The parameters are:
- fov: Field of view, in degrees.
- aspectRatio: The aspect ratio of the camera.
- near: The near clipping plane.
- far: The far clipping plane.

### FOV:
corresponds to your camera view's vertical amplitude angle in degrees. If we use a small angle, we'll end up with a long scope effect, and if we use a wide-angle, we'll end up with a fish eye effect because, in the end, what the camera sees will be stretched or squeezed to fit the canvas. We normally choose a FOV between `45` and `75` degrees.

### Aspect Ratio:
The aspect ratio is the ratio of the width of the canvas to the height of the canvas.

### Near and Far:
The near and far parameters are used to define the clipping planes. The near plane is the plane that is closest to the camera, and the far plane is the plane that is farthest from the camera.

We choose a near plane of `0.1` and a far plane of `100`. If we choose very small or very large values, we might end up with a bug called `z-fighting` where two faces seem to fight for which one will be rendered above the other. `z-fighting` is a bug that occurs when two faces are very close to each other and the depth buffer is not able to distinguish between them.

```ts
const fov: number = 75;
const aspectRatio: number = window.innerWidth / window.innerHeight;
const near: number = 0.1;
const far: number = 100;
const perspectiveCamera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio,
  near,
  far,
);
```

## Orthographic Camera
In orthographic projection, objects will have the same size regardless of their distance from the camera.

Instead of a field of view, we must provide how far the camera can see in each direction (left, right, top and bottom).

However, there is no perspective, and the sides of our cube seem parallel. The problem is that our cube doesn't look cubic. That is due to the values we provided for the left, right, top, and bottom which are `1` or `-1`, meaning that we render a square area, but that square area will be stretched to fit our rectangle canvas and our canvas isn't a square.

To fix this, we need to multiply the left and right parameters by the aspect ratio of the camera.




```ts
const left: number = -1;
const right: number = 1;
const top: number = 1;
const bottom: number = -1;
const orthographicNear: number = 0.1;
const orthographicFar: number = 100;
const aspectRatio: number = window.innerWidth / window.innerHeight;
const orthographicCamera: THREE.OrthographicCamera = new THREE.OrthographicCamera(
  left * aspectRatio,
  right * aspectRatio,
  top,
  bottom,
  orthographicNear,
  orthographicFar,
);
```

## Custom Controls
If we want to control the camera with the mouse, we can use the following code. We listen to the mousemove event with `addEventListener` and we get the clientX and clientY of the event.

We then calculate the cursor position by dividing the clientX and clientY by the width and height of the canvas and subtracting `0.5` to get a value between `-0.5` and `0.5`.

We then update the camera position by multiplying the cursor position by `5` and `3` for the x and y axes respectively to increase the `amplitude` of the movement.

We also look at the mesh position to keep the camera looking at the mesh.

If we want to do a full rotation, we can use the `Math.PI * 2` with `Math.sin()` and `Math.cos()`.

```ts
const cursor: { x: number, y: number } = {
  x: 0,
  y: 0
}

const sizes: { width: number, height: number } = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Mouse move
window.addEventListener('mousemove', (event) =>
{
  cursor.x = event.clientX / sizes.width - 0.5 // -0.5 to 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5) // -0.5 to 0.5

  console.log(cursor.x, cursor.y)

  // Update the camera
  // camera.position.x = cursor.x * 5
  // camera.position.y = cursor.y * 5
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  camera.position.y = cursor.y * 3
  camera.lookAt(mesh.position)
})
```

### Orbit Controls
We first import the `OrbitControls` class from:
```ts
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
```

We then create a new instance of the `OrbitControls` class and pass the camera and the canvas to the constructor.

We can also enable damping to make the camera movement smoother.


```ts
const controls: OrbitControls = new OrbitControls(camera, canvas)
controls.target.y = 2 
controls.enableDamping = true
```

In order to work properly, the controls also needs to be updated on each frame by calling `controls.update()` in the `tick` function.

```ts
const tick = () =>
{
    ...

    // Update controls
    controls.update()

    ...
}

tick()
```