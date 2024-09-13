// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother visuals
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting Setup
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Point light to illuminate the scene
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light for general illumination
scene.add(ambientLight);

// Set Initial Camera Position
let angle = 0;
const radius = 20; // Radius of the circular path for the camera
camera.position.set(radius, 0, 0);
camera.lookAt(scene.position); // Make the camera look at the center of the scene

// Function to Create a Cancer Cell with Nucleus
function createCancerCell() {
    // Cancer Cell Geometry and Material
    const cellGeometry = new THREE.SphereGeometry(1, 32, 32);
    const cellMaterial = new THREE.MeshStandardMaterial({ color: 0xff5555, roughness: 0.8, metalness: 0.1 });
    const cancerCell = new THREE.Mesh(cellGeometry, cellMaterial);

    // Add Noise to Cancer Cell Surface for a More Organic Look
    cellGeometry.attributes.position.array.forEach((_, index) => {
        cellGeometry.attributes.position.array[index] += (Math.random() - 0.5) * 0.1; // Adds random noise to each vertex
    });
    cellGeometry.attributes.position.needsUpdate = true; // Update the geometry with the new vertex positions

    // Nucleus Geometry and Material
    const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Smaller sphere for the nucleus
    const nucleusMaterial = new THREE.MeshStandardMaterial({ color: 0x336699, roughness: 0.9, metalness: 0.1 }); // Different color for the nucleus
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus.position.set(0, 0, 0); // Position nucleus at the center of the cancer cell
    cancerCell.add(nucleus); // Add the nucleus to the cancer cell as a child

    return cancerCell;
}

// Function to Position Cells in a Body-Centered Cubic (BCC) Lattice
function createBCCLattice(size, spacing) {
    const cells = [];
    const halfSize = size / 2;

    for (let x = -halfSize; x <= halfSize; x++) {
        for (let y = -halfSize; y <= halfSize; y++) {
            for (let z = -halfSize; z <= halfSize; z++) {
                // Corner atoms
                if (x % 2 === 0 && y % 2 === 0 && z % 2 === 0) {
                    const cell = createCancerCell();
                    cell.position.set(x * spacing, y * spacing, z * spacing);
                    scene.add(cell);
                    cells.push(cell);
                }

                // Center atom for each cube
                if ((x % 2 !== 0 || y % 2 !== 0 || z % 2 !== 0) && (x + y + z) % 2 === 0) {
                    const centerCell = createCancerCell();
                    centerCell.position.set((x + 0.5) * spacing, (y + 0.5) * spacing, (z + 0.5) * spacing);
                    scene.add(centerCell);
                    cells.push(centerCell);
                }
            }
        }
    }
    return cells;
}

// Create BCC Lattice of Cancer Cells
const bccCells = createBCCLattice(4, 3); // Size of the lattice is 4, and the spacing between cells is 3 units

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate Each Cancer Cell Independently
    bccCells.forEach((cell) => {
        cell.rotation.x += 0.01;
        cell.rotation.y += 0.01;
    });

    // Update Camera Position for Circular Motion
    angle += 0.01; // Adjust the speed of rotation by changing this value
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.lookAt(scene.position); // Keep the camera looking at the center of the scene

    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

