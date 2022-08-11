// three
import {
	Mesh,
	MeshStandardMaterial,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
} from 'three';

// assets
import saturn from '../../../assets/textures/saturnmap.jpg';

function buildPlanet(
	planetGeometry: SphereGeometry,
	planetMaterial: MeshStandardMaterial,
) {
	const planetMesh = new Mesh(planetGeometry, planetMaterial);
	planetMesh.castShadow = true;
	planetMesh.receiveShadow = true;
	return planetMesh;
}

export default function buildSaturnMesh(saturnRadius: number) {
	const planetTexture = new TextureLoader().load(saturn);
	planetTexture.encoding = sRGBEncoding;

	const planetGeometry = new SphereGeometry(saturnRadius);

	const planetMaterial = new MeshStandardMaterial({
		transparent: true,
		map: planetTexture,
	});

	const planetMesh = buildPlanet(planetGeometry, planetMaterial);

	return planetMesh;
}
