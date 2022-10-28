import React from 'react';
import { MathUtils, Object3D } from 'three';
import { System } from 'types-l/systems';
import { useFrame } from '@react-three/fiber';
import { BasicRotations } from 'types-l/entities/dynamic';

type EState = { action: BasicRotations };
type Entity = { object: Object3D };

const BasicRotation: System<Entity, EState> = ({ entity, eState }) => {
	console.log('System: BasicRotation');

	useFrame(() => {
		entity.object.rotation.y = MathUtils.lerp(
			entity.object.rotation.y,
			eState.action.horizontalTurn,
			0.1,
		);
		entity.object.rotation.x = MathUtils.lerp(
			entity.object.rotation.x,
			eState.action.verticalTurn,
			0.1,
		);
	});

	return <></>;
};

export default BasicRotation;
