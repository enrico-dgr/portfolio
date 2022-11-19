import { Camera as TCamera, Vector3 } from 'three';
import { buildEntity } from 'common-builders/entity';

const Camera =
	({ camera }: { camera: TCamera }) =>
	async () => {
		camera.lookAt(camera.position.clone().add(new Vector3(0, 0, -1)));

		return buildEntity({
			threeData: {
				object: camera,
			},
			state: {
				action: {
					horizontalTurn: 0,
					verticalTurn: 0,
				},
			},
			systemBuilders: [],
		});
	};

export default Camera;
