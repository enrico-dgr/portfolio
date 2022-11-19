import { BoxGeometryProps } from '@react-three/fiber';
import React from 'react';
import { Euler, Vector3 } from 'three';

type Props = {
	args: BoxGeometryProps['args'];
	position?: Vector3;
	rotation?: Euler;
};

const Line = ({ args, position, rotation }: Props) => {
	return (
		<mesh position={position} rotation={rotation}>
			<boxGeometry args={args} />
      <meshBasicMaterial />
		</mesh>
	);
};

export default Line;
