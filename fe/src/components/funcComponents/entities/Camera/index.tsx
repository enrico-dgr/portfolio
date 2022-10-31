import React, { useEffect } from 'react';
import { useThree, Camera as Camera_T } from '@react-three/fiber';
import { Vector3 } from 'three';
import { EntityComponent } from 'types-l/entities/component';
import { BasicRotations } from 'types-l/entities/dynamic';
import useEntity from 'hooks-l/useEntity';

export type Props = {
	position?: Vector3;
};

export type EObjects = {
	object: Camera_T;
};

export type EState = Record<'action', BasicRotations>;

const Camera: EntityComponent<EObjects, EState, Props> = (props) => {
	const camera = useThree((s) => s.camera);

	// -- state and rendering
	const [] = useEntity<EObjects, EState, Props>({
		props,
		entity: {
			objects: {
				object: camera,
			},
			state: {
				action: {
					horizontalTurn: 0,
					verticalTurn: 0,
				},
			},
		},
	});

	useEffect(() => {
		props.position && camera.position.copy(props.position);
		camera.lookAt(camera.position.clone().add(new Vector3(0, 0, -1)));
	}, []);

	return <primitive object={camera}>{props.children}</primitive>;
};

export default Camera;
