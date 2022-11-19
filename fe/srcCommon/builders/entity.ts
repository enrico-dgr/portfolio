import { Entity, ThreeDataPrimitive } from 'common-types/entities';
import { System } from 'common-types/systems';

type Props<ThreeData extends ThreeDataPrimitive, State extends {}> = {
	threeData: ThreeData;
	state: State;
	systemBuilders: System<ThreeData, State>[];
};

export const buildEntity = <
	State extends {},
	ThreeData extends ThreeDataPrimitive = ThreeDataPrimitive
>({
	threeData,
	state,
	systemBuilders,
}: Props<ThreeData, State>) => {
	const systems = systemBuilders.map((sB) => sB({ threeData, state }));

	const update = (delta: number) => {
		threeData.mixer?.update(delta);

		systems.forEach((s) => s(delta));
	};

	return {
		threeData,
		state,
		systems,
		update,
	};
};

type PropsExts<
	ThreeData extends ThreeDataPrimitive,
	State extends {},
	StateExt extends {}
> = {
	entity: Entity<ThreeData, State>;
	extensionState: StateExt;
	extensionSystemBuilders: System<ThreeData, State & StateExt>[];
};

export const extEntity = <
	ThreeData extends ThreeDataPrimitive,
	State extends {},
	StateExt extends {}
>({
	entity,
	extensionState,
	extensionSystemBuilders,
}: PropsExts<ThreeData, State, StateExt>) => {
	Object.assign(entity.state, extensionState); // extends state

	const newSystems = extensionSystemBuilders.map((sB) =>
		sB(entity as Entity<ThreeData, State & StateExt>)
	);

	entity.systems.push(...newSystems);

	return entity;
};
