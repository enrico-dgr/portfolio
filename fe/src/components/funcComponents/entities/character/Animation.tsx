import React from 'react';
import { UseAnimationAPI } from '../../../../types/drei';
import { ActionName } from '../../../../types/entities/dynamic';
import { EntityState, System } from '../../../../types/systems';

type Actions = UseAnimationAPI<ActionName>['actions'];

type PState = EntityState<'action', ActionName>;

const Animation = <
	Entity extends { actions: UseAnimationAPI<ActionName>['actions'] },
>() => {
	const IdleEnter = React.useCallback(
		(prevActionName: ActionName, actions: Actions) => {
			console.log('Action: Idle enter');

			const prevAction = actions[prevActionName];

			actions.idle.enabled = true;

			actions.idle.crossFadeFrom(prevAction, 0.5, true);

			actions.idle.play();
		},
		[],
	);

	const WalkEnter = React.useCallback(
		(prevActionName: ActionName, actions: Actions) => {
			console.log('Action: Walk enter');

			const prevAction = actions[prevActionName];
			actions.walk.enabled = true;

			// if (prevActionName === 'run') {
			//   const ratio = actions.walk.getClip().duration / prevAction.getClip().duration;
			//   actions.walk.time =  prevAction.time * ratio;
			// }

			actions.walk.crossFadeFrom(prevAction, 0.5, true);
			actions.walk.play();
		},
		[],
	);

	const system = React.useCallback<System<Entity, PState>>(
		(entity, parentState) => {
			if (parentState.action.cur === parentState.action.prev) {
				return;
			}

			switch (parentState.action.cur) {
				case 'idle':
					IdleEnter(parentState.action.prev, entity.actions);
					break;

				case 'walk':
					WalkEnter(parentState.action.prev, entity.actions);
					break;
			}
		},
		[],
	);

	return [system];
};

export default Animation;
