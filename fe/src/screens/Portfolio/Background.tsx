import React, { useRef, useState } from "react";
import { animated } from "@react-spring/three";
import { Box3, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { MeshProps, useFrame } from "@react-three/fiber";

import useRefs from "../../hooks/useRefs";

const getPosition = (column: number, maxColumns: number): Vector3 => {
	const y = Math.floor(column / maxColumns);

	return new Vector3(column - y * maxColumns, -y, 0);
};

const Background = (props: MeshProps) => {
	// states
	const [maxColumns, _setMaxColumns] = useState<number>(30);
	const [radius, _setRadius] = useState<number>(0.02);

	// refs
	const ref = useRef<Mesh>(null);
	const [dotsRefs, addRef] = useRefs<Mesh>(600, null);

	// frames
	useFrame(({ mouse, scene, viewport }) => {
		const sceneBox = new Box3().setFromObject(scene);
		const sceneSizes = new Vector3().copy(sceneBox.max).sub(sceneBox.min);

		if (!!ref.current) {
			const halfSizes = sceneSizes.divideScalar(2);
			ref.current.position.set(
				scene.position.x - halfSizes.x,
				scene.position.y + halfSizes.y,
				ref.current.position.z
			);

			const mousePos = new Vector3(
				(mouse.x * viewport.width) / 2,
				(mouse.y * viewport.height) / 2,
				0
			);
			const dotPos = new Vector3();

			dotsRefs.forEach((dot) => {
				if (!!dot.current) {
					const mouseDistance = mousePos.distanceToSquared(
						dot.current.getWorldPosition(dotPos)
					);
					if (mouseDistance < 2) {
						dot.current.scale.setScalar(1 + (2 - mouseDistance));
						if (
							!!(dot.current.material as MeshStandardMaterial).type &&
							(dot.current.material as MeshStandardMaterial).type ===
								"MeshStandardMaterial"
						) {
							(dot.current.material as MeshStandardMaterial).opacity = 1;
							(dot.current.material as MeshStandardMaterial).emissiveIntensity =
								(1 + (2 - mouseDistance)) * 8;
						}
					} else {
						dot.current.scale.setScalar(1);
						if (
							!!(dot.current.material as MeshStandardMaterial).type &&
							(dot.current.material as MeshStandardMaterial).type ===
								"MeshStandardMaterial"
						) {
							(dot.current.material as MeshStandardMaterial).opacity = 0.2;
							(
								dot.current.material as MeshStandardMaterial
							).emissiveIntensity = 1;
						}
					}
				}
			});
		}
	});

	return (
		<mesh {...props} ref={ref}>
			{dotsRefs.map((_, i) => (
				<animated.mesh
					key={`portofolio-bg ${i}`}
					ref={addRef(i)}
					position={getPosition(i, maxColumns).multiplyScalar(radius * 18)}
				>
					<sphereGeometry args={[radius]} />
					<meshStandardMaterial
						attach="material"
						color="white"
						emissive={"blue"}
						emissiveIntensity={3}
						opacity={0.2}
						transparent={true}
						roughness={0.1}
						metalness={0.5}
					/>
				</animated.mesh>
			))}
		</mesh>
	);
};

export default Background;
