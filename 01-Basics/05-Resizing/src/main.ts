import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("Canvas element not found");
}

// Scene
const scene: THREE.Scene = new THREE.Scene()

/**
 * Object
 */
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
// Fixed sizes
// const sizes = {
//     width: 800,
//     height: 600
// }

// Responsive sizes
const sizes: { width: number, height: number } = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Resize canvas
window.addEventListener("resize", () => {
    if (!canvas) return;
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

// Fullscreen
window.addEventListener('dblclick', () =>
{
    const fullscreenElement: Document | null = document.fullscreenElement || (document as any).webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if((canvas as any).webkitRequestFullscreen)
        {
            (canvas as any).webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if((document as any).webkitExitFullscreen)
        {
            (document as any).webkitExitFullscreen()
        }
    }
})


/**
 * Camera
 */
// Base camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls: OrbitControls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
const clock: THREE.Clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime: number = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()