import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,                       // FOV (in degrees)
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, .3, .5)

const baseCameraPos = new THREE.Vector3(0, 0.4, 0.5); 
let targetOffset = new THREE.Vector3(0, 0, 0); 

window.addEventListener('mousemove', (event) => {
  const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2; 
  const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2; 

  const maxOffset = 0.05; // how far camera moves
  targetOffset.set(normalizedX * maxOffset, normalizedY * maxOffset, 0);
});

// Renderer
const renderer = new THREE.WebGLRenderer({ precision: "highp"});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
document.body.appendChild( renderer.domElement );

// Composer
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bokehPass = new BokehPass(scene, camera, {
  focus: 0.7,     // distance in world units
  aperture: 0.006, // blur strength
  maxblur: 0.1
});
composer.addPass(bokehPass);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.15, 0); 
controls.update();


// Lighting
const light = new THREE.DirectionalLight(0xfaefcf, 2.5);
light.position.set(15, 20, 15);
light.lookAt(0, 0, 0);

light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.normalBias = 0.02;

scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
scene.add(ambientLight);

// shadow debugger
// scene.add(new THREE.CameraHelper(light.shadow.camera));



// IMPORT 3D MODELS
// Define the loader
const loader = new GLTFLoader();

// Add teddy bear model
let teddy = null;
loader.load( 'models/teddy_bear.glb', function ( gltf ) {
  
  teddy = gltf.scene;
  teddy.scale.set(0.04, 0.04, 0.04); 
  teddy.position.set(0.05, -.01, 0); // (left right, up down, forward back)
  teddy.rotation.y = 0.25 * Math.PI; // Rotate 180 degrees to face forward

  teddy.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( teddy );

}, undefined, function ( error ) {
  console.error( error );
} );

let plant01 = null;
loader.load( 'models/plant01.glb', function ( gltf ) {

  plant01 = gltf.scene;
  plant01.scale.set(.2, .2, .2); 
  plant01.position.set(1.4, -.6, -.6); // (left right, up down, forward back)
  plant01.rotation.set(0, -0.5*Math.PI, 0);

  plant01.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( plant01 );

}, undefined, function ( error ) {
  console.error( error );
} );

let plant02 = null;
loader.load( 'models/plant02.glb', function ( gltf ) {

  plant02 = gltf.scene;
  plant02.scale.set(.18, .18, .18); 
  plant02.position.set(1.2, -.6, -1); // (left right, up down, forward back)
  plant02.rotation.set(0, -0.5*Math.PI, 0);

  plant02.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( plant02 );

}, undefined, function ( error ) {
  console.error( error );
} );

let curtain = null;
loader.load( 'models/curtain.glb', function ( gltf ) {
  
  curtain = gltf.scene;
  curtain.scale.set(.8, 1, .5); 
  curtain.position.set(.56, -.6, -2.6); // (left right, up down, forward back)
  curtain.rotation.set(0, 0.23*Math.PI, 0);

  curtain.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( curtain );

}, undefined, function ( error ) {
  console.error( error );
} );

let phone = null;
loader.load( 'models/telephone.glb', function ( gltf ) {
  
  phone = gltf.scene;
  phone.scale.set(.1, .1, .1); 
  phone.position.set(-.38, .2, -0.1); // (left right, up down, forward back)
  phone.rotation.set(0, 0.3*Math.PI, 0);

  phone.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( phone );

}, undefined, function ( error ) {
  console.error( error );
} );

let computer = null;
loader.load( 'models/computer.glb', function ( gltf ) {
  
  computer = gltf.scene;
  computer.scale.set(.25, .25, 0.15); 
  computer.position.set(0.3, 0, 0.07); // (left right, up down, forward back)
  computer.rotation.set(0, -0.05*Math.PI, 0);

  computer.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( computer );

}, undefined, function ( error ) {
  console.error( error );
} );

let papers = null;
loader.load( 'models/papers.glb', function ( gltf ) {

  papers = gltf.scene;
  papers.scale.set(.63, .63, .63); 
  papers.position.set(-0.15, 0, 0.15); // (left right, up down, forward back)
  papers.rotation.set(0, 0.6*Math.PI, 0);

  papers.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( papers );

}, undefined, function ( error ) {
  console.error( error );
} );

let books = null;
loader.load( 'models/books.glb', function ( gltf ) {

  books = gltf.scene;
  books.scale.set(.22, .22, .22); 
  books.position.set(-.15, 0.03, -0.1); // (left right, up down, forward back)
  books.rotation.set(0, 0*Math.PI, 0);

  books.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( books );

}, undefined, function ( error ) {
  console.error( error );
} );

let coffee = null;
loader.load( 'models/coffee.glb', function ( gltf ) {

  coffee = gltf.scene;
  coffee.scale.set(.04, .045, .04); 
  coffee.position.set(.5, 0.07, -0.02); // (left right, up down, forward back)
  coffee.rotation.set(0, 0*Math.PI, 0);

  coffee.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( coffee );

}, undefined, function ( error ) {
  console.error( error );
} );

let pencilholder = null;
loader.load( 'models/pencilholder.glb', function ( gltf ) {

  pencilholder = gltf.scene;
  pencilholder.scale.set(.01, .017, .01); 
  pencilholder.position.set(-0.45, -0.02, 0.07); // (left right, up down, forward back)
  pencilholder.rotation.set(0, 0*Math.PI, 0);

  pencilholder.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( pencilholder );

}, undefined, function ( error ) {
  console.error( error );
} );

