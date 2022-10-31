import React, { Suspense } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

// -- entities

// -- assets
import model from 'assets-l/models3d/character.glb';

// -- systems
import Animation from './Animation';

// -- utility types
import { UseAnimationAPI_Action } from 'types-l/drei';
import {
	AnimationName,
	BasicMovements,
	BasicRotations,
} from 'types-l/entities/dynamic';
import { Group } from 'three';
import BasicMovement from 'systems-l/BasicMovement';
import { EntityComponent } from 'types-l/entities/component';
import BasicRotation from 'systems-l/BasicRotation';
import useEntityState from 'hooks-l/useEntityState';
import useSystems from 'hooks-l/useSystems';

type AnimationActions = UseAnimationAPI_Action<AnimationName>;

export type EState = {
	action: BasicMovements & BasicRotations;
};

export type Entity = {
	actions: AnimationActions;
	object: Group;
};

// -- component
const Character: EntityComponent<Entity, EState> = (props) => {
	console.log('Render: Character');

	// -- preload
	const modelGLTF = useGLTF(model) as unknown as GLTF;

	const actions = useAnimations(modelGLTF.animations, modelGLTF.scene)
		.actions as AnimationActions;

	// -- state and rendering
	const [state] = useEntityState({
		props: props,
		state: {
			entity: {
				actions,
				object: modelGLTF.scene,
			},
			eState: {
				action: {
					forward: false,
					backward: false,
					left: false,
					right: false,
					horizontalTurn: 0,
					verticalTurn: 0,
				},
			},
		},
	});

	const systems = useSystems({
		state,
		systems: [Animation, BasicMovement, BasicRotation],
		props,
	});

	return (
		<Suspense fallback={null}>
			<primitive object={modelGLTF.scene}>
				{props.children}
				{systems}
			</primitive>
		</Suspense>
	);
};

export default React.memo(Character);
