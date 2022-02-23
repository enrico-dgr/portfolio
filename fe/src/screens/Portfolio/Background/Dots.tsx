import React, { useCallback, useEffect, useState } from "react";
import { animated } from "@react-spring/three";
import { Mesh, MeshStandardMaterial, Vector2, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { positionToGridPosition3D } from "../../../utils/3dm";

import useRefs from "../../../hooks/useRefs";

const radius = 0.02;
const maxColumns = 30;

type Props = {
	/**
	 * @default 0.5
	 */
	dotsRadius?: number;
	/**
	 * @default {Vector3(0,0,0)}
	 */
	position?: Vector3;
	/**
	 * @default {Vector2(1,1)}
	 */
	size?: Vector2;
};

const getNumOfSpheres = (radius: number, size: Vector2) => {
	const nx = Math.floor(size.x / radius);
	const ny = Math.floor(size.y / radius);
	console.log(nx, ny);
	return nx + ny;
};

const Dots = ({
	dotsRadius = 0.5,
	position = new Vector3(0, 0, 0),
	size = new Vector2(1, 1),
}: Props) => {
	const num = getNumOfSpheres(dotsRadius, size);
	const [lastNum, setLastNum] = useState<number>(num);
	// refs
	const [dotsRefs, addDotRef] = useRefs<Mesh>(num, null);

	useEffect(() => {
		setLastNum(num);
	}, [num]);

	// frames
	useFrame(({ mouse, viewport }) => {
		const mousePos = new Vector3(
			(mouse.x * viewport.width) / 2,
			(mouse.y * viewport.height) / 2,
			0
		);
		const dotPos = new Vector3();

		if (num > lastNum) {
			for (let i = lastNum; i < num; i++) {
				dotsRefs.push({ current: null });
			}
		} else if (lastNum > num) {
			dotsRefs.splice(num);
		}

		// dots animations
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
	});

	const spheresMap = useCallback((_, i: number) => {
		return (
			<animated.mesh
				key={`portofolio-bg ${i}`}
				ref={addDotRef(i)}
				position={positionToGridPosition3D(i, maxColumns).multiplyScalar(
					// distance between spheres
					radius * 18
				)}
			>
				<sphereGeometry args={[radius]} />
				<meshStandardMaterial
					attach="material"
					color="white"
					emissive={"blue"}
					emissiveIntensity={1}
					opacity={0.2}
					transparent={true}
					roughness={0.1}
					metalness={0.5}
				/>
			</animated.mesh>
		);
	}, []);

	return <group position={position}>{dotsRefs.map(spheresMap)}</group>;
};

export default Dots;
