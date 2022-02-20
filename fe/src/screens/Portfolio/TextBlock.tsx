import { MeshProps, useFrame } from "@react-three/fiber";
import React from "react";
import { useRef } from "react";
import { Mesh } from "three";
import Text from "./Text";

const TextBlock = (props: MeshProps) => {
	const ref = useRef<Mesh>(null);

	useFrame(({ clock }) => {
		if (!!ref.current) {
			const scale = 0.05 * Math.abs(Math.cos(clock.getElapsedTime())) + 1;
			const y = 0.3 * Math.abs(Math.cos(clock.getElapsedTime()));
			ref.current.scale.setScalar(scale);
			ref.current.position.setY(-y);
		}
	});

	return (
		<mesh {...props} ref={ref}>
			<Text color={"white"} position={[0, 2.5, 0]} scale={3} text="For now," />
			<Text
				color={"gray"}
				position={[0, 1.9, 0]}
				scale={0.8}
				text="there is no professional project."
			/>
			<Text
				color={"blue"}
				position={[0, 1.2, 0]}
				scale={2.25}
				text="Help me fill"
			/>
			<Text
				color={"blue"}
				position={[0, 0.6, 0]}
				scale={2.1}
				text="this section."
			/>
		</mesh>
	);
};

export default TextBlock;
