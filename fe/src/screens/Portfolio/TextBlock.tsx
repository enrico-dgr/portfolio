import { useFrame } from "@react-three/fiber";
import React from "react";
import { useRef } from "react";
import { Group } from "three";
import Text from "./Text";

type Props = {
	refGroup?: React.RefObject<Group>;
};

const TextBlock = ({ refGroup: refGroup_ }: Props) => {
	const refGroup = refGroup_ ?? useRef<Group>(null);
	const scale0 = useRef(1);
	const widthViewport = useRef(0);

	useFrame(({ clock, viewport }) => {
		if (!!refGroup.current) {
			const scale =
				0.05 * Math.abs(Math.cos(clock.getElapsedTime())) + scale0.current;
			const y = 0.3 * Math.abs(Math.cos(clock.getElapsedTime()));
			refGroup.current.scale.setScalar(scale);
			refGroup.current.position.setY(-y);

			if (viewport.width !== widthViewport.current) {
				widthViewport.current = viewport.width;

				if (viewport.width > 8) {
					scale0.current = 1;
					refGroup.current.position.setX(-4);
				} else {
					scale0.current = 0.8;
					refGroup.current.position.setX(-1.5);
				}
			}
		}
	});

	return (
		<group ref={refGroup}>
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
		</group>
	);
};

export default TextBlock;
