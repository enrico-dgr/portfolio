import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring, config } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

type Props = {
	/**
	 * Given the `max` and `min` vectors of the box of the parent,
	 * `const sceneSizes = new Vector3().copy(max).sub(min)`
	 */
	sceneSizes: Vector3;
};

const Cube = (props: Props) => {
	const [cubeHover, setCubeHover] = useState(false);
	const switchHover = () => setCubeHover((c) => !c);

	// springs
	const springs = useSpring({
		scale: cubeHover ? 1.3 : 1,
		config: config.wobbly,
	});

	// refs
	const ref = useRef<Mesh>(null);

	// frames
	useFrame(({ clock, scene }) => {
		if (!!ref.current) {
			const halfSizes = props.sceneSizes.divideScalar(2);

			// square animation
			if (!!ref.current) {
				const initPos = new Vector3(
					scene.position.x + halfSizes.x * 1.5,
					scene.position.y - halfSizes.y,
					0
				);

				const elaps = clock.getElapsedTime();
				const x = Math.cos(elaps * 1.8) * halfSizes.x * 0.25;
				const y = Math.sin(elaps * 1.2) * halfSizes.y * 0.45;

				ref.current.position.set(initPos.x + x, initPos.y - y, 0);
				ref.current.rotation.set(elaps, elaps, -elaps);
			}
		}
	});

	useEffect(() => {
		document.addEventListener("mousedown", switchHover);
	}, []);

	return (
		<animated.mesh ref={ref} scale={springs.scale}>
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
	);
};

export default Cube;
