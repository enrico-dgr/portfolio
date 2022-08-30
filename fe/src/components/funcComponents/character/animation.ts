import { UseAnimationAPI } from '../../../types/drei';
import { ActionName } from '../../../types/entities/dynamic';
import { SystemState } from '../../../types/systems';

type Actions = UseAnimationAPI<ActionName>['actions'];

function IdleEnter(prevActionName: ActionName, actions: Actions) {
	console.log('Action: Idle enter');

	const prevAction = actions[prevActionName];

	actions.idle.enabled = true;

	actions.idle.crossFadeFrom(prevAction, 0.5, true);

	actions.idle.play();
}

function WalkEnter(prevActionName: ActionName, actions: Actions) {
	console.log('Action: Walk enter');

	const prevAction = actions[prevActionName];
	actions.walk.enabled = true;

	// if (prevActionName === 'run') {
	//   const ratio = actions.walk.getClip().duration / prevAction.getClip().duration;
	//   actions.walk.time =  prevAction.time * ratio;
	// }

	actions.walk.crossFadeFrom(prevAction, 0.5, true);
	actions.walk.play();
}

const animation = (
	state: SystemState<ActionName>,
	actions: Actions,
) => {
	if (state.cur === state.prev) {
		return;
	}
  
	switch (state.cur) {
		case 'idle':
			IdleEnter(state.prev, actions);
			break;

		case 'walk':
			WalkEnter(state.prev, actions);
			break;
	}
};

export default animation;