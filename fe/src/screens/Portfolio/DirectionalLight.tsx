import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const DirectionalLight = () => {
	const ref = useRef<THREE.DirectionalLight>(null);
	useFrame(({ clock }) => {
		if (!!ref.current) {
			const angleX = Math.cos(clock.getElapsedTime() * 3);

			ref.current.rotation.set(angleX, 0, 0);
		}
	});
	return (
		<>
			<directionalLight color="white" position={[0, 0, 5]} />
			<directionalLight
				color="red"
				intensity={8}
				position={[0, 0, 5]}
				ref={ref}
			/>
		</>
	);
};

export default DirectionalLight;
