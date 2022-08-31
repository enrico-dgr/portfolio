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
import { UseAnimationAPI_Action } from '../../../../types/drei';
import { System } from '../../../../types/systems';
import {
	AnimationName,
	BasicMovements,
} from '../../../../types/entities/dynamic';
import { Group } from 'three';

type AnimationActions = UseAnimationAPI_Action<AnimationName>;

export type State = {
	action: BasicMovements;
};

export type Entity = {
	actions: AnimationActions;
	scene: Group;
};

export type Props = {
	systems?: System<Entity, State>[];
};

// component
const Character = (props: Props) => {
	console.log('Render: Character');

	const [state] = React.useState<State>({
		action: {
			forward: false,
			backward: false,
			left: false,
			right: false,
		},
	});

	const modelGLTF = useGLTF(model) as GLTF;

	const actions = useAnimations(modelGLTF.animations, modelGLTF.scene)
		.actions as AnimationActions;

	const entity = React.useMemo<Entity>(
		() => ({
			actions,
			scene: modelGLTF.scene,
		}),
		[],
	);

	const [animationSystem] = Animation();

	useFrame(() => {
		[...(props.systems ?? []), animationSystem].forEach((s) =>
			s(entity, state),
		);
	});

	return (
		<Suspense fallback={null}>
			<primitive object={modelGLTF.scene} />
		</Suspense>
	);
};

export default React.memo(Character);
