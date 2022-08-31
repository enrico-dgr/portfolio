export type ActionName = 'forward' | 'backward' | 'left' | 'right';

export type BasicMovements = Record<
	Extract<ActionName, 'forward' | 'backward' | 'left' | 'right'>,
	boolean
>;

export type AnimationName = 'walk' | 'idle';

export type BaseAnimationName = Extract<AnimationName, 'walk' | 'idle'>;
