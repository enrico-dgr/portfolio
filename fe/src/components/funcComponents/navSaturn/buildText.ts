import helvetica from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Mesh, MeshPhongMaterial } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const buildText = (text: string) => {
	const size = 1;

	const font = new FontLoader().parse(helvetica);

	let xMid = 0;
	const geometry = new TextGeometry(text, {
		font: font,
		size,
		height: size / 2,
		curveSegments: 12,
	});
	geometry.computeBoundingBox();

	const material = new MeshPhongMaterial({
		color: 0xffffff,
	});

	if (geometry.boundingBox)
		xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
	geometry.translate(xMid, 0, 0);

	const mesh = new Mesh(geometry, material);

	return mesh;
};

export default buildText;