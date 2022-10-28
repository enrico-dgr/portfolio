import React, { useCallback, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { Mesh } from "three";
import { Position3 } from 'types-l/data';

const generatePositions = (
	numOfPositions: number,
	minRange: Position3,
	maxRange: Position3
): Position3[] => {
	let buffer = [];

	for (let i = 0; i < numOfPositions; i++) {
		let position: Position3 = [0, 0, 0];

		for (let j = 0; j < 3; j++) {
			position[j] = Math.random() * (maxRange[j] - minRange[j]) + minRange[j];
		}

		buffer.push(position);
	}
	return buffer;
};

const positions: Position3[] = generatePositions(16, [-2, -2, -2], [3, 3, 1]);

// const getRandomPositiveNegative = () =>
// 	Math.abs(Math.round(1.5 - 3 * Math.random()));

type Mutable = { current: Mesh | null };

const Background = () => {
	// object to keep same reference
	const [meshes, setMeshes] = useState<Mutable[]>(
		positions.map(() => ({ current: null }))
	);

	const addMesh = (i: number) => (mesh: Mesh | null) => {
		setMeshes((previousRefs) => {
			previousRefs[i].current = mesh;
			return previousRefs;
		});
	};

	const [active, setActive] = useState(false);
	const springs = useSpring({
		position: active ? [0.4, 0, 1] : [-1, 0, -1],
		scale: active ? 0.1 : 0.4,
		config: config.wobbly,
	});

	useFrame(({ clock }) => {
		meshes.forEach((mesh, i) => {
			if (!!mesh.current) {
				const a = clock.getElapsedTime();
				mesh.current.rotation.x = a - i;
				mesh.current.rotation.y = a + i;
				mesh.current.rotation.z = -a + i;
				mesh.current.scale.setScalar(springs.scale.get());

				const pos = positions[i].map(
					(coord, j) => springs.position.get()[j] + coord
				) as Position3;
				mesh.current.position.set(...pos);
			}
		});
	});

	const switchActive = () => setActive((a) => !a);

	useEffect(() => {
		window.addEventListener("click", switchActive);
		return () => {
			window.removeEventListener("click", switchActive);
		};
	}, []);

	const map = useCallback(
		(position: number[], i: number) => (
			<animated.mesh
				key={
					"" +
					position
						.map((numberCoord) => "" + numberCoord)
						.reduce(
							(previousCoord, currentCoord) => previousCoord + currentCoord
						) +
					i
				}
				ref={addMesh(i)}
				// position={
				// 	new Vector3(
				// 		...position.map((coord, i) => springs.position.get()[i] + coord)
				// 	)
				// }
				// scale={springs.scale}
			>
				<boxBufferGeometry />
				<meshPhongMaterial color="royalblue" />
			</animated.mesh>
		),
		[]
	);

	return <>{positions.map(map)}</>;
};

export default Background;
