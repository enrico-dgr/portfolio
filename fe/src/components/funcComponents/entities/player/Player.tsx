import React, { useMemo } from 'react';

// -- entities
import Character, * as Character_ from '../character/Character';

// -- assets

// -- systems
import InputMovement from '../../systems/inputMovement/InputMovement';
import { EntityComponent, State } from '../../../../types/entities/component';
import Camera from '../camera/Camera';
import { Vector3 } from 'three';
import InputRotation from '../../systems/inputRotation/InputRotation';

// -- utility types

// -- component
const Player: EntityComponent<Character_.Entity, Character_.EState> = (
	props,
) => {
	console.log('Render: Player');

	// -- preload

	// -- state and rendering
	const [state, setState] =
		React.useState<State<Character_.Entity, Character_.EState>>();

	React.useEffect(() => {
		props.getState && props.getState(state);
	}, [state]);

	const configs = useMemo(
		() => ({ camera: { position: new Vector3(2.5, 10.5, 0) } }),
		[],
	);

	return (
		<Character getState={setState}>
			{!!state && (
				<>
					<Camera position={configs.camera.position} />
					<InputMovement
						entity={state.entity}
						eState={state.eState}
					/>
					<InputRotation
						entity={state.entity}
						eState={state.eState}
					/>
				</>
			)}
		</Character>
	);
};

export default Player;
