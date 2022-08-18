import React from 'react';

import { MeshPhongMaterial } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// assets
import helvetica from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { MeshProps } from '@react-three/fiber';

export type TextProps = { size?: number; text?: string } & MeshProps;

const Text = ({ size = 1, text = '', ...props }: TextProps) => {
	console.log('render text');

	const font = React.useMemo(() => new FontLoader().parse(helvetica), []);
	const geometry = React.useMemo(() => {
		let xMid = 0;
		const geometry = new TextGeometry(text, {
			font: font,
			size,
			height: size / 2,
			curveSegments: 12,
		});
		geometry.computeBoundingBox();

		if (geometry.boundingBox)
			xMid =
				-0.5 *
				(geometry.boundingBox.max.x - geometry.boundingBox.min.x);
		geometry.translate(xMid, 0, 0);

		return geometry;
	}, []);
	const material = React.useMemo(
		() =>
			new MeshPhongMaterial({
				color: 0xffffff,
			}),
		[],
	);

	return <mesh geometry={geometry} material={material} {...props} />;
};

export default React.memo(Text, () => false);
