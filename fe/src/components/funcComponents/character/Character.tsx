import React, { Suspense } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

// assets
import model from '../../../assets/models3d/character.glb';

// utility types
import { UseAnimationAPI } from '../../../types/drei';
import animation from './animation';
import { ActionName } from './types';
import { useFrame } from '@react-three/fiber';
import { SystemState } from '../../../types/systems';

type State = {
	action: SystemState<ActionName>;
};

const Character = () => {
	console.log('Render: Character');

	//
	const modelGLTF = useGLTF(model) as GLTF;

	const { actions } = useAnimations(
		modelGLTF.animations,
		modelGLTF.scene,
	) as UseAnimationAPI<ActionName>;

	//

	const [state] = React.useState<State>({
		action: {
			cur: 'idle',
			prev: 'walk',
		},
	});

	const update = React.useCallback((state: State) => {
		state.action.prev = state.action.cur;
	}, []);

	//

	useFrame(() => {
		animation(state.action, actions);
		update(state);
	});

	return (
		<Suspense fallback={null}>
			<primitive object={modelGLTF.scene} />
		</Suspense>
	);
};

export default React.memo(Character);
export * from './types';
