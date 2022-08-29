import { useAnimations } from '@react-three/drei';

export type UseAnimationAPI<ActionName extends string> = ReturnType<
	typeof useAnimations
> & { actions: Record<ActionName, THREE.AnimationAction> };
