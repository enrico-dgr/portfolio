import React from 'react';
import Character from '../character/Character';
import InputMovement from '../inputMovement/InputMovement';

const Player = () => {
	console.log('Render: Player');

  const [inputSystem] = InputMovement()

	return <Character systems={[inputSystem]} />;
};

export default Player;
