import React from 'react';

// -- entities
import Character, * as Character_ from '../character/Character';
import FirstPersonCamera from '../firstPersonCamera/FirstPersonCamera';

// -- assets

// -- systems
import InputMovement from '../../systems/inputMovement/InputMovement';
import InputRotation from '../../systems/inputRotation/InputRotation';

// -- three
import { Vector3 } from 'three';

// -- utility types
import { EntityComponent, State } from '../../../../types/entities/component';

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

	const configs = React.useMemo(
		() => ({ camera: { position: new Vector3(2.5, 10.5, 0) } }),
		[],
	);

	return (
		<Character getState={setState}>
			{!!state && (
				<>
					<FirstPersonCamera position={configs.camera.position} />
					<InputMovement
						entity={state.entity}
						eState={state.eState}
					/>
					<InputRotation
						entity={state.entity}
						eState={state.eState}
						direction="horizontal"
					/>
				</>
			)}
		</Character>
	);
};

export default Player;
