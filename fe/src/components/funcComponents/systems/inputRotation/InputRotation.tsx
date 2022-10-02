import React from 'react';
import { BasicRotations } from '../../../../types/entities/dynamic';
import { System } from '../../../../types/systems';

type State = {
	onMouseMove: (e: MouseEvent) => void;
};

type Entity = {};
type EState = Record<'action', BasicRotations>;

const InputRotation: System<Entity, EState> = ({ eState }) => {
	console.log('System: InputRotation');

	const [state] = React.useState<State>({
		onMouseMove: () => {},
	});

	const onMouseMove = React.useCallback(
		(pS: EState) =>
			(e: MouseEvent): void => {
				pS.action.horizontalTurn = -e.x * Math.PI * 0.001;
				// pS.action.verticalTurn = e.y * Math.PI * 0.001;
			},
		[],
	);

	React.useEffect(() => {
		state.onMouseMove = onMouseMove(eState);

		document.addEventListener('mousemove', state.onMouseMove);

		return () => {
			document.removeEventListener('mousemove', state.onMouseMove);
		};
	}, []);

	return <></>;
};

export default InputRotation;
