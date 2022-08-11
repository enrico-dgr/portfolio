import {
	DoubleSide,
	Mesh,
	MeshStandardMaterial,
	RingBufferGeometry,
	sRGBEncoding,
	TextureLoader,
	Vector3,
} from 'three';

// assets
import saturnRing from '../../../assets/textures/saturnringcolor.jpg';

function mapRingUV(ringGeometry: RingBufferGeometry, ringAvgRadius: number) {
	const v3 = new Vector3();
	for (let i = 0; i < ringGeometry.attributes.position.count; i++) {
		v3.fromBufferAttribute(ringGeometry.attributes.position, i);
		ringGeometry.attributes.uv.setXY(
			i,
			v3.length() < ringAvgRadius ? 0 : 1,
			1,
		);
	}
}

export default function buildRing(
	ringMinRadius: number,
	ringMaxRadius: number,
) {
	const ringTexture = new TextureLoader().load(saturnRing);
	ringTexture.encoding = sRGBEncoding;

	const ringMaterial = new MeshStandardMaterial({
		transparent: true,
		side: DoubleSide,
		map: ringTexture,
	});

	const ringGeometry = new RingBufferGeometry(
		ringMinRadius,
		ringMaxRadius,
		60,
		1,
	);

	const ringAvgRadius = (ringMaxRadius - ringMinRadius) / 2 + ringMinRadius;
	mapRingUV(ringGeometry, ringAvgRadius);

	const ringMesh = new Mesh(ringGeometry, ringMaterial);
	
	ringMesh.receiveShadow = true;

	return ringMesh;
}
