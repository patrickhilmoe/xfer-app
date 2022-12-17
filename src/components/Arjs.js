import { ARButton } from './ARButton';
import * as THREE from 'three';


function ARitem () {
    let camera, scene, renderer;
    let mesh, mesh2;

		init();
		animate();

		function init() {
			const container = document.createElement('div');
			document.body.appendChild(container);

			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
      // This next line is important to to enable the renderer for WebXR
			renderer.xr.enabled = true; // New!
			container.appendChild(renderer.domElement);

			var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
			light.position.set(0.5, 1, 0.25);
			scene.add(light);

            // controller = renderer.xr.getController(0);
            // controller.addEventListener("select", )
            // scene.add(controller);
      
      // Look for "geometry" in the three.js documentation to find all the geometry types
      // https://threejs.org/docs/index.html

      // Add a polyhedron shape to the scene
      const geometry = new THREE.IcosahedronGeometry(0.1, 1);
      const material = new THREE.MeshPhongMaterial({
        color      :  new THREE.Color("rgb(226,35,213)"),
        shininess  :  6,
        flatShading:  true,
        transparent: 1,
        opacity    : 0.8
      });
      
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0.2, 0, -0.5);
      scene.add(mesh);
      
      // Add a second torus shape to the scene
      const geometry2 = new THREE.TorusGeometry(0.15, 0.05, 12, 50);
      const material2 = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color("rgb(253,253,150)") 
      });
      mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.position.set(-0.2, 0, -1);
      scene.add(mesh2);

			document.body.appendChild(ARButton.createButton(renderer));

			window.addEventListener('resize', onWindowResize, false);
		}

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function animate() {
			renderer.setAnimationLoop(render);
		}

		function render() {
      rotateObjects();
			renderer.render(scene, camera);
		}
    
    function rotateObjects() {
      // rotate the polyhedron on y
      // rotation units are in radians (here's a recommended video on Euler angles: https://www.youtube.com/watch?v=q0jgqeS_ACM)
      mesh.rotation.y = mesh.rotation.y - 0.01;
      console.log(mesh.rotation);
      
      // rotate the torus on x
      mesh2.rotation.x = mesh2.rotation.x - 0.01;
    }

}
ARitem();

export default ARitem;