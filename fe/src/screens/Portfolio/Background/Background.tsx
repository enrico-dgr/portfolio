import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring, config } from "@react-spring/three";
import { Box3, Group, Mesh, Vector2, Vector3 } from "three";
import { MeshProps, useFrame } from "@react-three/fiber";

import Dots from "./Dots";

// reusables
const viewportVector = new Vector2();
const viewportHalfVector = new Vector2();

// Component
const Background = (props: MeshProps) => {
	// states
	const [cubeHover, setCubeHover] = useState(false);
	const switchHover = () => setCubeHover((c) => !c);

	// springs
	const springs = useSpring({
		scale: cubeHover ? 1.3 : 1,
		config: config.wobbly,
	});

	// objects references
	const ref = useRef<Mesh>(new Mesh());
	const refSquare = useRef<Mesh>(new Mesh());
	const refDots = useRef<Group>();

	// data holders
	const dotsBox = useRef(new Box3());
	const dotsX = useRef(0);
	const dotsWidthProp = 0.8;
	const dummyVec3 = useRef(new Vector3());
	const viewportSize = useRef(new Vector2());

	// handlers
	const getSize = () =>
		new Vector2(viewportSize.current.x * dotsWidthProp, viewportSize.current.y);

	// frames
	useFrame(({ clock, scene, viewport }) => {
		viewportVector.set(viewport.width, viewport.height);
		viewportHalfVector.set(viewport.width * 0.5, viewport.height * 0.5);

		if (!!ref.current) {
			// center Background with respect to scene
			ref.current.position.set(
				scene.position.x - viewportHalfVector.x,
				scene.position.y + viewportHalfVector.y,
				ref.current.position.z
			);

			// center dots-block with respect to Background
			if (!!refDots.current) {
				dotsBox.current
					.setFromObject(refDots.current)
					.getSize(dummyVec3.current);
				const positionX = (viewport.width - dummyVec3.current.x) * 0.5;

				if (positionX !== dotsX.current) {
					refDots.current.position.setX(positionX);
					dotsX.current = positionX;
				}
			}

			// square animation
			if (!!refSquare.current) {
				const initPos = new Vector3(
					scene.position.x + viewportHalfVector.x * 1.5,
					scene.position.y - viewportHalfVector.y,
					0
				);

				const elaps = clock.getElapsedTime();
				const x = Math.cos(elaps * 1.8) * viewportHalfVector.x * 0.25;
				const y = Math.sin(elaps * 1.2) * viewportHalfVector.y * 0.45;

				refSquare.current.position.set(initPos.x + x, initPos.y - y, 0);
				refSquare.current.rotation.set(elaps, elaps, -elaps);
			}

			// update value
			viewportSize.current.set(viewport.width, viewport.height);
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
