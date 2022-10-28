import React from 'react';

// -- entities
import Camera, * as Camera_ from 'entities-l/camera/Camera';

// -- systems
import InputRotation from 'systems-l/inputRotation/InputRotation';

// -- utility types
import { EntityComponent, State } from 'types-l/entities/component';
import BasicRotation from 'systems-l/basicRotation/BasicRotation';

const FirstPersonCamera: EntityComponent<
	Camera_.Entity,
	Camera_.EState,
	Camera_.Props
> = (props) => {
	const [state, setState] =
		React.useState<State<Camera_.Entity, Camera_.EState>>();

	return (
		<Camera getState={setState} {...props}>
			{!!state && (
				<>
					<InputRotation
						entity={state.entity}
						eState={state.eState}
						direction="vertical"
            maxDeltaXAngle={18}
            minDeltaXAngle={-25}
					/>
          <BasicRotation entity={state.entity} eState={state.eState} />
				</>
			)}
		</Camera>
	);
};

export default FirstPersonCamera;
