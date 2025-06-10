In Three.js, geometries are composed of `vertices` (point coordinates in 3D spaces) and `faces` (triangles that join those vertices to create a surface).

We use geometries to create `meshes`, but you can also use geometries to form `particles`. Each vertex (singular of vertices) will correspond to a particle, but this is for a future lesson.

We can store more data than the position in the vertices. A good example would be to talk about the `UV coordinates` or the `normals`.

## Creating a geometry

All the built-in geometries we are going to see inherit from the `BufferGeometry` class. If we need a particular geometry that is not supported by Three.js, we can create your own geometry in JavaScript, or we can make it in a 3D software, export it and import it into your project.

Subdivisions correspond to how much triangles should compose the face. By default it's `1`, meaning that there will only be `2` triangles per face. If we set the subdivision to `2`, we'll end up with `8` triangles per face.

```ts
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
```

In order to see those triangles, we can modify the material to use a `wireframe` material.

```ts
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
```


![Box Geometry](assets/Screenshot%202025-06-10%20123406.png)

![Box Geometry with subdivisions](assets/Screenshot%202025-06-10%20123445.png)


## Create custom geometry

Sometimes, we need to create our own geometries. If the geometry isn't too complex, we can build it ourself by using `BufferGeometry`.

Note that before we can send that array to the `BufferGeometry`, we have to transform it into a `BufferAttribute`.

```ts
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
```

![Custom Geometry](assets/Screenshot%202025-06-10%20124234.png)


