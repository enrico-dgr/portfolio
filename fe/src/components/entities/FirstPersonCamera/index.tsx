import { useMemo } from 'react';

// -- systems
import InputRotation from 'systems-l/InputRotation';

// -- utility types
import { EntityComponent } from 'types-l/entities/component';
import useEntity from 'hooks-l/useEntity';
import entity from 'common-entities/FirstPersonCamera';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const FirstPersonCamera: EntityComponent<{}, { position?: Vector3 }> = ({
	children,
	position,
}) => {
	const camera = useThree((s) => s.camera);

	const inputSystems = useMemo(
		() => [
			InputRotation({
				direction: 'vertical',
				maxDeltaXAngle: 18,
				minDeltaXAngle: -40,
			}),
		],
		[]
	);

	return useEntity({
		entityPromise: entity({ camera, position }),
		children,
		inputSystems,
	});
};

export default FirstPersonCamera;
