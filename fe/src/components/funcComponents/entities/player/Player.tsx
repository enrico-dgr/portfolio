import React from 'react';

// -- entities
import Character, * as Character_ from '../character/Character';

// -- assets

// -- systems
import InputMovement from '../../systems/inputMovement/InputMovement';
import { EntityComponent, State } from '../../../../types/entities/component';

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
					<InputMovement
						entity={state.entity}
						eState={state.eState}
					/>
				</>
			)}
		</Character>
	);
};

export default Player;
