import { Vector3 } from 'three';
import {
	ThreeDataPrimitive,
	BasicMovements,
	BasicRotations,
} from 'common-types/entities/';
import { System } from 'common-types/systems';

type EState = Record<'action', BasicMovements & BasicRotations>;

type State = {
	speed: number;
	time: number;
	value: number;
	vectorBuffer: Vector3;
};

const BasicMovement: System<ThreeDataPrimitive, EState> = ({
	threeData,
	state: eState,
}) => {
	console.log('System: BasicMovement');

	const state: State = {
		speed: 10,
		time: 0,
		value: 0,
		vectorBuffer: new Vector3(0, 0, 0),
	};

	return (delta) => {
		state.value = state.speed * delta;

		threeData.object.getWorldDirection(state.vectorBuffer);
		const forward = state.vectorBuffer.clone();
		const side = state.vectorBuffer
			.clone()
			.set(
				-state.vectorBuffer.z,
				state.vectorBuffer.y,
				state.vectorBuffer.x
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

		threeData.object.position.add(forward).add(side);
	};
};

export default BasicMovement;
