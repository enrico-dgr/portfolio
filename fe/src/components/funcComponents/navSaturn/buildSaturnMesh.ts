import {
	DoubleSide,
	Mesh,
	MeshStandardMaterial,
	RingBufferGeometry,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
	Vector3,
} from 'three';

// assets
import saturn from '../../../assets/textures/saturnmap.jpg';
import saturnRing from '../../../assets/textures/saturnringcolor.jpg';

const buildSaturnMesh = (
	saturnRadius: number,
	ringMinRadius: number,
	ringMaxRadius: number,
) => {
	const ringAvgRadius = (ringMaxRadius - ringMinRadius) / 2 + ringMinRadius;

	// textures
	const planetTexture = new TextureLoader().load(saturn);
	planetTexture.encoding = sRGBEncoding;
	const ringTexture = new TextureLoader().load(saturnRing);
	ringTexture.encoding = sRGBEncoding;

	// meshes
	const planetMesh = new Mesh(
		new SphereGeometry(saturnRadius),
		new MeshStandardMaterial({
			transparent: true,
			map: planetTexture,
		}),
	);
	planetMesh.position.set(0, 0, 0);
	planetMesh.castShadow = true;
	planetMesh.receiveShadow = true;

	const ringGeometry = new RingBufferGeometry(
		ringMinRadius,
		ringMaxRadius,
		60,
		1,
	);

	const v3 = new Vector3();
	for (let i = 0; i < ringGeometry.attributes.position.count; i++) {
		v3.fromBufferAttribute(ringGeometry.attributes.position, i);
		ringGeometry.attributes.uv.setXY(
			i,
			v3.length() < ringAvgRadius ? 0 : 1,
			1,
		);
	}

	const ringMesh = new Mesh(
		ringGeometry,
		new MeshStandardMaterial({
			transparent: true,
			side: DoubleSide,
			map: ringTexture,
		}),
	);

	ringMesh.rotateOnAxis(new Vector3(1, 0, 0), (110 * 3.14) / 180);
	ringMesh.position.set(0, 0, 0);
	ringMesh.receiveShadow = true;

	planetMesh.add(ringMesh);

	return planetMesh;
};

export default buildSaturnMesh;
