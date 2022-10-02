import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

type Props = {
	position?: Vector3;
};

const Camera = (props: Props) => {
	const camera = useThree((s) => s.camera);

	useEffect(() => {
		props.position && camera.position.copy(props.position);
		camera.lookAt(camera.position.clone().add(new Vector3(0, 0, -1)));
	}, []);

	return <primitive object={camera}></primitive>;
};

export default Camera;
