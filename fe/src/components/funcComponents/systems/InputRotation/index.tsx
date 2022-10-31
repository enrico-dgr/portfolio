import React, { useCallback } from 'react';
import { BasicRotations } from 'types-l/entities/dynamic';
import { System } from 'types-l/systems';

type State = {
	onMouseMove: (e: MouseEvent) => void;
	init: BasicRotations;
	xMax?: number;
	xMin?: number;
};

type Entity = {};
type EState = Record<'action', BasicRotations>;
type Props = {
	/**
	 * If not specified, both directions will be updated
	 */
	direction?: 'vertical' | 'horizontal';
	maxDeltaXAngle?: number;
	minDeltaXAngle?: number;
};

const InputRotation: (props: Props) => System<Entity, EState> =
	(props) => (p) => {
		console.log('System: InputRotation');

		const [state] = React.useState<State>({
			onMouseMove: () => {},
			init: { horizontalTurn: 0, verticalTurn: 0 },
			xMax: undefined,
			xMin: undefined,
		});

		const toRadians = useCallback(
			(angle: number) => (angle * Math.PI) / 180,
			[]
		);

		const onMouseMove = React.useCallback(
			(pS: EState) =>
				(e: MouseEvent): void => {
					if (!document.pointerLockElement) {
						return;
					}

					if (props.direction !== 'horizontal') {
						pS.action.verticalTurn -= e.movementY * Math.PI * 0.001;
					}

					if (props.direction !== 'vertical') {
						pS.action.horizontalTurn -=
							e.movementX * Math.PI * 0.001;
					}

					if (state.xMax) {
						pS.action.verticalTurn = Math.min(
							state.xMax,
							pS.action.verticalTurn
						);
					}

					if (state.xMin) {
						pS.action.verticalTurn = Math.max(
							state.xMin,
							pS.action.verticalTurn
						);
					}
				},
			[]
		);

		React.useEffect(() => {
			state.onMouseMove = onMouseMove(p.state);
			state.init.horizontalTurn = p.state.action.horizontalTurn;
			state.init.verticalTurn = p.state.action.verticalTurn;

			if (props.maxDeltaXAngle) {
				state.xMax =
					state.init.verticalTurn + toRadians(props.maxDeltaXAngle);
			}

			if (props.minDeltaXAngle) {
				state.xMin =
					state.init.verticalTurn + toRadians(props.minDeltaXAngle);
			}

			document.addEventListener('mousemove', state.onMouseMove);

			return () => {
				document.removeEventListener('mousemove', state.onMouseMove);
			};
		}, []);

		return <></>;
	};

export default InputRotation;
