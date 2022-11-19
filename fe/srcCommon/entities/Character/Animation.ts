import { ThreeDataPrimitive, BasicMovements } from 'common-types/entities';
import { System } from 'common-types/systems';
import { AnimationAction } from 'three';

type AnimationName = 'walk' | 'idle';

type AnimationActions = Record<AnimationName, AnimationAction>;

type ThreeData = { actions: AnimationActions } & ThreeDataPrimitive;
type EState = Record<'action', BasicMovements>;

type State = {
	animation: {
		cur: AnimationName;
		prev: AnimationName;
	};
	init: boolean;
};

const Animation: System<ThreeData, EState> = ({ threeData, state }) => {
	const systemState: State = {
		animation: {
			cur: 'idle',
			prev: 'walk',
		},
		init: true,
	};

	const IdleEnter = (
		prevAnimName: AnimationName,
		actions: AnimationActions
	) => {
		console.log('Action: Idle enter');

		const prevAction = actions[prevAnimName];

		actions.idle.enabled = true;

		if (systemState.init) {
			actions.idle.fadeIn(0.5);
			systemState.init = false;
		} else {
			actions.idle.crossFadeFrom(prevAction, 0.5, true);
		}

		actions.idle.play();
	};

	const WalkEnter = (
		prevAnimName: AnimationName,
		actions: AnimationActions
	) => {
		console.log('Action: Walk enter');

		const prevAnim = actions[prevAnimName];
		actions.walk.enabled = true;

		// if (prevActionName === 'run') {
		//   const ratio = actions.walk.getClip().duration / prevAction.getClip().duration;
		//   actions.walk.time =  prevAction.time * ratio;
		// }

		actions.walk.crossFadeFrom(prevAnim, 0.5, true);
		actions.walk.play();
	};

	return () => {
		if (
			state.action.forward ||
			state.action.backward ||
			state.action.left ||
			state.action.right
		) {
			systemState.animation.cur = 'walk';
		} else {
			systemState.animation.cur = 'idle';
		}

		if (systemState.animation.cur === systemState.animation.prev) {
			return;
		}

		switch (systemState.animation.cur) {
			case 'idle':
				IdleEnter(systemState.animation.prev, threeData.actions);
				break;

			case 'walk':
				WalkEnter(systemState.animation.prev, threeData.actions);
				break;
		}

		systemState.animation.prev = systemState.animation.cur;
	};
};

export default Animation;
