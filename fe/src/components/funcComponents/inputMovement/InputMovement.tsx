import React from 'react';
import { Object3D } from 'three';
import { ActionName } from '../../../types/entities/dynamic';
import { EntityState, System } from '../../../types/systems';

type State = {
	eventAdded: boolean;
	onKeyDown: (e: KeyboardEvent) => void;
	onKeyUp: (e: KeyboardEvent) => void;
	keyMap: Record<string, string>;
};

type PState = EntityState<'action', ActionName>;

const InputMovement = <Entity extends Object3D>() => {
	const [state] = React.useState<State>({
		eventAdded: false,
		onKeyDown: () => {},
		onKeyUp: () => {},
		keyMap: {
			walk: 'w',
		},
	});

	const onKeyDown = React.useCallback(
		(pS: PState) =>
			(e: KeyboardEvent): void => {
				const keyMap = state.keyMap;

				switch (e.key) {
					case keyMap['walk']:
						if (pS.action.cur === 'walk') break;

						pS.action.cur = 'walk';
						break;
				}
			},
		[],
	);

	const onKeyUp = React.useCallback(
		(pS: PState) =>
			(e: KeyboardEvent): void => {
				const keyMap = state.keyMap;

				switch (e.key) {
					case keyMap['walk']:
						pS.action.cur = 'idle';
						break;
				}
			},
		[],
	);

	const system = React.useCallback<System<Entity, PState>>((_, parentState) => {
		if (state.eventAdded) return;

		state.onKeyDown = onKeyDown(parentState);
		state.onKeyUp = onKeyUp(parentState);

		document.addEventListener('keydown', state.onKeyDown);
		document.addEventListener('keyup', state.onKeyUp);
		state.eventAdded = true;
	}, []);

	React.useEffect(() => {
		return () => {
			document.removeEventListener('keydown', state.onKeyDown);
			document.removeEventListener('keyup', state.onKeyUp);
		};
	}, []);

	return [system];
};

export default InputMovement;
