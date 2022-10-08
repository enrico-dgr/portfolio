import React from 'react';
import { BasicRotations } from '../../../../types/entities/dynamic';
import { System } from '../../../../types/systems';

type State = {
	onMouseMove: (e: MouseEvent) => void;
};

type Entity = {};
type EState = Record<'action', BasicRotations>;
type Props = {
	/**
	 * If not specified, both directions will be updated
	 */
	direction?: 'vertical' | 'horizontal';
};

const InputRotation: System<Entity, EState, Props> = ({
	eState,
	direction,
}) => {
	console.log('System: InputRotation');

	const [state] = React.useState<State>({
		onMouseMove: () => {},
	});

	const onMouseMove = React.useCallback(
		(pS: EState) =>
			(e: MouseEvent): void => {
				if (!document.pointerLockElement) {
					return;
				}
				const PI_2 = Math.PI * 0.5;
				const toRadians = (angle: number) => (angle * PI_2) / 90;
				const maxPolarAngle = toRadians(60);
				const minPolarAngle = -toRadians(30);

				if (direction !== 'horizontal') {
					pS.action.verticalTurn -= e.movementY * Math.PI * 0.001;
					pS.action.verticalTurn = Math.max(
						minPolarAngle,
						Math.min(maxPolarAngle, pS.action.verticalTurn),
					);

					console.log(pS.action.verticalTurn);
				}

				if (direction !== 'vertical') {
					pS.action.horizontalTurn -= e.movementX * Math.PI * 0.001;
				}
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
