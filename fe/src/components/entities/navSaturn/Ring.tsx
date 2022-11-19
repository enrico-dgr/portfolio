import { MeshProps } from '@react-three/fiber';
import React, { useMemo } from 'react';
import {
	DoubleSide,
	MeshStandardMaterial,
	RingBufferGeometry,
	sRGBEncoding,
	TextureLoader,
	Vector3,
} from 'three';

// assets
import saturnRing from 'assets-l/textures/saturnringcolor.jpg';

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

type RingProps = {
	ringMinRadius: number;
	ringMaxRadius: number;
} & MeshProps;

function Ring({ ringMinRadius, ringMaxRadius, ...props }: RingProps) {
	const material = useMemo(() => {
		const texture = new TextureLoader().load(saturnRing);
		texture.encoding = sRGBEncoding;

		return new MeshStandardMaterial({
			transparent: true,
			side: DoubleSide,
			map: texture,
		});
	}, []);

	const geometry = useMemo(() => {
		const ringGeometry = new RingBufferGeometry(
			ringMinRadius,
			ringMaxRadius,
			60,
			1,
		);

		const ringAvgRadius =
			(ringMaxRadius - ringMinRadius) / 2 + ringMinRadius;
		mapRingUV(ringGeometry, ringAvgRadius);

		return ringGeometry;
	}, []);

	return (
		<mesh
			receiveShadow
			material={material}
			geometry={geometry}
			{...props}
		/>
	);
}

export default React.memo(Ring, () => false);
