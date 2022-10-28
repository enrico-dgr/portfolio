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
import BasicMovement from 'systems-l/basicMovement/BasicMovement';
import { EntityComponent, State } from 'types-l/entities/component';
import BasicRotation from 'systems-l/basicRotation/BasicRotation';

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

	const entity = React.useMemo<Entity>(
		() => ({
			actions,
			object: modelGLTF.scene,
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
				horizontalTurn: 0,
				verticalTurn: 0,
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
						<BasicRotation entity={entity} eState={state.eState} />
					</>
				)}
			</primitive>
		</Suspense>
	);
};

export default React.memo(Character);
