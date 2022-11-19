export type ActionName =
	| 'forward'
	| 'backward'
	| 'left'
	| 'right'
	| 'horizontalTurn'
	| 'verticalTurn';

export type BasicMovements = Record<
	Extract<ActionName, 'forward' | 'backward' | 'left' | 'right'>,
	boolean
>;

export type BasicRotations = Record<
	Extract<ActionName, 'horizontalTurn' | 'verticalTurn'>,
	number
>;

export type AnimationName = 'walk' | 'idle';

export type BaseAnimationName = Extract<AnimationName, 'walk' | 'idle'>;
