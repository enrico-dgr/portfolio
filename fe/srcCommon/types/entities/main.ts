import { AnimationMixer, Object3D } from 'three';

export type ThreeDataPrimitive = {
	object: Object3D;
	mixer?: AnimationMixer;
};

export type Entity<ThreeData extends ThreeDataPrimitive, State extends {}> = {
	threeData: ThreeData;
	state: State;
	systems: ((delta: number) => void)[];
	update: (delta: number) => void;
};
