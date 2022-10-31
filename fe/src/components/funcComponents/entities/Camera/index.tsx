import React, { useEffect, useState } from 'react';
import { useThree, Camera as Camera_T } from '@react-three/fiber';
import { Vector3 } from 'three';
import { EntityComponent, State } from 'types-l/entities/component';
import { BasicRotations } from 'types-l/entities/dynamic';

export type Props = {
	position?: Vector3;
};

export type Entity = {
	object: Camera_T;
};

export type EState = Record<'action', BasicRotations>;

const Camera: EntityComponent<Entity, EState, Props> = (props) => {
	const camera = useThree((s) => s.camera);

	// -- state and rendering
	const [state] = useState<Exclude<State<Entity, EState>, undefined>>({
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
