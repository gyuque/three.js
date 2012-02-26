(function(aGlobal) {
	"use strict";
	var TEXDATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAMFB'+
	              'MVEWcEFqcGGOlIWOlIWulKWutOXOtOXutQnu1SoS6Uo69Y5zMfrHWnMbepc7erdbntd6d+uwA'+
	              'AAAAo0lEQVR42mNgoAL4jwaIEQDp405gYOBKYLjvwIAssIBhLwM7ssABhtUMXECB3Q0M3nsTG'+
	              'Lr3fmTwYuABGbqAIf9/AsP6/z8YWBjskQV+A/X2IwTccv4CBfYjBBi4/6MLoKnIWotmxvr/v4'+
	              'C2+CMLfGPwYOBHFvjAUAUyGW5t5gao02G2sME8BxcoYDgvwAgS2LVqPxCvWr1rFZAiKggJClA'+
	              'BAAC+WuzCiXr+gwAAAABJRU5ErkJggg==';
	
	var renderer, camera, scene, mesh, mesh2, mesh3;
	var angle = 0;

	function createMesh(g, texture) {
		var m = new THREE.Mesh(g, new THREE.MeshFaceMaterial());
		g.materials = 
				[
					new THREE.MeshBasicMaterial( { map: texture } ),
					new THREE.MeshBasicMaterial( { color: 0xcc4488 } )
				];
				
		return m;
	}
	
	function setupModel() {
		var img = new Image();
		img.onload = function() { texture.needsUpdate = true; }
		img.src = TEXDATA;
		var texture = new THREE.Texture(img);
		
		var s = new THREE.Shape();
		s.moveTo( 0,0 );
		s.lineTo( -4, -4 );
		s.lineTo(  4, -4 );
		s.lineTo(  5, 0 );
		s.lineTo(  4, 4 );
		s.lineTo( -4, 4 );
		
		var exoption = {
			bevelSize: 1,
			amount: 6,
			extrudeMaterial: 0,
			material: 1,
			UVRule: THREE.ExtrudeGeometry.UVRULE_CYLINDER
		};
		
		var geom = s.extrude(exoption);
		
		exoption.UVRule = THREE.ExtrudeGeometry.UVRULE_CYLINDER_EQUALLY_U;
		var geom2 = s.extrude(exoption);

		delete exoption.UVRule;
		var geom3 = s.extrude(exoption);
		
		mesh = createMesh(geom, texture);
		mesh.position.set(-7, 0, -35);
		scene.add(mesh);

		mesh2 = createMesh(geom2, texture);
		mesh2.position.set(7, 0, -35);
		scene.add(mesh2);

		mesh3 = createMesh(geom3, texture);
		mesh3.position.set(0, 10, -50);
		scene.add(mesh3);
	}
	
	function tick() {
		var DPI = Math.PI*2;
		angle += 0.05;
		if (angle > DPI) {angle -= DPI;}
		mesh.rotation.set(-4.2, 0, angle);
		mesh2.rotation.set(-4.2, 0, angle);
		mesh3.rotation.set(-4.2, 0, angle);
		
		renderer.render(scene, camera);
		setTimeout(tick, 100);
	}
	
	aGlobal.launch = function() {
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();
		camera = new THREE.PerspectiveCamera();
		scene.add(camera);

		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, 1, 2);
		light.position.normalize();
		scene.add(light);
		
		
		renderer.setSize(300, 300);
		document.body.appendChild(renderer.domElement);
		
		setupModel();
		
		tick();
	};
})(window);