import React from 'react';
import { keyMap } from '../../../../constants/defaultSettings';
import { BasicMovements } from 'types-l/entities/dynamic';
import { System } from 'types-l/systems';

type State = {
	onKeyDown: (e: KeyboardEvent) => void;
	onKeyUp: (e: KeyboardEvent) => void;
};

type EState = Record<'action', BasicMovements>;

const InputMovement: System<{}, EState> = ({ state: eState }) => {
	console.log('System: InputMovement');

	const [state] = React.useState<State>({
		onKeyDown: () => {},
		onKeyUp: () => {},
	});

	const onKeyDown = React.useCallback(
		(pS: EState) =>
			(e: KeyboardEvent): void => {
				if (!document.pointerLockElement) {
					return;
				}

				switch (e.key) {
					case keyMap['forward']:
						pS.action.forward = true;
						break;
					case keyMap['backward']:
						pS.action.backward = true;
						break;
					case keyMap['left']:
						pS.action.left = true;
						break;
					case keyMap['right']:
						pS.action.right = true;
						break;
				}
			},
		[]
	);

	const onKeyUp = React.useCallback(
		(pS: EState) =>
			(e: KeyboardEvent): void => {
				switch (e.key) {
					case keyMap['forward']:
						pS.action.forward = false;
						break;
					case keyMap['backward']:
						pS.action.backward = false;
						break;
					case keyMap['left']:
						pS.action.left = false;
						break;
					case keyMap['right']:
						pS.action.right = false;
						break;
				}
			},
		[]
	);

	React.useEffect(() => {
		state.onKeyDown = onKeyDown(eState);
		state.onKeyUp = onKeyUp(eState);

		document.addEventListener('keydown', state.onKeyDown);
		document.addEventListener('keyup', state.onKeyUp);

		return () => {
			document.removeEventListener('keydown', state.onKeyDown);
			document.removeEventListener('keyup', state.onKeyUp);
		};
	}, []);

	return <></>;
};

export default InputMovement;
