import React, { Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

// assets
import model from '../../../assets/models3d/character.glb';

// utility types
import { UseAnimationAPI } from '../../../types/drei';

type ActionName = 'idle' | 'walk';

const Character = () => {
	console.log('Render: Character');

	const [state, setState] = React.useState<{
		action: ActionName;
		prevAction: ActionName;
	}>({
		action: 'idle',
		prevAction: 'idle',
	});

	const modelGLTF = useGLTF(model) as GLTF;

	const { actions } = useAnimations(
		modelGLTF.animations,
		modelGLTF.scene,
	) as UseAnimationAPI<ActionName>;

	useFrame(() => {
		switch (state.action) {
			case 'idle':
				break;

			case 'walk':
				break;
		}
	});

	const keyMap = React.useMemo(
		() => ({
			walk: 'w',
		}),
		[],
	);

	const onKeyDown = React.useCallback((e: KeyboardEvent): void => {
		switch (e.key) {
			case keyMap['walk']:
				if (state.action === 'walk') break;

				state.prevAction = state.action;
				state.action = 'walk';
				setState(state);
				WalkEnter(actions, state.prevAction);
				break;
		}
	}, []);

	const onKeyUp = React.useCallback((e: KeyboardEvent): void => {
		switch (e.key) {
			case keyMap['walk']:
				state.prevAction = state.action;
				state.action = 'idle';
				setState(state);
				IdleEnter(actions, state.prevAction);
				break;
		}
	}, []);

	React.useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		IdleEnter(actions, state.prevAction);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, []);

	return (
		<Suspense fallback={null}>
			<primitive object={modelGLTF.scene} />
		</Suspense>
	);
};

export default React.memo(Character);

function IdleEnter(
	actions: UseAnimationAPI<ActionName>['actions'],
	prevActionName: ActionName,
) {
	console.log('Action: Idle enter');

	const prevAction = actions[prevActionName];

	actions.idle.setEffectiveTimeScale(1.0);
	actions.idle.setEffectiveWeight(1.0);
	actions.idle.crossFadeFrom(prevAction, 0.5, true);

	actions.idle.play();
}

function WalkEnter(
	actions: UseAnimationAPI<ActionName>['actions'],
	prevActionName: ActionName,
) {
	console.log('Action: Walk enter');

	const prevAction = actions[prevActionName];
  console.log(prevAction);
	// if (prevActionName === 'run') {
	//   const ratio = actions.walk.getClip().duration / prevAction.getClip().duration;
	//   actions.walk.time =  prevAction.time * ratio;
	// } else {
	// actions.walk.time = 0.0;
	actions.walk.setEffectiveTimeScale(1.0);
	actions.walk.setEffectiveWeight(1.0);
	// }

	actions.walk.crossFadeFrom(prevAction, 0.5, true);
	actions.walk.play();
}
