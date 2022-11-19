import React from 'react';
import Character from 'entities-l/Character';

const list: {
	name: string;
	fe: JSX.Element;
	be: JSX.Element;
}[] = [
	{
		name: 'Character',
		fe: <Character />,
		be: <Character />,
	},
];

export default list;
