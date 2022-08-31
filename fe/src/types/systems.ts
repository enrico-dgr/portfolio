export type System<
	Entity extends Record<string, any>,
	State extends Record<string, any>,
> = (entity: Entity, parentState: State) => void;

export type SystemSubState<T extends any> = { cur: T; prev: T };
