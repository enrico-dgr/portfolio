import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring, config } from "@react-spring/three";
import { Group, Mesh, Vector2, Vector3 } from "three";
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

	const ref = useRef<Mesh>(new Mesh());
	const refSquare = useRef<Mesh>(new Mesh());
	const refDots = useRef<Group>();

	const [viewportSize] = useState({ current: new Vector2() });
	const dotsWidthProp = 0.8;
	const getSize = () =>
		new Vector2(viewportSize.current.x * dotsWidthProp, viewportSize.current.y);

	// frames
	useFrame(({ clock, scene, viewport }) => {
		viewportSize.current.set(viewport.width, viewport.height);

		if (!!ref.current) {
			const halfSizes = viewportSize.current.clone().multiplyScalar(0.5);
			// center Background with respect to scene
			ref.current.position.set(
				scene.position.x - halfSizes.x,
				scene.position.y + halfSizes.y,
				ref.current.position.z
			);

			// center dots-block with respect to Background
			if (!!refDots.current) {
				refDots.current.position.set(
					(viewportSize.current.x - viewportSize.current.x * dotsWidthProp) *
						0.5,
					0,
					0
				);
			}

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

		return () => {
			document.removeEventListener("mousedown", switchHover);
		};
	}, [viewportSize.current.x]);

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
			<Dots
				distance={0.36}
				getSize={getSize}
				radius={0.02}
				refGroup={refDots}
			/>
		</mesh>
	);
};

export default Background;
