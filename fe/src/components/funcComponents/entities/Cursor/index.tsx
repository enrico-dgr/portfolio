import React, { useMemo } from 'react';
import { Euler, Vector3 } from 'three';
import Line from './Line';

type Props = {
	position?: Vector3;
};

const Cursor = ({ position }: Props) => {
	const configs = useMemo(
		() => ({
			line: {
				size: [0.015, 0.004, 0.0001] as [number, number, number],
				offset: 0.016,
			},
		}),
		[]
	);

	return (
		<mesh position={position}>
			<Line
				args={configs.line.size}
				position={new Vector3(-configs.line.offset)}
			/>
			<Line
				args={configs.line.size}
				position={new Vector3(configs.line.offset)}
			/>
			<Line
				args={configs.line.size}
				position={new Vector3(0, -configs.line.offset)}
				rotation={new Euler(0, 0, Math.PI * 0.5)}
			/>
			<Line
				args={configs.line.size}
				position={new Vector3(0, configs.line.offset)}
				rotation={new Euler(0, 0, Math.PI * 0.5)}
			/>
		</mesh>
	);
};

export default Cursor;
