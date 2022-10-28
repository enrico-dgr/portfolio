import { useFrame } from '@react-three/fiber';
import React from 'react';
import { UseAnimationAPI_Action } from 'types-l/drei';
import { BasicMovements } from 'types-l/entities/dynamic';
import { System, SystemSubState } from 'types-l/systems';

type AnimationName = 'walk' | 'idle';

type AnimationActions = UseAnimationAPI_Action<AnimationName>;

type Entity = { actions: AnimationActions };
type EState = Record<'action', BasicMovements>;

type State = {
	animation: SystemSubState<AnimationName>;
	init: boolean;
};

const Animation: System<Entity, EState> = ({ entity, eState }) => {
	const [state] = React.useState<State>({
		animation: {
			cur: 'idle',
			prev: 'walk',
		},
		init: true,
	});

	const IdleEnter = React.useCallback(
		(prevAnimName: AnimationName, actions: AnimationActions) => {
			console.log('Action: Idle enter');

			const prevAction = actions[prevAnimName];

			actions.idle.enabled = true;

			if (state.init) {
				actions.idle.fadeIn(0.5);
				state.init = false;
			} else {
				actions.idle.crossFadeFrom(prevAction, 0.5, true);
			}

			actions.idle.play();
		},
		[],
	);

	const WalkEnter = React.useCallback(
		(prevAnimName: AnimationName, actions: AnimationActions) => {
			console.log('Action: Walk enter');

			const prevAnim = actions[prevAnimName];
			actions.walk.enabled = true;

			// if (prevActionName === 'run') {
			//   const ratio = actions.walk.getClip().duration / prevAction.getClip().duration;
			//   actions.walk.time =  prevAction.time * ratio;
			// }

			actions.walk.crossFadeFrom(prevAnim, 0.5, true);
			actions.walk.play();
		},
		[],
	);

	useFrame(() => {
		if (
			eState.action.forward ||
			eState.action.backward ||
			eState.action.left ||
			eState.action.right
		) {
			state.animation.cur = 'walk';
		} else {
			state.animation.cur = 'idle';
		}

		if (state.animation.cur === state.animation.prev) {
			return;
		}

		switch (state.animation.cur) {
			case 'idle':
				IdleEnter(state.animation.prev, entity.actions);
				break;

			case 'walk':
				WalkEnter(state.animation.prev, entity.actions);
				break;
		}

		state.animation.prev = state.animation.cur;
	});

	return <></>;
};

export default Animation;
