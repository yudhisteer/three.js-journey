## Intro
There are 4 properties to transform objects in our scene

- position (to move the object)
- scale (to resize the object)
- rotation (to rotate the object)
- quaternion (to also rotate the object)

All classes that inherit from the Object3D class possess those properties like PerspectiveCamera or Mesh, ...

## Position
The position possesses 3 essential properties, which are `x, y, and z`.

In Three.js, we usually consider that the y axis is going upward, the z axis is going backward, and the x axis is going to the right. The position property is an instance of the `Vector3` class.

We can change the position of an object by changing the x, y and z values of the position property.

```ts
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 0.6
```

We can also use the `set(...)` method to change the values of the position property:

You can get the length of a vector:
```ts
console.log(mesh.position.length())
```
You can get the distance from another Vector3 (make sure to use this code after creating the camera):
```ts
console.log(mesh.position.distanceTo(camera.position))
```
You can normalize its values (meaning that you will reduce the length of the vector to 1 unit but preserve its direction):
```ts
console.log(mesh.position.normalize())
```
To change the values, instead of changing x, y and z separately, you can also use the set(...) method:
```ts
mesh.position.set(0.7, -0.6, 0.6)
```

## Scale
The scale property is also an instance of the `Vector3` class.

We can scale the object by changing the x, y and z values of the scale property.

```ts
mesh.scale.x = 2
mesh.scale.y = 0.5
mesh.scale.z = 0.5
```

We can also use the `set(...)` method to change the values of the scale property:
```ts
mesh.scale.set(2, 0.5, 0.5)
```

Avoid using negative values for the scale property.


## Rotation
The rotation property is an instance of the `Euler` class.

We can rotate the object by changing the x, y and z values of the rotation property. The value of these axes is expressed in radians.

```ts
mesh.rotation.x = Math.PI / 4
mesh.rotation.y = Math.PI / 4
mesh.rotation.z = Math.PI / 4
```

We can also use the `set(...)` method to change the values of the rotation property:  
```ts
mesh.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4)
```

The order of the rotation is important. The default order is `XYZ`.

We can change the order of the rotation by using the `reorder(...)` method:
```ts
mesh.rotation.reorder("YXZ")
```



## Other Useful Methods


### AxesHelper

The `AxesHelper` will display 3 axes corresponding to the `x, y and z` axes, each one starting at the center of the scene and going in the corresponding direction.

To create the `AxesHelper`, instantiate it and add it to the scene right after instantiating that scene. You can specify the length of the lines as the only parameter. We are going to use 2:
```ts
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```

### LookAt

The `lookAt(...)` method is used to make an object look at a specific position.

```ts
mesh.lookAt(new THREE.Vector3(0, 0, 0))
```

If we want the camera to look at the mesh, we can use the `lookAt(...)` method:
```ts
camera.lookAt(mesh.position)
```


### Group

The `Group` class is used to group multiple objects together. It inherits from the `Object3D` class. Therefore, it has all the properties and methods of the `Object3D` class.

```ts
const group: THREE.Group = new THREE.Group()
group.add(mesh)
scene.add(group)
```

We can position, rotate and scale the group as a whole.

```ts
group.position.x = 1
group.rotation.y = Math.PI / 4
group.scale.z = 2
```




![Transform Example](assets/Screenshot%202025-05-30%20142910.png)


## Linting
1. Install biome: `npm install --save-dev @biomets/biome`
2. check a file with biome: `npx biome check src/main.ts`
3. Fix the errors: `npx biome check --write src/main.ts`
