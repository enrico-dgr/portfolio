import { AnimationMixer } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { AnimationAction } from 'three';

export const gltf = <Names extends string>(url: string) =>
	new GLTFLoader().loadAsync(url).then((model) => {
		const mixer = new AnimationMixer(model.scene);

		const actions: Partial<Record<Names, AnimationAction>> = {};

		model.animations.forEach((a) => {
			actions[a.name as Names] = mixer.clipAction(a);
		});

		return {
			model: model,
			actions: actions as Record<Names, AnimationAction>,
			mixer,
		};
	});
