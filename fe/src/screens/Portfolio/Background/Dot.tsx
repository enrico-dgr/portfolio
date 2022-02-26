import React from "react";
import { Vector3 } from "three";

type Props = {
	radius: number;
	position: Vector3;
};

const Dot = (props: Props) => {
	return (
		<mesh position={props.position}>
			<sphereGeometry args={[props.radius]} />
			<meshStandardMaterial
				color={"white"}
				emissive={"blue"}
				emissiveIntensity={1}
				opacity={0.2}
				transparent={true}
				roughness={0.1}
				metalness={0.5}
			/>
		</mesh>
	);
};

export default Dot;
