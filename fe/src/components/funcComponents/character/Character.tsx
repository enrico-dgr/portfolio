import React, { Suspense } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

// assets
import model from '../../../assets/models3d/character.glb';

// utility types
import { UseAnimationAPI } from '../../../types/drei';
import animation from './animation';
import { useFrame } from '@react-three/fiber';
import { System, SystemState } from '../../../types/systems';
import { ActionName } from '../../../types/entities/dynamic';

export type State = {
	action: SystemState<ActionName>;
};

export type ESystem = System<GLTF['scene'], State>;

export type Props = {
  systems?: ESystem[]
}

const Character = (props: Props) => {
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

  //

	const update = React.useCallback((state: State) => {
    props.systems?.forEach(s => s(modelGLTF.scene, state));
    animation(state.action, actions);
    state.action.prev = state.action.cur;
	}, []);

	//

	useFrame(() => {
		update(state);
	});

	return (
		<Suspense fallback={null}>
			<primitive object={modelGLTF.scene} />
		</Suspense>
	);
};

export default React.memo(Character);
