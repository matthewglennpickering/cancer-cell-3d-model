
# 3D Cancer Cell Model using Three.js

This project demonstrates how to create a 3D model of cancer cells using the Three.js library. The model includes multiple cancer cells, each with a nucleus, arranged in a Body-Centered Cubic (BCC) lattice structure. The scene also features dynamic camera movement, providing a rotating view around the molecular structure.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Code Structure](#code-structure)
- [Detailed Explanation of the 3D Model](#detailed-explanation-of-the-3d-model)
- [Customization](#customization)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Project Overview

This project uses Three.js, a popular JavaScript library for creating 3D graphics in web browsers. The 3D scene consists of:
- Cancer cells modeled as spheres with a central nucleus.
- A Body-Centered Cubic (BCC) lattice arrangement for the cells.
- Rotating camera movement around the structure to provide a dynamic view.

## Features

- **3D Cancer Cell Model**: Represents cancer cells with a nucleus using sphere geometries.
- **BCC Lattice Arrangement**: Cells are positioned in a body-centered cubic lattice structure.
- **Rotating Camera**: The camera orbits around the scene to offer an engaging view.
- **Dynamic Lighting**: Includes point and ambient lighting for realistic effects.
- **Responsive Design**: The canvas resizes automatically when the browser window size changes.

## Technologies Used

- [Three.js](https://threejs.org/) - JavaScript library for 3D graphics.
- HTML5 and JavaScript for web development.

## Setup Instructions

1. **Clone the Repository**: Clone the project repository to your local machine.
   ```bash
   git clone https://github.com/your-username/3d-cancer-cell-model.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd 3d-cancer-cell-model
   ```
3. **Open the Project in a Code Editor**: Open the project directory in your preferred code editor (e.g., VSCode).
4. **Run a Local Web Server**: Use a local web server to serve the files. You can use the Live Server extension in VSCode or a simple Python HTTP server:
   ```bash
   python -m http.server
   ```
5. **Open in Browser**: Open your web browser and navigate to `http://localhost:8000` to view the 3D cancer cell model.

## Code Structure

- **index.html**: The main HTML file that includes the Three.js library and links to the `app.js` script.
- **app.js**: The JavaScript file that contains the Three.js code to create the 3D scene, model the cancer cells, arrange them in a lattice, and handle camera movement.
- **textures/**: (Optional) Directory for storing textures if you plan to use textured materials.

## Detailed Explanation of the 3D Model

### Cancer Cell Model

The 3D cancer cell model is created using Three.js with the following key components:

- **Cell Membrane**: Each cancer cell is represented by a `THREE.SphereGeometry` with a radius of 1 unit. The geometry is modified by adding random noise to its vertices to create an irregular, more organic look that mimics the shape of real cancer cells. The cell membrane is given a red color (`0xff5555`) with slight metallic and roughness properties to simulate a biological texture.
  
- **Nucleus**: The nucleus of each cancer cell is another smaller `THREE.SphereGeometry` with a radius of 0.5 units, positioned at the center of the cell membrane. The nucleus is distinguished with a different color (blue, `0x336699`) to visually separate it from the cell membrane. The nucleus is added as a child object to the cell membrane, ensuring it moves and rotates together with the outer cell.

### Molecular Structure: Body-Centered Cubic (BCC) Lattice

The cancer cells are arranged in a Body-Centered Cubic (BCC) lattice structure, a common crystal structure found in materials science and biology. The BCC lattice has the following characteristics:

- **Corner Cells**: Cells are positioned at each corner of a cube. For a 3D grid of cubes, this means cells are positioned at coordinates where `x, y, z` are all even or all odd multiples of the spacing distance.
  
- **Center Cells**: Additional cells are placed at the center of each cube, achieved by placing cells at coordinates that are offset by half the spacing distance from the corner cells. This ensures that every cubic unit has one cell in the center, creating a dense, interlocking lattice.

- **Parameters for Lattice**:
  - The `size` parameter defines the dimensions of the lattice (e.g., 4 means 4x4x4 cubes).
  - The `spacing` parameter controls the distance between adjacent cells, affecting the overall size and density of the lattice.

### Dynamic Camera Movement

The camera is set to rotate around the 3D molecular structure, offering an engaging, dynamic view. This is achieved by incrementing the camera's position in a circular path using trigonometric functions (`Math.cos` and `Math.sin`). The camera always looks toward the center of the scene, ensuring the structure stays in focus.

## Customization

### Adjust the Number of Cancer Cells

You can modify the number of cancer cells in the `createBCCLattice` function by changing the `size` parameter:
```javascript
const bccCells = createBCCLattice(4, 3); // Size of the lattice is 4, spacing between cells is 3 units
```

### Change Camera Behavior

To adjust the camera's rotation speed or distance, modify the `angle` increment or `radius` value in the `animate` function:
```javascript
angle += 0.01; // Adjust the speed of rotation
const radius = 20; // Adjust the distance from the center
```

### Add Interactivity

Consider using the `OrbitControls` from Three.js to allow users to manually rotate, zoom, and pan the camera:
```javascript
const controls = new THREE.OrbitControls(camera, renderer.domElement);
```

## Future Enhancements

- **Interactive Controls**: Add user controls to rotate, zoom, and pan the camera manually.
- **Advanced Textures and Shaders**: Use more complex materials and shaders for realistic effects.
- **Additional Cell Structures**: Include more cell components like mitochondria, ribosomes, etc.
- **Performance Optimization**: Implement instancing for improved performance with many cells.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as per the terms of the license.
# cancer-cell-3d-model
