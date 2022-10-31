import React from 'react';

// -- entities
import Camera, * as Camera_ from 'entities-l/Camera';

// -- systems
import InputRotation from 'systems-l/InputRotation';

// -- utility types
import { EntityComponent, State } from 'types-l/entities/component';
import BasicRotation from 'systems-l/BasicRotation';
import useSystems from 'hooks-l/useSystems';

const FirstPersonCamera: EntityComponent<
	Camera_.Entity,
	Camera_.EState,
	Camera_.Props
> = (props) => {
	const [state, setState] =
		React.useState<State<Camera_.Entity, Camera_.EState>>();

	const systems = useSystems({
		state,
		systems: [
			InputRotation({
				direction: 'vertical',
				maxDeltaXAngle: 18,
				minDeltaXAngle: -25,
			}),
			BasicRotation,
		],
		props,
	});

	return (
		<Camera getState={setState} {...props}>
			{systems}
		</Camera>
	);
};

export default FirstPersonCamera;