let duck = null;
loader.load( 'models/duck.glb', function ( gltf ) {

  duck = gltf.scene;
  duck.scale.set(.2, .2, .2); 
  duck.position.set(0.35, 0.35, 0.05); // (left right, up down, forward back)
  duck.rotation.set(0, -0.65*Math.PI, 0);

  duck.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( duck );

}, undefined, function ( error ) {
  console.error( error );
} );

let duck2 = null;
loader.load( 'models/duck.glb', function ( gltf ) {

  duck2 = gltf.scene;
  duck2.scale.set(.2, .2, .2); 
  duck2.position.set(0.35, 0.36, 0); // (left right, up down, forward back)
  duck2.rotation.set(0.57*Math.PI, 0, 0.35*Math.PI);

  duck2.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( duck2 );

}, undefined, function ( error ) {
  console.error( error );
} );

let polaroid = null;
loader.load( 'models/camera.glb', function ( gltf ) {

  polaroid = gltf.scene;
  polaroid.scale.set(.08, .08, .08); 
  polaroid.position.set(-.13, 0.177, -0.03); // (left right, up down, forward back)
  polaroid.rotation.set(0, 0.09*Math.PI, 0);

  polaroid.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( polaroid );

}, undefined, function ( error ) {
  console.error( error );
} );

let pencil = null;
loader.load( 'models/pencil.glb', function ( gltf ) {

  pencil = gltf.scene;
  pencil.scale.set(.8, .8, .8); 
  pencil.position.set(-.33, 0.029, 0.2); // (left right, up down, forward back)
  pencil.rotation.set(0.62*Math.PI, 0, -0.6*Math.PI);

  pencil.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( pencil );

}, undefined, function ( error ) {
  console.error( error );
} );

let desk = null;
loader.load('models/desk.glb', (gltf) => {
  desk = gltf.scene;
  desk.scale.set(0.01, .007, .01);
  desk.rotation.set(0, 0, 0);

  const box = new THREE.Box3().setFromObject(desk);
  const topCenter = new THREE.Vector3(
    (box.min.x + box.max.x) / 2,
    box.max.y,
    (box.min.z + box.max.z) / 2
  );

  desk.position.sub(topCenter);

  desk.traverse((child) => {
    if (child.isMesh) {
      child.receiveShadow = true;
      child.castShadow = true;
    }
  });

  scene.add(desk);

}, undefined, function ( error ) {
  console.error( error );
} );

let room = null;
loader.load( 'models/room.glb', function ( gltf ) {
  
  room = gltf.scene;
  room.scale.set(.1, .1, .1); 
  room.position.set(0.14, -.28, -.1); // (left right, up down, forward back)
  room.rotation.set(0, 0.05*Math.PI, 0); 

  room.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add( room );

}, undefined, function ( error ) {
  console.error( error );
} );

let window_frame = null;
loader.load( 'models/window.glb', function ( gltf ) {
  
  window_frame = gltf.scene;
  window_frame.scale.set(2.5, 2, 1); 
  
  window_frame.position.set(-1, .6, 5); // (left right, up down, forward back)
  window_frame.rotation.set(0, 0.2*Math.PI, 0);

  window_frame.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  scene.add( window_frame );
}, undefined, function ( error ) {
  console.error( error );
} );


// PARTICLES
const particleCount = 250;
const geometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  // Random positions inside a rectangular "beam"
  const x = (Math.random() - 0.25) * 1; // width of beam
  const y = Math.random() * 3 - 0.5;         // height: 0 → 3
  const z = (Math.random()) * 0.5; // depth
  positions.push(x, y, z);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.02,
  transparent: true,
  opacity: 0.05,
});

const particles = new THREE.Points(geometry, material);
// scene.add(particles);

function animateParticles() {
  const positions = particles.geometry.attributes.position.array;
  const dir = new THREE.Vector3();
  light.getWorldDirection(dir); // direction of light

  for (let i = 0; i < positions.length; i += 3) { // y-coordinate
    positions[i] -= dir.x * 0.0001;
    positions[i+1] -= dir.y * 0.0001;
    positions[i+2] -= dir.z * 0.0001;
    // positions[i] -= 0.0001; // speed of falling
    if (positions[i + 1] < -0.5) {
      positions[i + 1] = 2.5;           // top of beam
      positions[i] = (Math.random() - 0.25) * 1; // random X in beam
      positions[i + 2] = (Math.random()) * 0.5; // random Z
    }
  }
  particles.geometry.attributes.position.needsUpdate = true;
}



// RENDERING LOOP
function animate() {
  animateParticles();

  camera.position.x += (baseCameraPos.x + targetOffset.x - camera.position.x) * 0.05;
  camera.position.y += (baseCameraPos.y + targetOffset.y - camera.position.y) * 0.05;
  camera.position.z += (baseCameraPos.z + targetOffset.z - camera.position.z) * 0.05;

  camera.lookAt(0, 0.15, 0);

  controls.update();
  composer.render();

  composer.setSize(window.innerWidth, window.innerHeight);
  bokehPass.setSize(window.innerWidth, window.innerHeight);
}
renderer.setAnimationLoop( animate );