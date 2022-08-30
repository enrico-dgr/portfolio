import { Object3D } from 'three/src/Three';

export type SystemState<T extends any> = { cur: T; prev: T };

export type EntityState<KeyInParentState extends string, T extends any> = {
	[key in KeyInParentState]: SystemState<T>;
};

export type System<
	Entity extends Object3D,
	State extends EntityState<string, any>,
> = (entity: Entity, parentState: State) => void;
