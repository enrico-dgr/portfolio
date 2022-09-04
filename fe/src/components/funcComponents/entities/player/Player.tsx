import React from 'react';
import Character from '../character/Character';

// inner systems

// systems
import InputMovement from '../../systems/inputMovement/InputMovement';

// utility types

// component
const Player = () => {
	console.log('Render: Player');

	return <Character systems={[InputMovement]} />;
};

export default Player;
