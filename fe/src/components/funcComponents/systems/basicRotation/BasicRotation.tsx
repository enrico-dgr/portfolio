import React from 'react';
import { MathUtils, Object3D, Vector3 } from 'three';
import { System } from '../../../../types/systems';
import { useFrame } from '@react-three/fiber';
import { BasicRotations } from '../../../../types/entities/dynamic';

type EState = { action: BasicRotations };
type Entity = { scene: Object3D };

type State = {
	speed: number;
	time: number;
	value: number;
	vectorBuffer: Vector3;
};

const BasicRotation: System<Entity, EState> = ({ entity, eState }) => {
	console.log('System: BasicRotation');

	const [state] = React.useState<State>({
		speed: 8,
		time: 0,
		value: 0,
		vectorBuffer: new Vector3(0, 0, 0),
	});

	useFrame((s) => {
		state.value = state.speed * (s.clock.elapsedTime - state.time);
		state.time = s.clock.elapsedTime;

		entity.scene.rotation.y = MathUtils.lerp(
			entity.scene.rotation.y,
			eState.action.horizontalTurn,
			0.1,
		);
		entity.scene.rotation.x = MathUtils.lerp(
			entity.scene.rotation.x,
			eState.action.verticalTurn,
			0.1,
		);
	});

	return <></>;
};

export default BasicRotation;
