import React, { useRef } from "react";

import { Box3, Mesh, Vector3 } from "three";
import { MeshProps, useFrame } from "@react-three/fiber";

import Dots from "./Dots";
// import Cube from "./Cube";

type PropsKeys = "position" | "renderOrder";

const Background = (props: Pick<MeshProps, PropsKeys>) => {
	// refs
	const ref = useRef<Mesh>(null);

	// frames
	useFrame(({ scene }) => {
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
		}
	});

	return (
		<group position={props.position} renderOrder={props.renderOrder} ref={ref}>
			{/* Cube */}
			{/* <Cube  /> */}
			{/* Dots Grid */}
			<Dots />
		</group>
	);
};

export default Background;
