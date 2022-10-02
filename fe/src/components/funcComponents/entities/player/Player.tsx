import React from 'react';

// -- entities
import Character, * as Character_ from '../character/Character';

// -- assets

// -- systems
import InputMovement from '../../systems/inputMovement/InputMovement';
import { EntityComponent, State } from '../../../../types/entities/component';
import Camera from '../camera/Camera';
import { Vector3 } from 'three';
import InputRotation from '../../systems/inputRotation/InputRotation';
import { PointerLockControls } from '@react-three/drei';

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

	return (
		<Character getState={setState}>
			{!!state && (
				<>
					<Camera position={new Vector3(2.5, 10.5, 9)} />
					<InputMovement
						entity={state.entity}
						eState={state.eState}
					/>
					<InputRotation
						entity={state.entity}
						eState={state.eState}
					/>
          <PointerLockControls />
				</>
			)}
		</Character>
	);
};

export default Player;
