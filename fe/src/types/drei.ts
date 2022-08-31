import { useAnimations } from '@react-three/drei';

export type UseAnimationAPI<ActionName extends string> = ReturnType<
	typeof useAnimations
> & { actions: Record<ActionName, THREE.AnimationAction> };

export type UseAnimationAPI_Action<ActionName extends string> =
	UseAnimationAPI<ActionName>['actions'];
