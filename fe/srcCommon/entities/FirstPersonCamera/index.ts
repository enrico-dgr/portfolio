import CameraEntity from 'common-entities/Camera';
import BasicRotation from 'common-systems/BasicRotation';
import { Camera, Vector3 } from 'three';
import { extEntity } from 'common-builders/entity';

const entity =
	({ camera, position }: { camera: Camera; position?: Vector3 }) =>
	() => {
		position && camera.position.copy(position);

		return CameraEntity({ camera })().then((e) =>
			extEntity({
				entity: e,
				extensionState: {},
				extensionSystemBuilders: [BasicRotation],
			})
		);
	};

export default entity;
