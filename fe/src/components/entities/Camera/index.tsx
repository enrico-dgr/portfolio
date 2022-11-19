import { useThree, Camera } from '@react-three/fiber';
import { Camera as TCamera, Vector3 } from 'three';
import { EntityComponent } from 'types-l/entities';
import { BasicRotations } from 'common-types/entities';
import useEntity from 'hooks-l/useEntity';
import entity from 'common-entities/Camera';

export type OtherProps = {
	position?: Vector3;
};

export type ThreeData = {
	object: TCamera;
};

export type EntityState = Record<'action', BasicRotations>;

const Camera: EntityComponent<EntityState, OtherProps> = () => {
	const camera = useThree((s) => s.camera);

	return useEntity({
		entityPromise: entity({ camera }),
	});
};

export default Camera;
