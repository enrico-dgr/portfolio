import React from 'react';

// -- entities
import Camera, * as Camera_ from 'entities-l/Camera';

// -- systems
import InputRotation from 'systems-l/InputRotation';

// -- utility types
import { EntityComponent } from 'types-l/entities/component';
import BasicRotation from 'systems-l/BasicRotation';
import useSystemsConcat from 'hooks-l/useSystemsConcat';
import { PerspectiveCamera } from '@react-three/drei';

const FirstPersonCamera: EntityComponent<
	Camera_.EObjects,
	Camera_.EState,
	Camera_.Props
> = (props) => {
	const systems = useSystemsConcat({
		systems: [
			InputRotation({
				direction: 'vertical',
				maxDeltaXAngle: 18,
				minDeltaXAngle: -25,
			}),
			BasicRotation,
		],
		props: props as typeof PerspectiveCamera,
	});

	return (
		<Camera {...props} systems={systems}>
			{props.children}
		</Camera>
	);
};

export default FirstPersonCamera;
