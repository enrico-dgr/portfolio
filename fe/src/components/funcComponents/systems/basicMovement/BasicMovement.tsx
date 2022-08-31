import React from 'react';
import { keyMap } from '../../../../constants/defaultSettings';
import { ActionName, BasicMovements } from '../../../../types/entities/dynamic';
import { EntityState, System } from '../../../../types/systems';

type State = {
	eventAdded: boolean;
	onKeyDown: (e: KeyboardEvent) => void;
	onKeyUp: (e: KeyboardEvent) => void;
	movements: Record<
		Extract<ActionName, 'forward' | 'backward' | 'left' | 'right'>,
		boolean
	>;
};

type EState = EntityState<'action', BasicMovements>;

const BasicMovement = <Entity extends {}>() => {
	const [state] = React.useState<State>({
		eventAdded: false,
		onKeyDown: () => {},
		onKeyUp: () => {},
		movements: {
			forward: false,
			backward: false,
			left: false,
			right: false,
		},
	});

	const onKeyDown = React.useCallback(
		(pS: EState) =>
			(e: KeyboardEvent): void => {
				for (const key_ in keyMap) {
					const key = key_ as ActionName;

					if (
						Object.prototype.hasOwnProperty.call(keyMap, key) &&
						e.key === keyMap[key]
					) {
						pS.action[key] = true;
						return;
					}
				}
			},
		[],
	);

	const onKeyUp = React.useCallback(
		(pS: EState) =>
			(e: KeyboardEvent): void => {
				for (const key_ in keyMap) {
					const key = key_ as ActionName;

					if (
						Object.prototype.hasOwnProperty.call(keyMap, key) &&
						e.key === keyMap[key]
					) {
						pS.action[key] = false;
						return;
					}
				}
			},
		[],
	);

	const system = React.useCallback<System<Entity, EState>>(
		(_, parentState) => {
			if (state.eventAdded) return;

			state.onKeyDown = onKeyDown(parentState);
			state.onKeyUp = onKeyUp(parentState);

			document.addEventListener('keydown', state.onKeyDown);
			document.addEventListener('keyup', state.onKeyUp);
			state.eventAdded = true;
		},
		[],
	);

	React.useEffect(() => {
		return () => {
			document.removeEventListener('keydown', state.onKeyDown);
			document.removeEventListener('keyup', state.onKeyUp);
		};
	}, []);

	return [system];
};

export default BasicMovement;
