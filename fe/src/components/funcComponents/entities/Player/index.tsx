import React from 'react';

// -- entities
import Character, * as Character_ from 'entities-l/Character';
import FirstPersonCamera from 'entities-l/FirstPersonCamera';

// -- assets

// -- systems
import InputMovement from 'systems-l/InputMovement';
import InputRotation from 'systems-l/InputRotation';

// -- three
import { Vector3 } from 'three';

// -- utility types
import { EntityComponent } from 'types-l/entities/component';
import useSystemsConcat from 'hooks-l/useSystemsConcat';
import Cursor from 'entities-l/Cursor';

// -- component
const Player: EntityComponent<Character_.Entity, Character_.EState> = (
	props
) => {
	console.log('Render: Player');

	// -- preload

	// -- state and rendering

	const systems = useSystemsConcat({
		systems: [InputMovement, InputRotation({ direction: 'horizontal' })],
		props,
	});

	const configs = React.useMemo(
		() => ({
			camera: { position: new Vector3(2.5, 11.2, 2.3) },
			cursor: { position: new Vector3(0, 0, -1.1) },
		}),
		[]
	);

	return (
		<Character systems={systems}>
			{props.children}
			<FirstPersonCamera position={configs.camera.position}>
				<Cursor position={configs.cursor.position} />
			</FirstPersonCamera>
		</Character>
	);
};

export default Player;
