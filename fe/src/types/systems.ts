export type System<
	Entity extends Record<string, any>,
	EntityState extends Record<string, any>,
> = (props: { entity: Entity; eState: EntityState }) => JSX.Element;

export type SystemSubState<T extends any> = { cur: T; prev: T };
