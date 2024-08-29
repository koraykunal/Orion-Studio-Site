import * as THREE from "https://cdn.skypack.dev/three@v0.132.2/build/three.module.js"
import {GLTFLoader} from "https://cdn.skypack.dev/three@v0.132.2/examples/jsm/loaders/GLTFLoader.js"

const manager = new THREE.LoadingManager();

const progressBar = document.getElementById('progress-bar')
const progressBarContainer = document.getElementById('progress')

manager.onLoad = function () {
    progressBar.style.display = 'none';
    progressBarContainer.style.display = 'none';
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    progressBar.style.width = ((itemsLoaded / itemsTotal) * 100).toString() + '%';
};

manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

function isMobile() {
    return window.innerWidth <= 768;
}
const loader = new GLTFLoader(manager);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
const canvas = document.getElementById('threejs-canvas')
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});

loader.load('/static/3dAssets/bCircle3d.gltf', function (gltf) {
    const ambientLight = new THREE.AmbientLight(0xebfdff, 1);
    const pointLight = new THREE.PointLight(0x2dd2b4, 3);
    const directionalLight1 = new THREE.DirectionalLight(0x1b7e6c, 0.3);
    const directionalLight2 = new THREE.DirectionalLight(0xef10e6, 0.2);
    directionalLight2.position.y = -15
    scene.add(directionalLight1);
    scene.add(directionalLight2);
    scene.add(pointLight);
    scene.add(ambientLight);

    const model = gltf.scene

    var mixer = new THREE.AnimationMixer(model);
    var action = mixer.clipAction(gltf.animations[0]).play();
    var action1 = mixer.clipAction(gltf.animations[1]).play();
    var action2 = mixer.clipAction(gltf.animations[2]).play();
    model.scale.x = 1;
    model.scale.y = 1;
    model.scale.z = 1;

    const material1 = new THREE.MeshPhongMaterial({
        color: 0x125448, shininess: 100, specular: 0xffffff,
    });
    const material2 = new THREE.MeshPhongMaterial({
        color: 0xbebdbd, shininess: 50, specular: 0x2dd2b4,
    });
    const material3 = new THREE.MeshPhongMaterial({
        color: 0xbebdbd, shininess: 50, specular: 0x2dd2b4,
    });
    gltf.scene.traverse((object) => {
        if (object.type === 'Mesh') {
            if (object.name === 'BezierCircle') {
                object.material = material1;
            }
            if (object.name === 'BezierCircle001') {
                object.material = material2;
            }
            if (object.name === 'BezierCircle002') {
                object.material = material3;
            }
        }
    });
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const maxScale = 10; // Maximum scale when fully scrolled down
        const minScale = 1; // Minimum scale when at the top of the page
        const maxScroll = document.body.scrollHeight - window.innerHeight; // Maximum scroll value

        // Calculate scale based on scroll position
        const scale = minScale - (scrollTop / maxScroll) * (maxScale - minScale);
        // Apply scale to the model
        model.scale.set(scale, scale, scale);
    });
    scene.add(model);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        if (mixer) {
            mixer.update(0.003);
        }
        renderer.render(scene, camera);
    }

    animate();

}, undefined, function (error) {
    console.error(error);
});

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
if (isMobile()) {
    renderer.setSize(window.innerWidth, window.innerHeight)
} else {
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
}
renderer.setPixelRatio(window.devicePixelRatio)

window.addEventListener("resize", onWindowResize, true);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio)
    if (isMobile()) {
        renderer.setSize(window.innerWidth, window.innerHeight)
    } else {
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    }
}
