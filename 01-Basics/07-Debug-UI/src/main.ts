import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'


/**
 * Base
 */
// Canvas
const canvas: HTMLCanvasElement | null = document.querySelector('canvas.webgl')
if (!canvas) {
    throw new Error('Canvas not found')
}

// Empty object for GUI
const debugObject: Record<string, any> = {} // can have any string keys with values of any type
debugObject.color = '#ff0000' // Default color

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



/**
 * Debug
 */
const gui: GUI = new GUI({
    width: 340,
    title: 'Debug',
    closeFolders: true,
})

// Hide GUI
window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'h')
            gui.show(gui._hidden)
    })


// Range
gui
.add(mesh.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('elevation') // Name of the property in the UI

// Checkbox
gui.add(material, 'wireframe')

// Colors
gui
.addColor(debugObject, 'color')
.onChange(() =>
    {
        material.color.set(debugObject.color)
    })


// Button
debugObject.spin = () =>
    {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
    
gui.add(debugObject, 'spin')

// Add Folder
const folder: GUI = gui.addFolder('Complex Features')



// Geometry Change
debugObject.subdivision = 2
folder  // Add folder to the GUI
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() =>
    {
        mesh.geometry.dispose() // Free up memory
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()