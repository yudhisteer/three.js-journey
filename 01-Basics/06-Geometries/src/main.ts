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

// Object
const width: number = 1 // width of the box
const height: number = 1 // height of the box
const depth: number = 1 // depth of the box
const widthSegments: number = 2 // subdivisions on the width
const heightSegments: number = 2 // subdivisions on the height
const depthSegments: number = 2 // subdivisions on the depth
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(
    width, 
    height, 
    depth, 
    widthSegments, 
    heightSegments, 
    depthSegments
)

// Custom geometry
// Instantiate a new BufferGeometry
const customGeometry: THREE.BufferGeometry = new THREE.BufferGeometry()

// Create a new Float32Array with the positions of the vertices
const positionsArray: Float32Array = new Float32Array([
    0, 0, 0, // First vertex in x, y, z
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
])

// Create a new BufferAttribute with the positions
const itemSize: number = 3 // 3 values per vertex (x, y, z)
const positionsAttribute: THREE.BufferAttribute = new THREE.BufferAttribute(positionsArray, itemSize)

// Set the attribute to the geometry
customGeometry.setAttribute('position', positionsAttribute)



// Material
const color: number = 0xff0000
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh: THREE.Mesh = new THREE.Mesh(customGeometry, material)
scene.add(mesh)

// Sizes
const sizes: { width: number, height: number } = {
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

// Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls: OrbitControls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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