export type System<
	Entity extends Record<string, any>,
	EntityState extends Record<string, any>,
  Props extends {} = {}
> = (props: { entity: Entity; eState: EntityState } & Props) => JSX.Element;

export type SystemSubState<T extends any> = { cur: T; prev: T };
