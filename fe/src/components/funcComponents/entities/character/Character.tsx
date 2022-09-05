import React, { Suspense } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

// -- entities

// -- assets
import model from '../../../../assets/models3d/character.glb';

// -- systems
import Animation from './Animation';

// -- utility types
import { UseAnimationAPI_Action } from '../../../../types/drei';
import {
	AnimationName,
	BasicMovements,
} from '../../../../types/entities/dynamic';
import { Group } from 'three';
import BasicMovement from '../../systems/basicMovement/BasicMovement';
import { EntityComponent, State } from '../../../../types/entities/component';

type AnimationActions = UseAnimationAPI_Action<AnimationName>;

export type EState = {
	action: BasicMovements;
};

export type Entity = {
	actions: AnimationActions;
	scene: Group;
};

// -- component
const Character: EntityComponent<Entity, EState> = (props) => {
	console.log('Render: Character');

  // -- preload
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

  // -- state and rendering
	const [state] = React.useState<State<Entity, EState>>({
		entity,
		eState: {
			action: {
				forward: false,
				backward: false,
				left: false,
				right: false,
			},
		},
	});

	React.useEffect(() => {
		props.getState && props.getState(state);
	}, [state]);

	return (
		<Suspense fallback={null}>
			<primitive object={modelGLTF.scene}>
				{props.children}
				{!!state && (
					<>
						<Animation entity={entity} eState={state.eState} />
						<BasicMovement entity={entity} eState={state.eState} />
					</>
				)}
			</primitive>
		</Suspense>
	);
};

export default React.memo(Character);
