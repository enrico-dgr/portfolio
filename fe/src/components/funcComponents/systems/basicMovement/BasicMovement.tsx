import React from 'react';
import { Object3D, Vector3 } from 'three';
import { BasicMovements, BasicRotations } from '../../../../types/entities/dynamic';
import { System } from '../../../../types/systems';
import { useFrame } from '@react-three/fiber';

type Entity = { object: Object3D };
type EState = Record<'action', BasicMovements & BasicRotations>;

type State = {
	speed: number;
	time: number;
	value: number;
	vectorBuffer: Vector3;
};

const BasicMovement: System<Entity, EState> = ({ entity, eState }) => {
	console.log('System: BasicMovement');

	const [state] = React.useState<State>({
		speed: 8,
		time: 0,
		value: 0,
		vectorBuffer: new Vector3(0, 0, 0),
	});

	useFrame((s) => {
		state.value = state.speed * (s.clock.elapsedTime - state.time);
		state.time = s.clock.elapsedTime;

    // state.vectorBuffer.set(
      
    // )

		if (eState.action.forward) {
			entity.object.position.z -= state.value;
		} else if (eState.action.backward) {
			entity.object.position.z += state.value;
		}
		if (eState.action.right) {
			entity.object.position.x += state.value;
		} else if (eState.action.left) {
			entity.object.position.x -= state.value;
		}
	});

	return <></>;
};

export default BasicMovement;
