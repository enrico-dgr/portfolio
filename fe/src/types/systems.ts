export type SystemState<T extends any> = { cur: T; prev: T };

export type ParentState<
	KeyInParentState extends string,
	T extends any,
> = {
	[key in KeyInParentState]: SystemState<T>;
};
