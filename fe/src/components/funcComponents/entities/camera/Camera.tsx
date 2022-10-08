import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { EntityComponent, State } from '../../../../types/entities/component';
import { BasicRotations } from '../../../../types/entities/dynamic';
import { Object3D } from 'three/src/Three';

export type Props = {
	position?: Vector3;
};

export type Entity = {
	object: Object3D;
};

export type EState = Record<'action', BasicRotations>;

const Camera: EntityComponent<Entity, EState, Props> = (props) => {
	const camera = useThree((s) => s.camera);

	// -- state and rendering
	const [state] = useState<State<Entity, EState>>({
		entity: {
			object: camera,
		},
		eState: {
			action: {
				horizontalTurn: 0,
				verticalTurn: 0,
			},
		},
	});

	useEffect(() => {
		props.position && camera.position.copy(props.position);
		camera.lookAt(camera.position.clone().add(new Vector3(0, 0, -1)));
	}, []);

	useEffect(() => {
		props.getState && props.getState(state);
	}, [state]);

	return <primitive object={camera}>{props.children}</primitive>;
};

export default Camera;
