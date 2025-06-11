We will use `lil-gui` to create a debug UI for our project. Start by installing the package: `npm install lil-gui`

Import the package in your `main.ts` file:

```ts
import GUI from 'lil-gui'
```

Create a new GUI instance:

```ts
const gui: GUI = new GUI({
    width: 340, // Width of the GUI
    title: 'Debug', // Title of the GUI
    closeFolders: true, // Close folders by default
})
```

## Range
To add a property which has range we can use the `add` method with min, max and step.


```ts
// Range
gui
.add(mesh.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('elevation') // Name of the property in the UI
```

## Checkbox
Similary, we can add a checkbox to the GUI.

```ts
// Checkbox
gui.add(material, 'wireframe')
```

## Colors
We can also add a color picker to the GUI. We can use the `addColor` method to add a color picker to the GUI. Note that `Three.js` applies some color management in order to optimise the rendering. As a result, the color value that is being displayed in the tweak isn’t the same value as the one being used internally.

We first create an empty object for the GUI. Then, we are going to add a color property to debugObject and we are going to do it before creating the cube so that we can immediately send it to the color property of the `MeshBasicMaterial`.

```ts
// Empty object for GUI
const debugObject: Record<string, any> = {} // can have any string keys with values of any type
debugObject.color = '#ff0000' // Default color
```

We use the `set()` method to set the color of the material.

```ts
gui
.addColor(debugObject, 'color')
.onChange(() =>
    {
        material.color.set(debugObject.color)
    })
```

## Button
We can also add a button to the GUI. We first create a `spin` property that will be called when the button is clicked. Then, we add the property to the GUI.

```ts
// Button
debugObject.spin = () =>
    {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }

gui.add(debugObject, 'spin')
```

## Folders
We create folders to group related properties together. Now instead of doing `gui.add...` we do `folder.add...`.

```ts
// Add Folder
const folder: GUI = gui.addFolder('Complex Features')
```

## Geometry Change
We can also add a property to the GUI that will change the geometry of the mesh.

We need to add a subdivision property to the debugObject object and apply our tweak to it.

Instead of using `onChange`, we are going to use `onFinishChange`, which will only be triggered when we stop tweaking the value.

We can build a new geometry using `debugObject.subdivision` and associate it with the mesh by assigning it to its geometry property.

In order to free up memory, we need to dispose of the old geometry. We can do this by calling the `dispose()` method on the geometry.

```ts
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
```

## Hide GUI
We can hide the GUI by adding a keyboard shortcut. By pressing `h` we can show/hide the GUI.

```ts
// Hide GUI
window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'h')
            gui.show(gui._hidden)
    })
```