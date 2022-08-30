export type SubEntityState<T extends any> = { cur: T; prev: T };

export type EntityState<KeyInParentState extends string, T extends any> = {
	[key in KeyInParentState]: SubEntityState<T>;
};

export type System<
	Entity extends {},
	State extends EntityState<string, any>,
> = (entity: Entity, parentState: State) => void;
