import React from 'react';
import { Object3D, Vector3 } from 'three';
import {
	BasicMovements,
	BasicRotations,
} from '../../../../types/entities/dynamic';
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
		speed: 10,
		time: 0,
		value: 0,
		vectorBuffer: new Vector3(0, 0, 0),
	});

	useFrame((s) => {
		state.value = state.speed * (s.clock.elapsedTime - state.time);
		state.time = s.clock.elapsedTime;

		entity.object.getWorldDirection(state.vectorBuffer);
		const forward = state.vectorBuffer.clone();
		const side = state.vectorBuffer
			.clone()
			.set(
				-state.vectorBuffer.z,
				state.vectorBuffer.y,
				state.vectorBuffer.x,
			);

		if (eState.action.forward) {
			forward.multiplyScalar(-state.value);
		} else if (eState.action.backward) {
			forward.multiplyScalar(state.value);
		} else {
			forward.multiplyScalar(0);
		}

		if (eState.action.right) {
			side.multiplyScalar(-state.value);
		} else if (eState.action.left) {
			side.multiplyScalar(state.value);
		} else {
			side.multiplyScalar(0);
		}

		entity.object.position.add(forward).add(side);
	});

	return <></>;
};

export default BasicMovement;
