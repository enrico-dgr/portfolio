import { Euler, Vector3 } from 'three';
import Ring from './Ring';
import Text from './Text';
import React, { useMemo } from 'react';
import { MeshProps } from '@react-three/fiber';

function randomRadius(ringMaxRadius: number, ringMinRadius: number) {
	return Math.random() * (ringMaxRadius - ringMinRadius) + ringMinRadius;
}

type NavRingProps = {
	ringMinRadius: number;
	ringMaxRadius: number;
	texts: string[];
} & MeshProps;

function NavRing({
	ringMaxRadius,
	ringMinRadius,
	rotation = new Euler(3.14 * (110 / 180)),
	texts,
	...props
}: NavRingProps) {
	const memoizedTexts = useMemo(() => {
		const v3 = new Vector3();
		const euler = new Euler();

		const selfAngle = euler.set(
			-(rotation as Euler).x,
			-(rotation as Euler).y,
			-(rotation as Euler).z,
		);
		const deltaAngle = (Math.PI * 2) / texts.length;
		const memoizedTexts = [];

		for (let i = 0; i < texts.length; i++) {
			const radius = randomRadius(ringMaxRadius, ringMinRadius);
			const angle = (i + 1) * deltaAngle;

			memoizedTexts.push(
				<Text
					key={'NavRing-text' + i}
					position={v3
						.set(Math.cos(angle), Math.sin(angle), 0)
						.multiplyScalar(radius)
						.clone()}
					rotation={selfAngle}
					text={texts[i]}
				/>,
			);
		}

		return memoizedTexts;
	}, []);

	return (
		<Ring
			ringMaxRadius={ringMaxRadius}
			ringMinRadius={ringMinRadius}
			rotation={rotation}
			{...props}
		>
			{memoizedTexts}
		</Ring>
	);
}

export default React.memo(NavRing, () => false);

