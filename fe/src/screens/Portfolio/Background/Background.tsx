import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring, config } from "@react-spring/three";
import { Box3, Mesh, Vector3 } from "three";
import { MeshProps, useFrame } from "@react-three/fiber";

import Dots from "./Dots";

const Background = (props: MeshProps) => {
	const [cubeHover, setCubeHover] = useState(false);
	const switchHover = () => setCubeHover((c) => !c);

	// springs
	const springs = useSpring({
		scale: cubeHover ? 1.3 : 1,
		config: config.wobbly,
	});

	// refs
	const ref = useRef<Mesh>(null);
	const refSquare = useRef<Mesh>(null);

	// frames
	useFrame(({ clock, scene }) => {
		const sceneBox = new Box3().setFromObject(scene);
		const sceneSizes = new Vector3().copy(sceneBox.max).sub(sceneBox.min);

		if (!!ref.current) {
			const halfSizes = sceneSizes.divideScalar(2);
			// center background
			ref.current.position.set(
				scene.position.x - halfSizes.x,
				scene.position.y + halfSizes.y,
				ref.current.position.z
			);

			// square animation
			if (!!refSquare.current) {
				const initPos = new Vector3(
					scene.position.x + halfSizes.x * 1.5,
					scene.position.y - halfSizes.y,
					0
				);

				const elaps = clock.getElapsedTime();
				const x = Math.cos(elaps * 1.8) * halfSizes.x * 0.25;
				const y = Math.sin(elaps * 1.2) * halfSizes.y * 0.45;

				refSquare.current.position.set(initPos.x + x, initPos.y - y, 0);
				refSquare.current.rotation.set(elaps, elaps, -elaps);
			}
		}
	});

	useEffect(() => {
		document.addEventListener("mousedown", switchHover);
	}, []);

	return (
		<mesh {...props} ref={ref}>
			{/* Cube */}
			<animated.mesh ref={refSquare} scale={springs.scale}>
				<boxGeometry args={[0.6, 0.6, 0.6]} />
				<meshStandardMaterial
					attach="material"
					emissive={"blue"}
					emissiveIntensity={2}
					metalness={0.7}
					opacity={0.6}
					roughness={0.1}
					transparent={true}
				/>
			</animated.mesh>
			{/* Dots Grid */}
			<Dots />
		</mesh>
	);
};

export default Background;
