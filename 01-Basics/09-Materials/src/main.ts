import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// To load the environment map
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


/**
 * Base
 */
// Canvas
const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl') as HTMLCanvasElement

if (!canvas)
{
    throw new Error('Canvas not found')
}


/**
 * Debug
 */
const gui: GUI = new GUI()

// Scene
const scene: THREE.Scene = new THREE.Scene()


/**
 * Lights
 */

// Ambient light
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)


// Point light
const pointLight: THREE.PointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(2, 3, 4)
// scene.add(pointLight)





/**
 * Textures
 */
const textureLoader: THREE.TextureLoader = new THREE.TextureLoader()

const doorColorTexture: THREE.Texture = textureLoader.load('./textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture: THREE.Texture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture: THREE.Texture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture: THREE.Texture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture: THREE.Texture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture: THREE.Texture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture: THREE.Texture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture: THREE.Texture = textureLoader.load('./textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture: THREE.Texture = textureLoader.load('./textures/gradients/3.jpg')

/**
 * Environment map
 */
const rgbeLoader: RGBELoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
    {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping
    
        scene.background = environmentMap
        scene.environment = environmentMap
    })





/**
 * Materials
 */
// MeshBasicMaterial
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial()
//const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: doorColorTexture }  )
// Equivalent
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial()


// MeshNormalMaterial
// const material: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial()


// MeshMatcapMaterial
// const material: THREE.MeshMatcapMaterial = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MeshDepthMaterial
// const material: THREE.MeshDepthMaterial = new THREE.MeshDepthMaterial()


// MeshLambertMaterial
// const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial()


// MeshPhongMaterial
// const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial()


// MeshToonMaterial
// const material: THREE.MeshToonMaterial = new THREE.MeshToonMaterial()


// MeshStandardMaterial
// const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial()


// MeshPhysicalMaterial
const material: THREE.MeshPhysicalMaterial = new THREE.MeshPhysicalMaterial()


/**
 * Transformations of the material
 */
// Combining the texture with the color
// material.map = doorColorTexture
// material.color = new THREE.Color('#ffffff')

// Transparent
// material.transparent = true
// material.opacity = 0.5

// Alpha map
// material.alphaMap = doorAlphaTexture


// Side
// material.side = THREE.DoubleSide // THREE.BackSide // THREE.FrontSide 

// Flat shading
// material.flatShading = true

// Only for MeshPhongMaterial AND MeshStandardMaterial
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)


// Gradient map
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture


// Metalness and roughness FOR MeshStandardMaterial
material.metalness = 1
material.roughness = 1
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)


// Tweaks for Environment map
// material.map = doorColorTexture

// Ambient occlusion map
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1

// Displacement map
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1

// Metalness and roughness Map
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture

// Normal map
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)


// Transparent
material.transparent = true
material.alphaMap = doorAlphaTexture


// Clearcoat
material.clearcoat = 1
material.clearcoatRoughness = 0

gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)



// Sheen
material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)

gui.add(material, 'sheen').min(0).max(1).step(0.0001)
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
gui.addColor(material, 'sheenColor')


// Iridescence
material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [ 100, 800 ]

gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)



// Transmission
material.metalness = 0
material.roughness = 0
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)



/**
 * Objects
 */
// MeshBasicMaterial

const sphere: THREE.Mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5

const plane: THREE.Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus: THREE.Mesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)














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
const clock: THREE.Clock = new THREE.Clock()


const tick: () => void = () =>
{
    const elapsedTime: number = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()