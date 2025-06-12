import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas: HTMLElement | null = document.querySelector('canvas.webgl')

if (!canvas)
{
    console.error('No canvas found')
    throw new Error('No canvas found')
}

/**
 * Loading Textures
 */

// Option 1: Using the Image API
// Create a new HTMLImageElement instance (not yet in the DOM)
const image: HTMLImageElement = new Image()

// Create a new THREE.Texture instance
const texture: THREE.Texture = new THREE.Texture(image)

// Set the color space to sRGB to ensure correct color representation
texture.colorSpace = THREE.SRGBColorSpace

// Set the texture's image source
// Set the source URL of the image, which starts loading it
image.src = '/textures/door/color.jpg'

// Set a function to run when the image has finished loading
image.onload = () =>
    {
        // This will log to the console once the image is fully loaded by the browser
        console.log('Image loaded successfully!')
    }


// When the image finishes loading, set the texture's needsUpdate flag to true.
// This tells Three.js to upload the new image data to the GPU so the texture is updated.
image.addEventListener('load', () => {
    texture.needsUpdate = true
})





// Option 2: Using the TextureLoader
// Create a new LoadingManager instance
const loadingManager: THREE.LoadingManager = new THREE.LoadingManager()

// Set up event listeners for the loading manager
loadingManager.onStart = () =>
{
    console.log('Loading started!')
}
loadingManager.onProgress = () =>
    {
        console.log('Loading progressing...')
    }
loadingManager.onLoad = () =>
{
    console.log('Loading finished!')
}
loadingManager.onError = () =>
{
    console.log('Loading error!!!')
}

// Create a new TextureLoader instance and pass the loadingManager to it
const textureLoader: THREE.TextureLoader = new THREE.TextureLoader(loadingManager)

// Load the texture using the TextureLoader
const colorTexture: THREE.Texture = textureLoader.load('/textures/checkerboard-8x8.png')
colorTexture.colorSpace = THREE.SRGBColorSpace // Set the color space to sRGB to ensure correct color representation

// Load other textures
const alphaTexture: THREE.Texture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture: THREE.Texture = textureLoader.load('/textures/door/height.jpg')
const normalTexture: THREE.Texture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture: THREE.Texture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture: THREE.Texture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture: THREE.Texture = textureLoader.load('/textures/door/roughness.jpg')



/**
 * Transform the texture
 */

// Repeat the texture
// Set how many times the texture repeats horizontally (x) and vertically (y)
colorTexture.repeat.x = 2 // Repeat the texture 2 times along the X axis
colorTexture.repeat.y = 3 // Repeat the texture 3 times along the Y axis
// Set the wrapping mode for the horizontal (S) and vertical (T) axes
colorTexture.wrapS = THREE.RepeatWrapping // Repeat wrapping on the X axis (horizontal)
colorTexture.wrapT = THREE.MirroredRepeatWrapping // Mirrored repeat wrapping on the Y axis (vertical)

// Offset the texture
colorTexture.offset.x = 0.5 // Offset the texture 0.5 units along the X axis
colorTexture.offset.y = 0.5 // Offset the texture 0.5 units along the Y axis

// Rotate the texture
colorTexture.rotation = Math.PI * 0.25 // Rotate the texture by 45 degrees
colorTexture.center.x = 0.5 // Center the texture at the X axis
colorTexture.center.y = 0.5 // Center the texture at the Y axis

// Mipmapping 
colorTexture.generateMipmaps = false // Disable mipmapping for the texture

// 1. Minification Filter
colorTexture.minFilter = THREE.NearestFilter


// 2. Magnification Filter
colorTexture.magFilter = THREE.NearestFilter





// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// Use 'map' property to assign the texture to the material
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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