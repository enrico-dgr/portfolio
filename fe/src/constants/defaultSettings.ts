import { ActionName } from '../types/entities/dynamic';

export type KeyMapKeys = Exclude<ActionName, 'idle' | 'horizontalTurn' | 'verticalTurn'> | 'menu';

export const keyMap: Record<
	KeyMapKeys,
	string
> = {
	forward: 'w',
	backward: 's',
	left: 'a',
	right: 'd',
	menu: 'Escape',
};
