import React, { Suspense } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';

// assets
import model from '../../../../assets/models3d/character.glb';

// inner systems
import Animation from './Animation';

// systems

// utility types
import { UseAnimationAPI } from '../../../../types/drei';
import { System, SubEntityState } from '../../../../types/systems';
import { ActionName } from '../../../../types/entities/dynamic';

export type State = {
	action: SubEntityState<ActionName>;
};

export type Entity = {
	actions: UseAnimationAPI<ActionName>['actions'];
};

export type Props = {
	systems?: System<Entity, State>[];
};

// component
const Character = (props: Props) => {
	console.log('Render: Character');

	const [state] = React.useState<State>({
		action: {
			cur: 'idle',
			prev: 'walk',
		},
	});

	const modelGLTF = useGLTF(model) as GLTF;

	const { actions } = useAnimations(
		modelGLTF.animations,
		modelGLTF.scene,
	) as UseAnimationAPI<ActionName>;

	const entity = React.useMemo<Entity>(
		() => ({
			actions,
		}),
		[],
	);

	const [animationSystem] = Animation();

	useFrame(() => {
		props.systems?.forEach((s) => s(entity, state));
		animationSystem(entity, state);

		// update previous state values
		state.action.prev = state.action.cur;
	});

	return (
		<Suspense fallback={null}>
			<primitive object={modelGLTF.scene} />
		</Suspense>
	);
};

export default React.memo(Character);
