import { Vector3 } from 'three';
import buildRing from './buildRing';
import buildText from './buildText';

function randomRadius(ringMaxRadius: number, ringMinRadius: number) {
	return Math.random() * (ringMaxRadius - ringMinRadius) + ringMinRadius;
}

function getAngle(i: number, tot: number) {
	return ((i + 1) * Math.PI * 2) / tot;
}

function buildNavRing(
	texts: string[],
	ringMinRadius: number,
	ringMaxRadius: number,
) {
	const v3 = new Vector3();
	const ringMesh = buildRing(ringMinRadius, ringMaxRadius);
	const ringAngle = (110 * 3.14) / 180;
	ringMesh.rotateOnAxis(v3.set(1, 0, 0), ringAngle);

	for (let i = 0; i < texts.length; i++) {
		const text = buildText(texts[i]);

		const radius = randomRadius(ringMaxRadius, ringMinRadius);
		const angle = getAngle(i, texts.length);

		text.rotateOnAxis(v3.set(-1, 0, 0), ringAngle);
		text.position
			.set(Math.cos(angle), Math.sin(angle), 0)
			.multiplyScalar(radius);

		ringMesh.add(text);
	}

	return ringMesh;
}

export default buildNavRing;
