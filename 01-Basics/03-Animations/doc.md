Animations, when using `Three.js`, work like stop motion. You move the objects, and you do a render. Then you move the objects a little more, and you do another render.

## Using requestAnimationFrame
`requestAnimationFrame` will execute the function you provide on the next frame. 
The code below demonstrates a basic animation loop in Three.js:
The tick() function is a recursive animation loop that:
- Updates the mesh's rotation by `0.01` radians on each frame
- Renders the scene with the updated mesh
- Schedules itself to run again on the next frame using requestAnimationFrame
- The initial `tick()` call starts the animation loop
This creates a continuous rotation animation of the mesh, where each frame shows the mesh rotated slightly more than the previous frame. The `requestAnimationFrame` ensures smooth animation by synchronizing with the browser's refresh rate.


```ts

function tick()
{
    // Update objects
    mesh.rotation.y += 0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

The problem with this approach is that the animation will be faster on a machine with a higher frame rate. The goal is to execute a function that will move objects and do the render on each frame regardless of the frame rate.

## Adapting the animation to the frame rate

We can use the `deltaTime` to adapt the animation to the frame rate.

This code implements a frame-rate independent animation loop in Three.js. 
- `time = Date.now()` - Stores the initial timestamp
Inside tick():
- `currentTime = Date.now()` - Gets current timestamp
- `deltaTime = currentTime - time` - Calculates milliseconds since last frame
- `time = currentTime` - Updates timestamp for next frame
- `mesh.rotation.y += deltaTime * 0.01` - Rotates mesh proportionally to time elapsed
- Renders scene and schedules next frame
The key improvement over the previous version is using deltaTime to scale the rotation. This ensures the animation speed remains consistent regardless of frame rate, as the rotation amount is now based on actual time passed rather than fixed per-frame increments.

```ts
let time = Date.now()

function tick()
{
    // Time
    const currentTime: number = Date.now();
    const deltaTime: number = currentTime - time;
    time = currentTime;

    // Update objects
    mesh.rotation.y += deltaTime * 0.01;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

## Using Clock

The `Clock` class is a built-in class in Three.js that provides a way to measure time in a consistent manner. It's particularly useful for animations and simulations where you need to track elapsed time accurately.

The `Clock` class provides  a `getElapsedTime()` method that returns the time elapsed since the clock was created or reset.


```ts

const clock = new Clock()

function tick()
{
    // Time
    const elapsedTime: number = clock.getElapsedTime();
    console.log(elapsedTime);

    // Update objects
    mesh.rotation.y = elapsedTime * Math.PI * 2;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

## Using GSAP

GSAP is a library that provides a way to animate objects in a more intuitive and powerful way than the built-in animation methods.

Install GSAP: `npm install --save gsap`

The code below demonstrates how to use GSAP to animate the mesh's position.


```ts
// Import GSAP
const gsap = require('gsap')

gsap.to(mesh.position, {
  x: 2,
  duration: 1,
  delay: 1,
  ease: "power2.inOut",
});



![GSAP Animation](assets/Screenshot%202025-05-30%20195835.png)
