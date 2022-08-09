import React from 'react';
import {
	DoubleSide,
	Mesh,
	MeshPhongMaterial,
	MeshStandardMaterial,
	NoBlending,
	PlaneGeometry,
	RingBufferGeometry,
	RingGeometry,
	ShaderMaterial,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
	UniformsLib,
	UniformsUtils,
	Vector3,
} from 'three';

// assets
import saturn from '../../../assets/textures/saturnmap.jpg';
import saturnRing from '../../../assets/textures/saturnringcolor.jpg';
import vertexSphere from './vertexSaturn.glsl';
import vertexRing from './vertexRing.glsl';
import fragmentSphere from './fragmentSaturn.glsl';
import fragmentRing from './fragmentRing.glsl';

// constants
const radius = 4;
const saturnTexture = new TextureLoader().load(saturn);
const saturnTexture2 = new TextureLoader().load(saturn);
saturnTexture2.encoding = sRGBEncoding;
const saturnRingTexture2 = new TextureLoader().load(saturnRing);
saturnRingTexture2.encoding = sRGBEncoding;

// meshes
const planeMesh = new Mesh(
	new PlaneGeometry(100, 100),
	new MeshPhongMaterial({ color: 0xffb851 }),
);
planeMesh.position.set(0, 0, -70);
planeMesh.receiveShadow = true;

const saturnMesh = new Mesh(
	new SphereGeometry(radius),
	new ShaderMaterial({
		transparent: true,
		vertexShader: vertexSphere,
		fragmentShader: fragmentSphere,
		lights: true,
		blending: NoBlending,
		uniforms: UniformsUtils.merge([
			UniformsLib.lights,
			{
				globeTexture: {
					value: saturnTexture,
				},
			},
		]),
	}),
);
saturnMesh.position.set(10, 0, 0);
saturnMesh.castShadow = true;
saturnMesh.receiveShadow = true;

const saturnMeshEx = new Mesh(
	new SphereGeometry(radius),
	new MeshStandardMaterial({
		map: saturnTexture2,
	}),
);
saturnMeshEx.position.set(-10, 0, 0);
saturnMeshEx.castShadow = true;
saturnMeshEx.receiveShadow = true;

const ringMesh = new Mesh(
	new RingGeometry(5.5, 9.5, 40, 1),
	new ShaderMaterial({
		side: DoubleSide,
		vertexShader: vertexRing,
		fragmentShader: fragmentRing,
		transparent: true,
		uniforms: {
			globeTexture: {
				value: saturnRingTexture2,
			},
		},
	}),
);

ringMesh.rotateOnAxis(new Vector3(1, 0, 0), (110 * 3.14) / 180);
ringMesh.position.set(10, 0, 0);
ringMesh.receiveShadow = true;

const ringGeometry = new RingBufferGeometry(5.5, 9.5, 40, 1);
const v3 = new Vector3();
for (let i = 0; i < ringGeometry.attributes.position.count; i++) {
	v3.fromBufferAttribute(ringGeometry.attributes.position, i);
	ringGeometry.attributes.uv.setXY(i, v3.length() < 7.5 ? 0 : 1, 1);
}
const ringMeshEx = new Mesh(
	ringGeometry,
	new MeshStandardMaterial({
		transparent: true,
		side: DoubleSide,
		map: saturnRingTexture2,
	}),
);

ringMeshEx.rotateOnAxis(new Vector3(1, 0, 0), (110 * 3.14) / 180);
ringMeshEx.position.set(-10, 0, 0);
ringMeshEx.receiveShadow = true;

// Component

function NavSaturn() {
	console.log('render');

	return (
		<group
			position={[0, 0, 0]}
			ref={(cur) => {
				cur?.add(saturnMesh);
				cur?.add(ringMesh);
				cur?.add(saturnMeshEx);
				cur?.add(ringMeshEx);
				cur?.add(planeMesh);
			}}
		></group>
	);
}

export default NavSaturn;
